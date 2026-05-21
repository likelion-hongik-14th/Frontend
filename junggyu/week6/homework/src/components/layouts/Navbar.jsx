import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  return (
    <nav className="fixed top-0 border-b-1 border-gray-600 left-0 right-0 h-20 bg-black text-white flex items-center justify-between px-10 z-50">
      <div className="hidden md:flex space-x-10 items-center">
        <Link to="/" className="font-semibold text-2xl hover:scale-110 hover:text-gray-400 inline-block">
          MovieList🎬
        </Link>
        <Link to="/top100" className="hover:scale-110 hover:text-gray-400 inline-block">Top 100</Link>
        <Link to="/mypage" className="hover:scale-110 hover:text-gray-400 inline-block">My Page</Link>
      </div>
      <Link to="/login" className="hidden md:blockhover:scale-110 hover:text-gray-400 ">Login</Link>

      <Link to="/" 
        className='md:hidden font-semibold text-xl'
        onClick={()=> setIsOpen(false)}
      >
        MovieList🎬
      </Link>

      <button onClick={()=> setIsOpen(!isOpen)} className='md:hidden cursor-pointer text-xl'>
        {isOpen ? 'X' : '☰'}
      </button>

      {isOpen && (
        <div className='md:hidden absolute top-20 left-0 right-0 bg-black flex flex-col gap-3 px-6 py-4 space-y-4'> 
          <Link to="/top100" onClick={()=> setIsOpen(false)}  >
            Top 100
          </Link>
          <Link to="/mypage" onClick={()=> setIsOpen(false)}  >
            My Page
          </Link>
          <Link to="/login" onClick={()=> setIsOpen(false)} >
            Login
          </Link>
        </div>
      )}



    </nav>
  );
};

export default Navbar;