import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-gray-800 bg-black px-6 text-white">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-xl font-bold">
          MovieList🎬
        </Link>
        <Link to="/top100" className="text-sm text-gray-400 hover:text-white">
          Top 100
        </Link>
        <Link to="/mypage" className="text-sm text-gray-400 hover:text-white">
          My Page
        </Link>
      </div>

      <Link
        to="/login"
        className="rounded bg-gray-800 px-3 py-1 text-sm text-white"
      >
        Login
      </Link>
    </nav>
  );
};

export default Navbar;