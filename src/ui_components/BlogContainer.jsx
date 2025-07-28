import React from 'react'
import BlogCard from './BlogCard'
import Spinner from './Spinner'

const BlogContainer = ({isPending, blogs=[], title="Latest Posts"}) => {

  // isPending is coming form HomePage.
  if (isPending){
    return <Spinner />
  }

  // console.log(blogs)

  return (
    <section className='p-6 max-container'>
        <h2 className='font-semibold text-xl mb-6 tracking-wide dark:text-white text-center'>
            {title}
        </h2>
        <div className='flex justify-center items-center gap-24 flex-wrap'>
            {blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>
    </section>
  )
}

export default BlogContainer