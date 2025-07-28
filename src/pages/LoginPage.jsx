import { Input } from "@/components/ui/input"
import { getUsername, signin } from "@/services/apiBlog"
import SmallSpinner from "@/ui_components/SmallSpinner"
import { Label } from "@radix-ui/react-label"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const LoginPage = ({ setIsAuthenticated, setUsername }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // formState ke andar errors ek nested object hai 

    const mutation = useMutation({
        mutationFn: (data) => signin(data),
        onSuccess: (response) => {
            localStorage.setItem("access", response.access);
            localStorage.setItem("refresh", response.refresh);
            setIsAuthenticated(true); // if logged in successfully set isAuthenticated true.
            getUsername().then((res) => setUsername(res.username));

            toast.success("Successfully logged in");
            const from = location?.state?.from?.pathname || "/"
            // location?.state?.from?.pathname - this path will only exist when user is redirected from protectedroute
            navigate(from, {replace:true});
            
            // console.log(location?.state?.from?.pathname);
            // console.log(response)
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const onSubmit = (data) => {
        mutation.mutate(data);
        // console.log(data);
    }

  return (
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]"
    >
        <div className="flex flex-col gap-2 justify-center items-center mb-2">
            <h3 className="font-semibold text-2xl">Signin</h3>
            <p>Welcome back! login to continue.</p>
        </div>

        <div>
            <Label htmlFor="username" className="dark:text-[#97989F]">Username</Label>
            <Input
                type="text"
                id="username"
                placeholder="Enter username"
                disabled={mutation.isPending}
                {...register("username", {required: "Username is required!"})}
                className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
            />
            {errors?.username?.message && <small className="text-red-700">{errors.username.message}</small>}
        </div>

        <div>
            <Label htmlFor="password" className="dark:text-[#97989F]">Password</Label>
            <Input
                type="password"
                id="password"
                placeholder="Enter password"
                disabled={mutation.isPending}
                {...register("password", {required: "Password is required!"})}
                className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
            />
            {errors?.password?.message && <small className="text-red-700">{errors.password.message}</small>}
        </div>
       
        <div className="w-full flex items-center justify-center flex-col my-4">
            <button disabled={mutation.isPending} className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2 cursor-pointer mb-2">
                {mutation.isPending ? <><SmallSpinner /></> : "Signin"}
            </button> 
            <p className="text-[14px]">Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-300 font-semibold tracking-wide">Signup &rarr;</Link></p>           
        </div>
    </form>
  )
}

export default LoginPage