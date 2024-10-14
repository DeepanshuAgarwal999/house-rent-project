import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios.instance";
import { HouseType } from "../types";
import { RentHouseType } from "../components/RentalCard";

const useGetRentedHouses = () => {
    const [houses, setHouses] = useState<RentHouseType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getHouses = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, status } = await axiosInstance.get("/house");
            console.log(data)
            if (status === 200) {
                setHouses(data);
            }
        } catch (error: any) {
            setError(error?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHouses();
    }, []);

    return { houses, loading, error, refetch: getHouses };
};

export default useGetRentedHouses;
