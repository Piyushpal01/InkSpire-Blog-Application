import React from 'react'
import { BASE_URL } from '@/api'
import { FormatDate } from '@/services/formatDate'
import { Link } from 'react-router-dom'
import ShowProfileAvatar from './ShowProfileAvatar'

const CardFooter = ({ blog }) => {
    return (
        <Link to={`/profile/${blog.author.username}`}>
            <div className='flex items-center gap-4'>
                <span className='flex items-center gap-2'>
                    <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                        {/* Check if profile_pic exists, else show ShowProfileAvatar component */}
                        {blog.author.profile_pic ? (
                            <img
                                src={`${BASE_URL}${blog.author.profile_pic}`}
                                className='c rounded-full w-full h-full object-cover'
                            />
                        ) : (<ShowProfileAvatar username={blog.author.username} />) }
                    </div>
                    <small className='text-[#97989F] text-[12px] font-semibold'>
                        {blog.author.first_name} {blog.author.last_name}
                    </small>
                </span>

                <small className="text-[#97989F] text-[12px] font-semibold ml-3">
                    {FormatDate(blog.published_at)}
                </small>
            </div>
        </Link>
    )
}

export default CardFooter
