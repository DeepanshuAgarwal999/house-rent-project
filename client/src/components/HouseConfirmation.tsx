import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { HouseType } from '../types';
import HouseCard from './HouseCard';
import HouseForm from './HouseForm';
import Loader from './shared/Loader';
import useGetHouses from '../hooks/useGetHouses';

const HouseConfirmation = () => {
    const { id } = useParams();
    if (!id || isNaN(+id)) {
        return <Navigate to='/' />
    }

    const { data, loading, error } = useGetHouses({ id });
    const house = data as HouseType
    
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    if (!house || Array.isArray(house)) {
        return <h1>No houses found!!</h1>;
    }


    return (
        <div className='grid md:grid-cols-2 place-content-center justify-items-center pt-10'>
            <HouseCard house={house} showButton={false} />
            <div>
                <HouseForm house={house} />
            </div>
        </div>
    )
}

export default HouseConfirmation