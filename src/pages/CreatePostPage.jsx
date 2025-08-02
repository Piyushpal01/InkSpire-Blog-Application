import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup
} from "@/components/ui/select"
import { Checkbox } from '@radix-ui/react-checkbox'
import { useForm } from 'react-hook-form'
import InputError from '@/ui_components/InputError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlog, updateBlog } from '@/services/apiBlog'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import SmallSpinner from '@/ui_components/SmallSpinner'
import LoginPage from './LoginPage'
import { Button } from "@/components/ui/button";


const CreatePostPage = ({ blog, isAuthenticated }) => {

    const { register, handleSubmit, formState: { errors }, setValue, reset, } = useForm({ defaultValues: blog ? blog : {} });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const blogId = blog?.id;

    const updateMutation = useMutation({
        mutationFn: ({data, id}) => updateBlog(data, id),
        onSuccess: () => {
            navigate("/");
            toast.success("Successfully updated!");
        },
        onError: (err) => {
            toast.error(err.message);
            console.log("Error: ", err);
        }
    })

    const mutation = useMutation({
        mutationFn: (data) => createBlog(data),
        onSuccess: () => {
            toast.success("Successfully created new blog!");
            queryClient.invalidateQueries({queryKey: ["blogs"]}); // refreshing the blog querykey after creating blog for new changes.
            navigate("/");
        }
    });

    function onSubmit(data) {
        // we're using formData bcoz we are also using image field.
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("category", data.category);
        
        if(data.featured_image && data.featured_image[0]){
            // data.featured_image is a array/list of files.
            if(data.featured_image[0] != "/"){
                formData.append("featured_image", data.featured_image[0]);
            }
        }

        // if blog exist that means we are working on udpate form if not that means we are working on creating form
        if(blog && blogId){
            updateMutation.mutate({data: formData, id: blogId});

        }
        else{
            mutation.mutate(formData);
        }

        // console.log(data);
    }

    if(isAuthenticated === false){
        return <LoginPage />
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${blog && "h-[90%] overflow-auto"} md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-6 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
        >
            <div className='flex flex-col gap-2 justify-center items-center mb-2'>
                <h3 className='font-semibold text-2xl'>{blog? "Update Post" : "Create Post"}</h3>
                <p>
                    {blog ? "" : "Create a new post and share your ideas"}
                </p>
            </div>

            <div>
                <Label htmlFor='title' className="mb-2 dark:text-[#97989F]">Title</Label>
                <Input
                    type="text"
                    id="title"
                    placeholder="Give your post a title"

                    {...register("title", {required: "Blog's title is required!", minLength:{value: 5, message: "title must be atleast 3 characters!"}})}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px]"
                />
                {errors?.title?.message && <InputError error={errors.title.message} />}
            </div>

            <div>
                <Label htmlFor="content" className="dark:text-[#97989F]">Content</Label>
                <Textarea
                    id="content"
                    placeholder="Write your blog post..."
                    {...register("content", {required: "Blog's content is required!", minLength:{value: 10, message: "content must be atleast 3 characters!"}})}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px] w-[400px] text-justify"
                />
                {errors?.content?.message && <InputError error={errors.content.message} />}
            </div>

            <div className='w-full'>
                <Label htmlFor='category' className="dark:text-[#97989F]">Category</Label>
                <Select
                    {...register("category", {required: "Blog's category is required!"})}
                        onValueChange={(val) => setValue("category", val)}
                        defaultValue={blog ? blog.category : ""}
                >
                    <SelectTrigger className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value="Frontend">Frontend</SelectItem>
                            <SelectItem value="Backend">Backend</SelectItem>
                            <SelectItem value="FullStack">FullStack</SelectItem>
                            <SelectItem value="Web3">Web3</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Economy">Economy</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Sports">Sports</SelectItem>
                            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {errors?.category?.message && <InputError error={errors.category.message} />}

            </div>

            <div className='w-full'>
                <Label htmlFor='featured_image' className="dark:text-[#97989F]">Featured Image</Label>
                <Input
                    type="file"
                    id="picture"

                    {...register("featured_image", {required: blog ? false :  "Blog's featured image is required!"})}
                    className="dark:text-[#97989f] border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full"
                />

                {errors?.featured_image?.message && <InputError error={errors.featured_image.message} />}

            </div>

            <div className='flex items-center space-x-2 w-full'>
                <Checkbox id="is_draft" />
                <Label htmlFor='is_draft' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    Save as draft    
                </Label> 
            </div>

            <div className='w-full flex items-center justify-center flex-col my-4'>
                {blog ? (
                    <button
                        disabled={updateMutation.isPending}
                        className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {updateMutation.isPending ? <><SmallSpinner /></> : "Update Post"}
                    </button>
                    )
                    :
                    (
                    <button
                        disabled={mutation.isPending}
                        className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {mutation.isPending ? <><SmallSpinner /></> : "Create Post"}
                    </button>

                    )
                }
                <Link to="/">
            <Button className="cursor-pointer tracking-wider font-semibold mt-6 text-sm ">Back to home &rarr;</Button>
          </Link>
            </div>

        </form>
    )
}

export default CreatePostPage