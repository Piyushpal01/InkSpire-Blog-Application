import React from 'react'
import BlogCard from './BlogCard'
import Spinner from './Spinner'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBlogsByCategory } from '@/services/apiBlog'
import NoBlogPage from '@/pages/NoBlogPage'

const BlogContainer = ({ isPending, blogs = [], title = "Latest Posts" }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  // rendering blogs after getting category if given
  const { error, data, isLoading } = useQuery({
    queryKey: ['blogs', category],
    queryFn: () => getBlogsByCategory(category || ""),
    enabled: !!category,
  });

  const blogsToRender = category ? data?.results || [] : blogs;

  if (isPending || isLoading) {
    return <Spinner />;
  }

  // if no blogs render no blog page
 if (!blogsToRender || blogsToRender.length === 0) {
  return <NoBlogPage />;
}

  return (
    <section className='p-6 max-container'>
      <h2 className='font-semibold text-xl mb-6 tracking-wide dark:text-white text-center'>
        {title}
      </h2>
      <div className='flex justify-center items-center gap-24 flex-wrap'>
        {blogsToRender.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogContainer