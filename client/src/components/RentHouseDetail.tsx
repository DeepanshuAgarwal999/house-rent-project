import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../utils/axios.instance';
import { Rental, RentalResponse } from '../types';
import { useAuth } from '../context/AuthProvider';

const RentHouseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [rental, setRental] = useState<Rental | null>(null)

    useEffect(() => {
        if (!id) {
            navigate('/')
        }
        (async () => {
            try {
                const { data, status } = await axiosInstance.get<RentalResponse>(`/rental/${id}`)
                status === 200 ? setRental(data.rental) : setRental(null)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [id])


    if (!rental) {
        return <div>No house found</div>;
    }
    const {
        startDate,
        endDate,
        totalPrice,
        user: { firstName, lastName, email, role },
        house: { address, img_url, size, location, numberOfRooms, price },
    } = rental;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg container">
            <h1 className="text-2xl font-bold mb-4">Rental Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* User Information */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">User Information</h2>
                    <p>
                        <span className="font-bold">Name: </span>
                        {firstName} {lastName}
                    </p>
                    <p>
                        <span className="font-bold">Email: </span>
                        {email}
                    </p>
                    <p>
                        <span className="font-bold">Role: </span>
                        {role}
                    </p>
                </div>

                {/* Rental Information */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Rental Information</h2>
                    <p>
                        <span className="font-bold">Start Date: </span>
                        {new Date(startDate).toLocaleDateString()}
                    </p>
                    <p>
                        <span className="font-bold">End Date: </span>
                        {new Date(endDate).toLocaleDateString()}
                    </p>
                    <p>
                        <span className="font-bold">Total Price: </span>
                        ${totalPrice.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* House Information */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">House Information</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <img
                        src={img_url}
                        alt="House"
                        className="w-full md:w-1/2 object-cover rounded-lg"
                    />
                    <div>
                        <p>
                            <span className="font-bold">Address: </span>
                            {address}
                        </p>
                        <p>
                            <span className="font-bold">Location: </span>
                            {location}
                        </p>
                        <p>
                            <span className="font-bold">Size: </span>
                            {size} sqm
                        </p>
                        <p>
                            <span className="font-bold">Rooms: </span>
                            {numberOfRooms} rooms
                        </p>
                        <p>
                            <span className="font-bold">Price: </span>
                            ${price.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RentHouseDetail