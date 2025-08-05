import React from 'react'
import pic from "../images/pic.jpg"
import { BASE_URL } from '@/api'
import { FormatDate } from '@/services/formatDate'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

const BlogWriter = ({ blog }) => {
    console.log(blog)
  return (
    <Link to={`/profile/${blog.author.username}`} className='inline-block'>
        <div className='flex items-center gap-4 '>
            <span className='flex items-center gap-2'>
                
                {/* profile pic */}
                <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                   {blog?.author?.profile_pic ? (
                    <img
                    src={`${BASE_URL}${blog.author.profile_pic}`}
                    className='c rounded-full w-full h-full object-cover'
                    />
                   ) : (
                    <FaUserCircle className='w-[40px] h-[40px] dark:text-white' />
                   )}
                   
                    {/*  */}
                </div>
                
                {/* Author name */}
                <small className='text-[14px] text-[#696A75]'>
                    {blog.author.first_name} {blog.author.last_name}
                </small>
            </span>
            <small className='text-[14px] text-[#696A75] ml-3'>
                {FormatDate(blog.published_at)}
            </small>
        </div>
    </Link>
  )
}

export default BlogWriter