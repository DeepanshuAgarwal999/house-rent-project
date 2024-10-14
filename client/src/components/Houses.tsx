import React from 'react'
import useGetHouses from '../hooks/useGetHouses';
import HouseCard from './HouseCard';
import Loader from './shared/Loader';

const Houses = () => {
    const { houses, loading, error, refetch } = useGetHouses();

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