import React, { useState } from 'react';
import { BsTags } from 'react-icons/bs';
import { useSpring, animated } from 'react-spring';

function Tag({props, open, location}) {
  const tags = props;
  const tagNumber = tags.length;
  const tagHidden = tagNumber - 2;

  const openAnimation = useSpring({
    to: { "opacity": (location === "header") ? (open ? "0" : "1") : (!open ? "0" : "1") },
    config: { duration: "100" }
  });

  const bodyAnimation = useSpring({
    to: { "opacity": (location === "header") ? (open ? "0" : "1") : (!open ? "0" : "1") },
    config: { duration: "100" }
  });



  const renderSlice = () => {
    if (location !== "header") {
      return renderFull();
    }

    if (tagHidden === 0) {
      return renderFull();
    }
    
    return (
      <>
        {tags.slice(0,2).map((currElement, index) => (
          <animated.div style={openAnimation} className="text-sm font-medium border rounded-lg p-2 pb-1 text-cyan-500 border-cyan-500 align-middle leading-none bg-sky-100" key={index}>
            {currElement}
          </animated.div>
        ))}
        
        <animated.div style={openAnimation} className="text-sm font-bold border rounded-lg p-2 pb-1 text-cyan-500 border-cyan-500 align-middle leading-none bg-sky-100">
          {tagHidden}+
        </animated.div>
      </>
    )
  }

  const renderFull = () => {
    return (
      <>
        {tags.map((currElement, index) => (
          <animated.div style={openAnimation} className="text-sm font-medium border rounded-lg p-2 pb-1 text-cyan-500 border-cyan-500 align-middle leading-none bg-sky-100" key={index}>
            {currElement}
          </animated.div>
        ))}
      </>
    )
  }

  return(
  <div className="flex flex-wrap flex-row gap-1 justify-end text-right whitespace-nowrap">
    {renderSlice()}
  </div>
  );
}

export default Tag;