import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../ui/input"
import { axiosInstance } from "../../utils/axios.instance"
import { useCookies } from "react-cookie"
import { AxiosError } from "axios"
import { jwtDecode } from "jwt-decode";


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Minimum 3 character required")
})

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [cookies, setCookie] = useCookies(['user'])
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "john@doe.com",
      password: "123456"
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axiosInstance.post('/auth/login', values);
      if (data) {
        const decoded = jwtDecode(data)
        setCookie('user', { token: data, ...decoded });
        toast("Login successfully");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError)
        toast(error.response?.data.message);
    }
  }


  return (
    <section className="container mx-auto h-screen pt-20">
      <h1 className="text-4xl font-bold text-center">Login</h1>
      <div className="bg-white p-4 sm:p-8 rounded-lg border border-black mt-6 max-w-[450px] mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold">Welcome Back 👋</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" {...field} className="outline-none" />
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
                      <Input type={showPassword ? "password" : "text"} placeholder="password" {...field} className="border-none focus:ring-0 focus:outline-none outline-none" />
                      <Button type="button" className="w-fit p-0 h-0" variant={'ghost'} onClick={() => setShowPassword((prev) => !prev)}> {!showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs">
              New here ? <Link to={'/register'} className="underline text-blue-800">Register now</Link>
            </p>
            <Button type="submit" className="bg-blue-900 hover:bg-blue-900 hover:opacity-80 w-full">Submit</Button>

          </form>
        </Form >
      </div >
    </section >
  )
}