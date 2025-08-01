import React from 'react'

const Badge = ({ blog }) => {
  return (
    <span className="px-2 py-[3px] text-[16px] font-semibold bg-[#4B6BFB] text-[#FFFFFF] rounded-sm self-start">
      {blog?.category}
    </span>
  )
}

export default Badge