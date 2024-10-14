import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { axiosInstance } from '../../utils/axios.instance'
import { toast } from 'sonner'
import { error } from 'console'
import { AxiosError } from 'axios'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Minimum 3 character required"),
  firstName: z.string().min(2, "Minimum 3 character required"),
  lastName: z.string().min(2, "Minimum 3 character required")
})
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "john@doe.com",
      password: "john1234",
      firstName: "john1234",
      lastName: "doe"
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data, status } = await axiosInstance.post("/auth/register", values)
      console.log(data, status)
      if (status === 201) {
        navigate('/login')
        toast("Registered successfully")
      }
      else if (status === 409) {
        toast("Account already exist!")
      }
      else if (status === 400) {
        toast("Invalid credentials")
      }

    } catch (error) {
      console.log(error)
      if (error instanceof (AxiosError)) {
        const errorMessage = error.response?.data?.message || "An error occurred during login";
        toast(errorMessage);
      }
    }
  }

  return (
    <section className="container mx-auto h-screen pt-20">
      <h1 className="text-4xl font-bold text-center">Register</h1>
      <div className="bg-white p-4 sm:p-8 rounded-lg border border-black mt-6 max-w-[450px] mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold">Explore Endless Homes 🙂</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl className="flex items-center justify-between border rounded-md pr-2">
                    <div>
                      <Input type={showPassword ? "password" : "text"} placeholder="password" {...field} className="border-none" />
                      <Button type='button' className="w-fit p-0 h-0" variant={'ghost'} onClick={() => setShowPassword((prev) => !prev)}> {!showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs">
              Already have an Account ? <Link to={'/login'} className="underline text-blue-800">Login now</Link>
            </p>
            <Button className="bg-blue-900 hover:bg-blue-900 hover:opacity-80 w-full">Submit</Button>

          </form>
        </Form >
      </div >
    </section >
  )
}

export default RegisterForm