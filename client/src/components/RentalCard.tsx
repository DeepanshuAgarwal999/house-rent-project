import React from 'react'
import { useNavigate } from 'react-router-dom'

export type RentHouseType = {
    id: number,
    startDate: string,
    endDate: string,
    totalPrice: number
}

const RentalCard = ({ house }: { house: RentHouseType }) => {
    const navigate = useNavigate()
    return (
        <article onClick={() => navigate(`/booked/${house.id}`)} className='bg-white shadow-xl rounded-2xl mx-auto p-4 cursor-pointer'>
            <p className='text-red-400'>
                house id: {
                    house.id
                }
            </p>
            <p>
                startDate: {house.startDate}
            </p>
            <p>
                endDate: {house.endDate}
            </p>

            <p>
                Rented at {house.totalPrice}rs
            </p>

        </article>
    )
}

export default RentalCard