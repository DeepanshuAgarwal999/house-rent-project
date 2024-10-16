import React, { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../utils/axios.instance";

const useGetData = <T>({ id }: { id?: string } = {}) => {
  const [data, setData] = useState<T[] | T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(id ? `/house/${id}` : "/house");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error: any) {
      setError(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useGetData;
