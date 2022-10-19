import React, { useState } from 'react';
import { BsGrid3X2Gap, BsCircleFill } from 'react-icons/bs'
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
    <div className="accordion__item flex-row gap-2 bg-gray-50 rounded-lg p-4 border-solid border-2">
      {/* Heading */}
      <div className="accordion__header h-12 font-bold flex gap-4 justify-start items-center"
        >
        <BsGrid3X2Gap className="-rotate-90" />
        <input type="checkbox" />
        <BsCircleFill className="text-green-600" />
        <div className="flex-col">
          <div className="">12</div>
          <div>JAN</div>
        </div>
        <h3 onClick={toggleHandler}>{props.title}</h3>
        <i>
          +
        </i>
      </div>
      {/* Content */}
      <animated.div id="emailcontent" className="accordion__content overflow-hidden border-dashed" style={openAnimation}>
        <span >{props.text}</span>
      </animated.div>
      
    </div>
  )
}

export default Accordion;
// + ( open ? "max-h-max" : "max-h-0" )}