import React from 'react'
import { HouseType } from '../types'
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { axiosInstance } from '../utils/axios.instance';
import { toast } from 'sonner';
import { AxiosError } from 'axios';


const HouseCard = ({ house, showButton = true, refetch = () => { } }: { house: HouseType, showButton?: boolean, refetch?: () => void }) => {
    const { address, id, numberOfRooms, size, img_url, location, price } = house;
    const { user } = useAuth()
    const navigate = useNavigate()
    const handleDelete = async (id: number) => {
        try {
            const { status } = await axiosInstance.delete(`/house/${id}`)
            if (status === 200) {
                toast("house deleted successfully")
                refetch()
            }
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                toast(error.response?.data.message)
            }
        }
    }
    return (
        <article className='border  w-[400px] rounded-xl shadow-xl bg-white p-2 overflow-hidden'>
            <img src={img_url} alt={"Image not available"} className='mx-auto w-[90%] h-[200px] bg-red-100 rounded-xl' />
            <div className='p-2'>
                <div className='grid grid-cols-2 justify-items-center pt-4'>
                    <div>
                        <p> location: {location}</p>
                        <p className='truncate w-[150px]' title={address}>Address: {address}</p>
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
                {
                    user?.role === 'admin' &&
                    <> <Button onClick={() => handleDelete(id)} className='bg-red-500 text-white rounded-xl h-14 px-4 w-full text-center text-lg mt-4 hover:bg-red-400 active:scale-95'>
                        delete
                    </Button>
                    </>
                }


            </div>
        </article >
    )
}

export default HouseCard