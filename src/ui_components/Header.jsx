import React from 'react'
import banner from '../images/banner.jpg'

const Header = () => {
  return (
    <section className='max-container px-4 py-4 relative'>
        <div className='w-full h-[300px] overflow-hidden rounded-lg'>
            <img
             src={banner}
             className='w-full h-full object-cover rounded-lg'
            />
        </div>
    </section>
  )
}

export default Header