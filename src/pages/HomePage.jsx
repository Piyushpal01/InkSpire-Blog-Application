import { getBlogs, getBlogsByCategory } from '@/services/apiBlog'
import BlogContainer from '@/ui_components/BlogContainer'
import Header from '@/ui_components/Header'
import PagePagination from '@/ui_components/PagePagination'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useState } from 'react'
import NoBlogPage from './NoBlogPage'
import { useSearchParams } from 'react-router-dom'

const HomePage = () => {

  const [page, setPage] = useState(1); // by default page value is 1.
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { isPending, isError, error, data: blogs } = useQuery({
    queryKey: ['blogs', page, category],  // Using category in queryKey to refetch based on category
    queryFn: () => {
      // returning a callback for queryFn
      if(category) return getBlogsByCategory(category);
      else return getBlogs(page);
    },
    placeholderData: keepPreviousData,
  })
  // console.log(blogs); // data:blogs -> renaming data as blogs. & if isPending is true means blogs is still fetching if it is false means blogs had been fetched.

  // calculating number of blogs per page, as for 6 blogs we need 2 page, for 7 we're gonna need 3 page
  const numberOfBlogs = 3
  const numberOfPages = Math.ceil(blogs?.count / numberOfBlogs)

  function handleSetPage(val) {
    setPage(val);
  }

  function increasePageValue() {
    setPage(curr => curr + 1)
  }
  function decreasePageValue() {
    setPage(curr => curr - 1)
  }

  return (
    <>
      <Header />

      {/* If no blogs exist then rendering "No Blog Page" */}

      {blogs?.results?.length === 0 ? (<NoBlogPage />) : (
        <>
        <BlogContainer isPending={isPending} blogs={blogs?.results || []} /> {/* {blogs?.result || [] -> optional chaining as it's good for dealing with situations where properties might not exist or be null or undefined, it safely access nested properties of an object */}

        {/* Only show pagination if blogs exist */}
        {blogs?.results?.length > 0 && (
          <PagePagination
          page={page}
          numberOfPages={numberOfPages}
          handleSetPage={handleSetPage}
          increasePageValue={increasePageValue}
          decreasePageValue={decreasePageValue}
          />
        )}
        </>
      )}

    </>
  )
}

export default HomePage