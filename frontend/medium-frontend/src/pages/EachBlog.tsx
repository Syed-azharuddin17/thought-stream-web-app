import React from 'react';
import { useBlogs, useSelectedBlog } from '../hooks/useBlogs';
import EachFullBlog from '../components/EachFullBlog';
import { useParams } from 'react-router-dom';
import BlogSkeleton from '../components/BlogSkeleton';

function EachBlog() {
  const { id } = useParams<{ id: string }>(); 
  const { loading, selectedBlog } = useSelectedBlog({ id: Number(id) });

  if (loading) {
    
    return <div>
      <BlogSkeleton/>
      
      
      </div>;
  }

  if (!selectedBlog) {
    return <div>Blog not found.</div>; 
  }

  return (
    <div>
      <EachFullBlog blog={selectedBlog} />
    </div>
  );
}

export default EachBlog;
