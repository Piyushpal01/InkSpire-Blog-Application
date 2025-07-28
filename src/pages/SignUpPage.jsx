import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registerUser, updateUserProfile } from "@/services/apiBlog"
import { toast } from "react-toastify"
import SmallSpinner from "@/ui_components/SmallSpinner"
import { Textarea } from "@/components/ui/textarea"

const SignUpPage = ({ userInfo, updateForm, toggleModal }) => {

    const queryClient = useQueryClient();


    // {defaultValues: userInfo ? userInfo : {}} -> to get default vals for updating profile pic.
    const { register, handleSubmit, formState, reset, watch } = useForm({ defaultValues: userInfo ? userInfo : {} });
    const { errors } = formState;

    const password = watch("password");

    const updateUserProfileMutation = useMutation({
        mutationFn: (data) => updateUserProfile(data),
        onSuccess: () => {
            toast.success("Profile updated successfully");
            toggleModal();
            queryClient.invalidateQueries({ queryKey: ["users", userInfo?.username] })
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    // making post req so we have to use mutation
    const mutation = useMutation({
        mutationFn: (data) => registerUser(data),
        onSuccess: () => {
            toast.success("Registration successfull")
            reset()
        },
        onError: (error) => {
            // 1. Check if errorData has a 'username' key AND its first element contains phrase 'already exists'
            // This matches typical Django error response:
            // { username: ["A user with that username already exists."] }
            if (error.username && error.username[0]?.includes("already exists")) {
                toast.error("Username already exists!"); // this is coming from apiBlog if catch block executes. 
            } else {
                // 2. Agar username specific error nahi hai, then fall back to a generic error.
                toast.error("Registration failed!");
            }
        }
    });

    function onSubmitForm(data) {
        // console.log(data);

        if (updateForm) {
            // console.log(data);
            const formData = new FormData();
            formData.append("username", data.username);
            formData.append("email", data.email);
            formData.append("first_name", data.first_name);
            formData.append("last_name", data.last_name);
            formData.append("job_title", data.job_title);
            formData.append("bio", data.bio);
            formData.append("instagram", data.instagram || "");
            formData.append("facebook", data.facebook || "");
            formData.append("twitter", data.twitter || "");
            formData.append("youtube", data.youtube || "");
            formData.append("linkedin", data.linkedin || "");
            formData.append("github", data.github || "");

            if (data.profile_pic && data.profile_pic[0]) {
                if (data.profile_pic[0] != "/") {
                    formData.append("profile_pic", data.profile_pic[0]);
                }
            }

            updateUserProfileMutation.mutate(formData)
        } else {

            mutation.mutate(data);
        }
    }

    return (
        <form className={`${updateForm && "h-[90%] overflow-auto"} md:px-16 px-8 py-6 flex flex-col mx-auto my-6 items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-black/20 shadow-[0_0_20px_0_rgba(0,0,0,0.1)] transition-all duration-200 dark:text-white dark:bg-[#141624]`}
            onSubmit={handleSubmit(onSubmitForm)}
        >
            <div className='flex flex-col gap-2 justify-center items-center mb-2'>
                <h3 className='font-semibold text-2xl'>{updateForm ? "Update Profile" : "SignUp"}</h3>
                <p>{updateForm ? "" : "Create your account to get started"}</p>
            </div>

            <div>
                <Label htmlFor="username" className="dark:text-[#97989F] mb-3">Username</Label>
                <Input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    {...register("username", {
                        required: "Username is required!",
                        minLength: { value: 3, message: "Username must be atleast 3 characters" }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
                {errors?.username?.message && <small className="text-red-700">{errors.username.message}</small>}
            </div>

            <div>
                <Label htmlFor="email" className="dark:text-[#97989F] mb-3">Email</Label>
                <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Email is required!",
                        minLength: { value: 3, message: "Not a valid email!" }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
                {errors?.email?.message && <small className="text-red-700">{errors.email.message}</small>}
            </div>

            <div>
                <Label htmlFor="first_name" className="dark:text-[#97989F] mb-3">First Name</Label>
                <Input
                    type="text"
                    id="first_name"
                    placeholder="Enter your first name"
                    {...register("first_name", {
                        required: "first_name is required!",
                        minLength: { value: 3, message: "first_name must be atleast 3 characters!" }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
                {errors?.first_name?.message && <small className="text-red-700">{errors.first_name.message}</small>}
            </div>

            <div>
                <Label htmlFor="last_name" className="dark:text-[#97989F] mb-3">Last Name</Label>
                <Input
                    type="text"
                    id="last_name"
                    placeholder="Enter your last name"
                    {...register("last_name", {
                        required: "last_name is required!",
                        minLength: { value: 3, message: "last_name must be atleast 3 characters!" }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
                {errors?.last_name?.message && <small className="text-red-700">{errors.last_name.message}</small>}
            </div>

            {updateForm && <div>
                <Label htmlFor="job_title" className="dark:text-[#97989F] mb-3">Job Title</Label>
                <Input
                    type="text"
                    id="job_title"
                    placeholder="Enter job title"
                    {...register("job_title", {
                        required: "job title is required!",
                        minLength: { value: 3, message: "job title must be atleast 3 characters!" }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
                {errors?.job_title?.message && <small className="text-red-700">{errors.job_title.message}</small>}
            </div>}

            {updateForm && <div>
                <Label htmlFor="bio" className="dark:text-[#97989F] mb-3">Bio</Label>
                <Textarea
                    id="content"
                    placeholder="Tell us more about you..."
                    {...register("bio", {
                        required: "bio is required!",
                        minLength: { value: 3, message: "The content must be atleast 10 characters!" }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
                {errors?.bio?.message && <small className="text-red-700">{errors.bio.message}</small>}
            </div>}

            {updateForm && <div>
                <Label htmlFor="profile_pic" className="dark:text-[#97989F] mb-3">Profile Picture</Label>
                <Input
                    type="file"
                    id="profile_pic"
                    {...register("profile_pic", {
                        required: false,
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
            </div>}

            {updateForm || <div>
                <Label htmlFor="password" className="dark:text-[#97989F] mb-3">Password</Label>
                <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: "Password is required!",
                        minLength: { value: 8, message: "password must be atleast 8 characters!" }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
                {errors?.password?.message && <small className="text-red-700">{errors.password.message}</small>}
            </div>}

            {/* // Render updateForm if truthy; otherwise, render a fallback <div> */}
            {updateForm || <div>
                <Label htmlFor="confirmPassword" className="dark:text-[#97989F] mb-3">Confirm Password</Label>
                <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Enter your password again"
                    {...register("confirmPassword", {
                        required: "Confirm Password is required!",
                        minLength: { value: 8, message: "Confirm Password must be atleast 8 characters!" },
                        validate: (value) => value === password || "Password do not match"
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
                {errors?.confirmPassword?.message && <small className="text-red-700">{errors.confirmPassword.message}</small>}
            </div>
            }

            {/* social links */}
            {updateForm && <div>
                <Label htmlFor="instagram" className="dark:text-[#97989F] mb-3">Instagram</Label>
                <Input
                    type="url"
                    name="instagram"
                    id="instagram"
                    placeholder="Enter your Instagram profile URL"
                    {...register("instagram")}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
            </div>}
            {updateForm && <div>
                <Label htmlFor="facebook" className="dark:text-[#97989F] mb-3">Facebook</Label>
                <Input
                    type="url"
                    id="facebook"
                    placeholder="Enter your Facebook profile URL"
                    {...register("facebook")}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
            </div>}
            {updateForm && <div>
                <Label htmlFor="twitter" className="dark:text-[#97989F] mb-3">Twitter</Label>
                <Input
                    type="url"
                    id="twitter"
                    placeholder="Enter your Twitter profile URL"
                    {...register("twitter")}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
            </div>}
            {updateForm && <div>
                <Label htmlFor="youtube" className="dark:text-[#97989F] mb-3">Youtube</Label>
                <Input
                    type="url"
                    id="youtube"
                    placeholder="Enter your Youtube profile URL"
                    {...register("youtube")}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
            </div>}
            {updateForm && <div>
                <Label htmlFor="linkedin" className="dark:text-[#97989F] mb-3">LinkedIn</Label>
                <Input
                    type="url"
                    id="linkedin"
                    placeholder="Enter your LinkedIn profile URL"
                    {...register("linkedin")}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
            </div>}
            {updateForm && <div>
                <Label htmlFor="github" className="dark:text-[#97989F] mb-3">Github</Label>
                <Input
                    type="url"
                    id="github"
                    placeholder="Enter your Github profile URL"
                    {...register("github")}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[350px]"
                />
            </div>}

            {/* button */}
            <div className="w-full flex items-center justify-center flex-col my-4">

                {updateForm ? (
                    <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2 mb-3">
                        {updateUserProfileMutation.isPending ? <div><SmallSpinner /></div> : "Update profile"}
                    </button>
                ) : (
                    <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2 mb-3">
                        {mutation.isPending ? <div><SmallSpinner /></div> : "Signup"}
                    </button>
                )}

                <p>Already have an account? <Link to="/signin" className="text-blue-500 hover:text-blue-300 font-semibold tracking-wide">Login &rarr;</Link></p>
            </div>

        </form>
    )
}

export default SignUpPage