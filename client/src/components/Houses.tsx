import React from 'react'
import useGetHouses from '../hooks/useGetHouses';
import HouseCard from './HouseCard';
import Loader from './shared/Loader';
import { HouseType } from '../types';

const Houses = () => {
    const { data, loading, error, refetch } = useGetHouses<HouseType[]>();
    const houses = data as HouseType[]
    console.log(houses)
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    if (!Array.isArray(houses) || houses.length === 0) {
        return <h1>No houses found!!</h1>;
    }

    return (
        <div className='container pt-10 flex flex-wrap justify-between gap-10'>
            {
                houses.map((house) => (
                    <HouseCard key={house.id} house={house} refetch={refetch} />
                ))
            }
        </div>
    )
}

export default Houses