import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HouseType } from '../types';
import { axiosInstance } from '../utils/axios.instance';
import HouseCard from './HouseCard';
import HouseForm from './HouseForm';

const HouseConfirmation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [house, setHouse] = useState<HouseType | null>(null)
    console.log(id)

    const getHouse = async () => {
        try {
            const { data, status } = await axiosInstance.get(`/house/${id}`)
            if (status === 200) {
                setHouse(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (!id || isNaN(+id)) {
            navigate('/')
        }
        getHouse()
    }, [id])

    if (!house) {
        return <div>No house found for the following request :(</div>
    }

    return (
        <div className='grid md:grid-cols-2 place-content-center justify-items-center pt-10'>
            <HouseCard house={house} showButton={false} />
            <div>
                <HouseForm house={house}/>
            </div>
        </div>
    )
}

export default HouseConfirmation