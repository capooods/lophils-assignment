import React, { useState } from 'react';
import { BsGrid3X2Gap, BsCircleFill } from 'react-icons/bs'
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';

function Accordion(props) {
  const [open, setOpen] = useState(false);

  const toggleHandler = (e) => {
    setOpen(!open);
  }

 

  const openAnimation = useSpring({
    to: { "max-height": open ? "100" : "0px" },
    config: { duration: "300" }
  });
  
  
  return(
    <div className="accordion__item flex-row gap-2 bg-white rounded-lg p-4 border-solid border-2 my-4">
      {/* Heading */}
      <div className="accordion__header h-full font-medium flex gap-4 justify-start items-center">
        <BsGrid3X2Gap className="-rotate-90" />
        <input type="checkbox"  />
        <BsCircleFill className="text-green-600" />
        <div className="flex-row text-center bg-gray-50 rounded-md border-2 border-gray-100 p-1 h-14 w-14">
          <p className="text-lg">12</p>
          <p className="text-sm">JAN</p>
        </div>
        <h2 className="text-lg">{props.title}</h2>
        <MdKeyboardArrowRight className="text-3xl text-gray-400 justify-self-end ml-auto"/>
      </div>

      {/* Content */}
      <div>
        <animated.div id="emailcontent" className="accordion__content overflow-hidden" style={openAnimation}>
          <div className="mt-2 border-t-2 border-dashed">
            <span >{props.text}</span>
          </div>
        </animated.div>
      </div>
      
      
    </div>
  )
}

export default Accordion;
// + ( open ? "max-h-max" : "max-h-0" )}