import React from 'react'
import { useBlogs } from '../hooks/useBlogs'
import { Link } from 'react-router-dom'

interface BlogCard{
  author:string,
  title:string,
  content:string,
  publishedDate:string,
  id:number
}

export function Blog({id,author,title,content,publishedDate}:BlogCard) {

  
  return (
    <Link to={`/blog/${id}`}>
    <div className='p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer'>
  <div className='flex '>
    <Avatar name={author}/>
  
  <div className='flex justify-center flex-col font-extralight pl-2'>
    {author}
  </div>
  <div className="px-2"> &#9679; </div> 
  <div className='flex justify-center flex-col pl-2 font-thin text-slate-500'>
    . {publishedDate}
  </div>

</div>

      
      <div className='text-xl font-semibold pt-2'>
        {title}
      </div>
      <div className='text-md thin'>
        {content.length>100?content.slice(0,100)+"...":content}
      </div>
      <div className='text-slate-500 text-sm font-thin pt-2'>
        {`${Math.ceil(content.length/100)} minute(s) read` }
      </div>
      {/* <div className='bg-slate-200 h-1 w-full'>

      </div> */}
    </div>
    </Link>
  )
}

export function Avatar({name,size=8}:{name:string,size?:number}){
  return(
    <>
  <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden  dark:bg-gray-400 rounded-full dark:bg-grey-600`}>
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
  </div>

    </>
  )
}


