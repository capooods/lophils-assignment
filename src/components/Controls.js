import React from 'react';
import { FaTrash } from 'react-icons/fa'

function Controls({ selectAll, handleCheckAll, handleDelete, handleSave }) {
  return(
    <>
      <div className="flex flex-row items-center gap-4 flex-none">
        <input type="checkbox" checked={selectAll} onChange={handleCheckAll} />
        {/* Save Button */}
        <div className="">
          <a className="select-none inline-flex items-center rounded-md text-sm text-md text-gray-500 bg-emerald-100 border border-emerald-600 hover:drop-shadow"
            onClick={handleSave}
            href='#'
          >
            <div className="flex flex-row justify-center items-center p-1 text-emerald-600 ">
              <span className="align-middle leading-none p-1 pb-0 mr-1">SAVE</span>
              <svg className="mr-2 fill-emerald-600" width="12px" height="12px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"/></svg>
            </div>
          </a>
        </div>
        
        {/* Filter Button */}
        <div className="">
          <a className="select-none inline-flex items-center rounded-md text-sm text-md bg-gray-100 border border-gray-300 hover:drop-shadow"
            // onClick={}
            href='#'
          >
            <div className="flex flex-row justify-center items-center p-1 text-gray-600 ">
              <span className="align-middle leading-none p-1 pb-0 mr-1">MANAGE FILTERS</span>
              <svg className="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
            </div>
          </a>
        </div>
        {/* Divider */}
        <div className="border-solid border-gray-300 border-l h-2/3">
          <span>&#8207;</span>
        </div>
        
        {/* Delete Button */}
        <div className="">
          <a className="select-none inline-flex items-center rounded-md text-sm text-md text-gray-500 bg-red-100 border border-red-500 hover:drop-shadow"
            onClick={handleDelete}
            href='#'
          >
            <div className="flex flex-row justify-center items-center p-1 text-red-500 ">
              <span className="align-middle leading-none p-1 pb-0 mr-1">DELETE</span>
              <div className="rounded-full bg-red-500 p-1">
                <div>
                  <FaTrash className="text-[8px] text-red-100" />
                </div>
                
              </div>
              
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

export default Controls;