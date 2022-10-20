import React from "react";
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';

function Pagination({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
}) {
  let displayedPosts; 
  if (((currentPage*postsPerPage) / totalPosts) > 1) {
    displayedPosts = (totalPosts) % (currentPage * postsPerPage);
  } else {displayedPosts = (postsPerPage * currentPage) }
  
  const pageStart = (currentPage - 1) * postsPerPage + 1;
  const pageUntil = displayedPosts;

  return (
    <div className='flex flex-row justify-center items-center flex-none'>
      <div>
        <nav
          className='relative z-0 inline-flex'
          aria-label='Pagination'
        >
          {/* Left Button */}
          <a className={"select-none relative inline-flex items-center p-2 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-100 " + ((pageStart === 1) ? "text-gray-300 pointer-events-none" : null)} 
            onClick={() => {
               paginateBack()
            }}
            href='#'
          >
            <div className="text-2xl ">
              <MdKeyboardArrowLeft className={(pageStart === 1) ? "pointer-none" : null} />
            </div>
          </a>
        </nav>
      </div>
      {/* Page description */}
      <div className="leading-snug">
        <p className='text-sm text-gray-700 font-medium align-middle leading-none p-2 pb-1'>
          {pageStart} - {pageUntil} of {totalPosts}
        </p>
      </div>
      {/* Right Button */}
      <div>
          <a onClick={() => {
              paginateFront();
            }}
            href='#'
            className={"select-none relative inline-flex items-center p-2 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-100 " + ((totalPosts > pageUntil) ? null : "text-gray-300 pointer-events-none")}
          >
            <div className="text-2xl">
              <MdKeyboardArrowRight className={(pageStart === 1) ? "pointer-none" : null} />
            </div>
          </a>
      </div>
     
      <nav className='block'></nav>
      </div>
    
  );
}
export default Pagination;