import Badge from "@/ui_components/Badge"
import BlogWriter from '@/ui_components/BlogWriter'
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { deleteBlog, getBlog } from "@/services/apiBlog"
import Spinner from "@/ui_components/Spinner"
import { BASE_URL } from "@/api"
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Modal from "@/ui_components/Modal"
import CreatePostPage from "./CreatePostPage"
import { useState } from "react"
import { toast } from "react-toastify"


const DetailPage = ({ username, isAuthenticated }) => {

    const { slug } = useParams()
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const { isPending, isError, error, data: blog } = useQuery({
        queryKey: ['blogs', slug],
        queryFn: () => getBlog(slug)
    })

    // console.log(blog);
    const blogId = blog?.id;

    const toggleModal = () => {
        setShowModal(curr => !curr)
    }


    const deleteMutation = useMutation({
        mutationFn: (id) => deleteBlog(id),
        onSuccess: () => {
            toast.success("Deleted Successfully1");
            navigate("/");
        },
        onError: (err) => {
            console.log(err)
            toast.error(err.message);
        }
    });

    function handleDeleteBlog() {
        const popup = window.confirm("Are you sure, you want to delete this blog?");

        if (!popup) {
            return;
        } else {
            deleteMutation.mutate(blogId);
        }
    }

    if (isPending) {
        return <Spinner />
    }

    return (
        <>
            <div className='px-20 py-9 max-container'>
                <Badge blog={blog} />

                {/* heading */}
                <div className="w-full max-w-full mx-auto py-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h2 className="leading-normal text-2xl md:text-3xl text-[#181A2A] tracking-wide font-semibold dark:text-zinc-200">
                            {blog.title}
                        </h2>
                        {isAuthenticated && username === blog.author.username &&
                            <span className="flex gap-4 self-end md:self-auto">
                                <span className="relative group">
                                    <HiPencilAlt onClick={toggleModal} className="dark:text-white text-3xl cursor-pointer" />
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-9 w-max bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                    Edit Post
                                    </div>
                                </span>
                                <span className="relative group">
                                    <MdDelete onClick={handleDeleteBlog} className="dark:text-white text-3xl cursor-pointer" />
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-9 w-max bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                    Delete Post
                                    </div>
                                </span>
                            </span>
                        }
                    </div>
                </div>

                <BlogWriter blog={blog} />


                <div className='w-full h-[550px] my-9 overflow-hidden rounded-sm'>
                    <img
                        src={`${BASE_URL}${blog.featured_image}`}
                        className='w-full h-full object-cover rounded-sm'
                    />
                </div>
                <p className='text-[1rem] leading-[2rem] text-justify break-words overflow-hidden text-[#3B3C4A] dark:text-[#BABABF]'>
                    {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum nostrum deserunt ea et aut eveniet rerum debitis. Pariatur ea, architecto minima similique distinctio voluptas odio sequi ipsam labore consectetur culpa, nemo placeat vel eum soluta. Suscipit nisi enim quas ab error dolorem iusto voluptate expedita corporis sequi mollitia cupiditate eius ea natus molestiae rerum facere, consectetur beatae laudantium temporibus totam itaque quisquam voluptas. Dicta inventore aperiam consequatur sit fugit. Beatae magnam, necessitatibus excepturi consectetur corporis illo aperiam harum cupiditate distinctio impedit consequatur? Omnis doloribus vel perferendis reiciendis possimus veritatis laudantium in, assumenda provident dicta quisquam perspiciatis iusto tenetur dolorum consequuntur? */}
                    {blog.content}
                </p>

            </div>
            {showModal &&
                <Modal toggleModal={toggleModal}>
                    {/* passing component as a prop */}
                    <CreatePostPage blog={blog} />
                </Modal>}
        </>
    )
}

export default DetailPage