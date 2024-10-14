import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { axiosInstance } from "../utils/axios.instance";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { HouseType } from "../types";
import { AxiosError } from "axios";

const formSchema = z.object({
    startDate: z.date(),
    endDate: z.date(),
})

export default function HouseForm({ house }: { house: HouseType }) {
    const navigate = useNavigate();

    const gstPrice = house.price + (+house.price * 18) / 100

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const details = {
            ...values,
            totalPrice: gstPrice,
            userId: 1,
            houseId: house.id
        }
        console.log(details)
        try {
            const { data } = await axiosInstance.post('/rental', details);
            if (data) {
                toast("House rented successfully")
                navigate('/')
            }

        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                toast(error.response?.data.message);
        }
    }


    return (
        <section className="min-w-[400px]">
            <div className="bg-white p-4 sm:p-8 rounded-lg border border-black mt-6 max-w-[450px] mx-auto">
                <h1 className="text-xl sm:text-2xl font-bold">Confirm your house 👋</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <br />
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w- pl-3 w-full text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={field.onChange}
                                                className="rounded-md border"
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <br />
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={field.onChange}
                                                className="rounded-md border"
                                                disabled={(date) => {
                                                    const startDateValue = form.getValues("startDate");
                                                    const startDate = startDateValue ? new Date(startDateValue) : new Date();
                                                    return date < startDate || date < new Date();
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div>
                            <FormLabel className="inline-block mb-4">Price after Gst</FormLabel>
                            <div className="">
                                <Input value={gstPrice} readOnly className="pointer-events-none" />
                            </div>
                        </div>

                        <Button type="submit" className="bg-green-900 hover:bg-blue-900 hover:opacity-80 w-full">Confirm</Button>

                    </form>
                </Form >
            </div >
        </section >
    )
}