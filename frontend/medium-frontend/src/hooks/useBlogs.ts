import axios from 'axios';
import  { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

export function useBlogs() {
  interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
      name: string;
    };
  }

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setBlog(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false in both success and error cases
      }
    };

    fetchBlogs(); // Call the async function
  }, []); // Add an empty dependency array to ensure the effect runs only once

  return {
    loading,
    blog,
  };
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export function useSelectedBlog({ id }: { id: number }) {
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog>();

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchSelectedBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setSelectedBlog(response.data.blogs);
      } catch (error) {
        console.error(`Error fetching blog with id ${id}:`, error);
      } finally {
        setLoading(false); // Ensure loading is set to false in both success and error cases
      }
    };

    fetchSelectedBlog(); // Call the async function
  }, [id]); // Effect runs only when the `id` changes

  return {
    loading,
    selectedBlog,
  };
}
