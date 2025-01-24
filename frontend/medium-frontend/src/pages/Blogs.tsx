
import {Blog} from '../components/Blog'
import AppBar from '../components/AppBar'
import { useBlogs } from '../hooks/useBlogs'
import BlogSkeleton from '../components/BlogSkeleton'

function Blogs() {
    const {loading,blog} = useBlogs()

    const currentDate = new Date().toLocaleDateString('en-GB', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });

    if(loading){
        return(
            <>
            <BlogSkeleton/>
            </>
        )
    }

  return (
    
    <>
    
    <div>
        <AppBar name={localStorage.getItem("name")}/>
    
    <div className='flex justify-center'>
    <div >

        {blog.map((blogs)=>(
            <Blog id={blogs.id} author={blogs.author.name} publishedDate={currentDate} title={blogs.title} content={blogs.content}/>
        ))}
      
      
    </div>
    </div>
    </div>
    
    </>
    
  )
}

export default Blogs
