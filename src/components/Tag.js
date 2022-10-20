import React, { useState } from 'react';
import { BsTags } from 'react-icons/bs';

function Tag({props, open, uniqueId }) {
  const tags = props;
  const tagNumber = tags.length;
  const tagHidden = tagNumber - 2;

  const renderSlice = () => {
    if (tagHidden === 0) {
      return renderFull();
    }
    return (
      <>
        {tags.slice(0,2).map((currElement, index) => (
          <div className="text-sm font-medium border rounded-lg p-2 pb-1 text-cyan-500 border-cyan-500 align-middle leading-none bg-sky-100" key={index}>
            {currElement}
          </div>
        ))}
        <div className="text-sm font-bold border rounded-lg p-2 pb-1 text-cyan-500 border-cyan-500 align-middle leading-none bg-sky-100">
          {tagHidden}+
        </div>
      </>
    )
  }

  const renderFull = () => {
    return (
      <>
        {tags.map((currElement, index) => (
          <div className="text-sm font-medium border rounded-lg p-2 pb-1 text-cyan-500 border-cyan-500 align-middle leading-none bg-sky-100" key={index}>
            {currElement}
          </div>
        ))}
      </>
    )
  }

  return(
  <div className="flex flex-wrap flex-row gap-1 justify-end text-right whitespace-nowrap">
    {open ? renderFull() : renderSlice()}
  </div>
  );
}

export default Tag;