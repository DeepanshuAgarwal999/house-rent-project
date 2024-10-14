import React from 'react'
import useGetRentedHouses from '../hooks/useGetRentedHouses';
import Loader from '../components/shared/Loader';
import RentalCard from '../components/RentalCard';

const Rental = () => {
    const { houses, loading, error } = useGetRentedHouses();

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
        <div className='space-y-4 container'>
            {
                houses.map((house) => (
                    <RentalCard house={house} key={house.id} />
                ))
            }
        </div>
    )
}

export default Rental