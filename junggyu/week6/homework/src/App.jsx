import { use, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom'
import Mypage from './pages/Mypage'
import NotFound from './pages/NotFound'
import Top100 from './pages/Top100'
import Login from './pages/Login'
import MovieList from './pages/MovieList'
import { Layout } from './components/layouts/Layout'
import useAuthStore from './stores/useAuthStore'


function App() {
  const accessToken = useAuthStore((state) => state.accessToken);



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MovieList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mypage' element={ accessToken ? <Mypage/> : <Navigate to="/login" replace /> } />
          <Route path='/top100' element={<Top100 />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
