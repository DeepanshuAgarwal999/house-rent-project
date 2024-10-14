import React from 'react'
import { HouseType } from '../types'
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';


const HouseCard = ({ house, showButton = true }: { house: HouseType, showButton?: boolean }) => {
    const { address, id, numberOfRooms, size, img_url, location, price } = house;
    const navigate = useNavigate()
    return (
        <article className='border  w-[400px] rounded-xl shadow-xl bg-white p-2'>
            <img src={img_url} alt={"Image not available"} className='mx-auto w-[90%] h-[200px] bg-red-100 rounded-xl' />
            <div className='p-2'>
                <div className='grid grid-cols-2 justify-items-center pt-4'>
                    <div>
                        <p> location: {location}</p>
                        <p className='truncate'>Address: {address}</p>
                    </div>
                    <div>
                        <p> size: {size} meter</p>
                        <p className=''>Rooms: {numberOfRooms}</p>
                    </div>
                </div>
                {
                    showButton && <Button onClick={() => navigate(`/house/${id}`)} className='bg-red-500 text-white rounded-xl h-14 px-4 w-full text-center text-lg mt-4 hover:bg-red-400 active:scale-95'>
                        Book at ₹{price}/month
                    </Button>
                }

            </div>
        </article>
    )
}

export default HouseCard