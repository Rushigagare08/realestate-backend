import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import{FaSearch} from 'react-icons/fa';
import { useState } from "react";
import { useEffect } from "react";
export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);

  const buttonBase =
    "px-4 py-2 border border-slate-500 rounded-lg bg-white transition font-medium text-slate-900 no-underline visited:text-slate-900 focus:text-slate-900 active:text-slate-900";

  const hover = "hover:bg-orange-500 hover:text-white hover:border-orange-500";
const[searchTerm,setSearchTerm]=useState('')
const navigate=useNavigate();

const handleSubmit=(e)=>{
  e.preventDefault();
  const urlParams=new URLSearchParams(window.location.search)
  urlParams.set('searchTerm',searchTerm);
  const searchQuery=urlParams.toString();
  navigate(`/search?${searchQuery}`)
}
useEffect(()=>{
  const urlParams=new URLSearchParams(location.search);
  const searchTermFromUrl=urlParams.get('searchTerm');
  if(searchTermFromUrl){
    setSearchTerm(searchTermFromUrl);
  }
},[location.search]);
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 no-underline text-slate-900 visited:text-slate-900 focus:text-slate-900 active:text-slate-900"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 bg-orange-500 rounded-lg shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 11.5L12 4l9 7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 11.5v7.5a1 1 0 0 0 1 1h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3a1 1 0 0 0 1-1v-7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[20px] md:text-[22px] font-bold text-slate-900">BrickByte</span>
        </Link>
        <form onSubmit={handleSubmit} className="bg-orange-100 p-3 rounded-lg flex items-center">
          <input type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none w-24 sm:w-64"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}/>
        </form>
        <button>
          <FaSearch className='text-orange-600'/>
        </button>

        {/* Links */}
        <nav className="hidden md:flex gap-5">
          <Link
            to="/search"
            className={`${buttonBase} ${hover} text-slate-900 visited:text-slate-900 focus:text-slate-900 active:text-slate-900`}
          >
            Buy
          </Link>

          <Link
            to="/create-listing"
            className={`${buttonBase} ${hover} text-slate-900 visited:text-slate-900 focus:text-slate-900 active:text-slate-900`}
          >
            Sell
          </Link>
          <Link
            to="/about"
            className={`${buttonBase} ${hover} text-slate-900 visited:text-slate-900 focus:text-slate-900 active:text-slate-900`}
          >
            About
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {!currentUser ? (
            <Link
              to="/sign-in"
              className={`${buttonBase} ${hover} text-slate-900 visited:text-slate-900 focus:text-slate-900 active:text-slate-900`}
            >
              Sign In
            </Link>
          ) : (
            <Link to="/profile" className="no-underline">
              <img
                src={currentUser.avatar}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border border-slate-300"
              />
            </Link>
          )}

          <Link
            to="/sign-up"
            className="px-6 py-2 rounded-lg font-semibold no-underline bg-orange-500 hover:bg-orange-600 text-white"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button className="p-2 rounded-md text-slate-700 hover:bg-slate-100">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="#1f2937" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
