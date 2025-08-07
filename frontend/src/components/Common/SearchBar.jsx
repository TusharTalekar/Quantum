import { useState } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters, setFilters } from "../../redux/slices/productsSlice";



const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  }

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-amber-50 h-24 z-50" : "w-auto"}`} >
      {isOpen ? (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value) }}
              className="bg-amber-100 px-4 py-3 pl-4 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full placeholder:text-stone-600 border border-amber-300"
            />

            {/* search icon */}
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-600 hover:text-stone-800">
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          {/* close button */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-600 hover:text-stone-800">
            <HiMiniXMark className="h-6 w-6" />
          </button >
        </form >
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className='h-7 w-7 text-stone-700' />
        </button>
      )}
    </div >
  )
}

export default SearchBar