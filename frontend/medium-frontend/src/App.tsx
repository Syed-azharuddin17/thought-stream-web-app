
import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

import Blogs from './pages/Blogs'
import EachBlog from './pages/EachBlog'
import Publish from './pages/Publish'

function App() {
  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/blog/:id' element={<EachBlog/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/publish' element={<Publish/>}/>
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
