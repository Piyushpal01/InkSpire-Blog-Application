import Badge from './Badge'
import CardFooter from './CardFooter'
import thumbnail from "../images/design_vii.jpg";
import { Link } from 'react-router-dom';
import { BASE_URL } from '@/api';

const BlogCard = ({ blog }) => {
  // console.log(blog)
  return (
    <div className="px-3 py-3 rounded-md w-[300px] min-h-[400px] flex flex-col gap-4 dark:border-gray-800 border shadow-[0_0_20px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_0_20px_rgba(102,0,102,0.6)] transition-transform duration-300 transform hover:scale-[1.04] ">
      <div className='w-full h-[200px] dark:border-red-200 border rounded-md overflow-hidden'>
        <img
          src={`${BASE_URL}${blog.featured_image}`}
          className='w-full h-full object-cover'
        />
      </div>

      <Badge blog={blog} />

      {/* Blog title */}
      <Link to={`blogs/${blog.slug}`}>
        <h3 className="font-semibold leading-normal text-[#181A2A] max-w-max px-2 py-1 rounded-md transition-all duration-200 ease-in-out hover:bg-[#adb7c2]  dark:hover:bg-[#1d1e1f] dark:text-white line-clamp-2 overflow-hidden">
          {blog.title}
        </h3>
      </Link>
      <CardFooter blog={blog} />
    </div>
  )
}

export default BlogCard