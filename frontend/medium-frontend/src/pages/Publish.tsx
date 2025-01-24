import React, { ChangeEvent, useState } from 'react';
import AppBar from '../components/AppBar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import {  useNavigate } from 'react-router-dom';

function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) {
  return (
    <form>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="px-4 py-2 bg-white rounded-t-lg">
          <label htmlFor="comment" className="sr-only">
            Write your story
          </label>
          <textarea onChange={onChange}
            id="comment"
            rows={10}
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
            placeholder="Tell your story..."
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t bg-gray-100">
          
        </div>
      </div>
    </form>
  );
}

function Publish() {
  const[title,setTile]=useState("");
  const[description,setDescription]=useState("")
  const navigate = useNavigate();
  return (
    <div>
      {/* Top Navigation Bar */}
      <AppBar name={localStorage.getItem('name') || 'Guest'} />
      <div className="flex justify-center w-full mt-6">
        <div className="max-w-screen-lg w-full px-4">
          {/* Title Input */}
          <div className="relative mb-6">
            <input onChange={(e)=>{setTile(e.target.value)}}
              type="text"
              id="title_input"
              className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="title_input"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Title
            </label>
          </div>

          {/* Text Editor */}
          <TextEditor onChange={(e)=>{setDescription(e.target.value)}}/>
          <button onClick={async ()=>{const response = await axios.post(`${BACKEND_URL}/blog`,{title,content:description},{headers:{
            Authorization:localStorage.getItem("token")
          }});
          navigate(`/blog/${response.data.id}`)  
          console.log(response.data.id)
        }}
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Publish;
