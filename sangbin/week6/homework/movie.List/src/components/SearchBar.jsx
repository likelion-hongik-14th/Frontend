import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search shows..."
        className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-full pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-gray-500"
      />
    </div>
  );
};

export default SearchBar;
