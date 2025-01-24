import React from 'react'
import { Avatar } from './Blog'
import AppBar from './AppBar'
import { Blog } from '../hooks/useBlogs'

function EachFullBlog({blog}:{blog:Blog}) {

  const currentDate = new Date().toLocaleDateString('en-GB', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  return (
    <div >
    <AppBar name={localStorage.getItem("name")}/>

    <div className='flex justify-center'>
    <div className='grid grid-cols-12 px-10 w-full pt-200 max-h-xl pt-12'>
      <div className='col-span-8'>
        <div className='text-3xl font-extrabold'>
          {blog.title}
        </div>

        <div className='text-slate-500 pt-4'>
        {currentDate}
        </div>

        <div className='pt-4'>
          {blog.content}
        </div>
        </div>

        <div className= 'col-span-4'>

          <div className='text-slate-600 text-lg'>
          Author
          </div>
          

          <div className='flex w-full'>
            <div className='pr-4  flex flex-col justify-center'>
            <Avatar size={12} name={blog.author.name || "Anonymous"}/>
            </div>
          
          <div className='text-xl font-bold '>
          {blog.author.name || "Anonymous"}
          
          </div>
          </div>
          <div className='pt-2 text-slate-500'>
          <h1>"Penning stories that spark imagination, one word at a time."<br/></h1>

        It reflects creativity and the idea of crafting compelling stories! Does that resonate with the vibe you're aiming for?
        </div>
          
        
         
          
        </div>

        
      
    </div>
    </div>
    
    </div>
  )
}

export default EachFullBlog
