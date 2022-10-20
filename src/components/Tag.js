import React, { useState } from 'react';
import { BsTags } from 'react-icons/bs';
import { useSpring, animated } from 'react-spring';

function Tag({props, open, location}) {
  const tags = props;
  const tagNumber = tags.length;
  let tagHidden;
  
  let wordLength;

  const openAnimation = useSpring({
    to: { "opacity": (location === "header") ? (open ? "0" : "1") : (!open ? "0" : "1") },
    config: { duration: "100" }
  });

  const bodyAnimation = useSpring({
    to: { "opacity": (location === "header") ? (open ? "0" : "1") : (!open ? "0" : "1") },
    config: { duration: "100" }
  });

  const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
  }

  const renderSlice = () => {
    if (location !== "header") {
      return renderFull();
    }

    if (tags.length <= 2) {
      return renderFull();
    }
    if ((tags[1].length > 20)) {
      wordLength = 1;
    } else { wordLength = 2}
    tagHidden = tagNumber - wordLength;
    
    return (
      <>
        {tags.slice(0, wordLength).map((currElement, index) => (
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
  <div className={"flex flex-wrap flex-row gap-1 justify-end whitespace-nowrap w-xl "}>
    {renderSlice()}
  </div>
  );
}

export default Tag;