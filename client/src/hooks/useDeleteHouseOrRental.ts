import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosInstance } from "../utils/axios.instance";

const useDeleteHouseOrRental = (url: string) => {
  const navigate = useNavigate();

  const handleDelete = async (id: number | string) => {
    try {
      const { status } = await axiosInstance.delete(url + id);

      if (status === 200) {
        toast("Deleted successfully");
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      }
    }
  };

  return { handleDelete };
};

export default useDeleteHouseOrRental;
