import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { axiosInstance } from "../utils/axios.instance";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AxiosError } from "axios";

const formSchema = z.object({
  address: z.string(),
  img_url: z.string(),
  size: z.coerce.number({ message: "Enter a valid number" }).min(1, "Size must be greater than 0"),
  location: z.string(),
  numberOfRooms: z.coerce.number({ message: "Enter a valid number" }).min(1, "Number of rooms must be at least 1"),
  ownerId: z.coerce.number({ message: "Enter a valid number" }).min(1, "Owner ID must be greater than 0"),
  price: z.coerce.number({ message: "Enter a valid number" }).min(0, "Price must be a positive number"), // Adding min validation for price
});

export default function CreateHouseForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const details = {
      ...values,
    };
    console.log(details);
    try {
      const { data } = await axiosInstance.post('/house', details);
      if (data) {
        toast("House created successfully");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      }
    }
  }

  return (
    <section>
      <div className="bg-white p-4 sm:p-8 rounded-lg border max-w-[500px] border-black mt-6 mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold">Create House</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4 grid grid-cols-2 place-items-center justify-items-center">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Address of house" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="img_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Image URL of the house" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Location of the house" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Size of the house"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfRooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Rooms</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Total rooms in house"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ownerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Owner ID"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Price of the house"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-green-900 mt-8 hover:bg-blue-900 hover:opacity-80 w-full">Confirm</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
