import  { useState } from 'react'
import { Avatar } from './Blog'
import { Link, useNavigate } from 'react-router-dom'

function AppBar({ name }: { name: string | null }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='border-b flex justify-between px-10 py-4'>
      <Link to={'/blogs'} className='flex flex-col justify-center cursor-pointer'>
        ThoughtStream
      </Link>

      <div>
        <Link to={'/publish'}>
          <button
            type='button'
            className='mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2'>
            New
          </button>
        </Link>

        {/* Avatar and Dropdown */}
        <div className="relative inline-block">
          {/* Avatar */}
          <div 
            className="cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Avatar name={name || ""} size={35} />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              <div
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200"
                onClick={()=>{
                  localStorage.removeItem("token");
                  localStorage.removeItem("name");
                  navigate('/signin')
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppBar
