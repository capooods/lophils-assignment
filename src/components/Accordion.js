import React, { useState } from 'react';
import { BsGrid3X2Gap, BsCircleFill } from 'react-icons/bs'
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';
import _uniqueId from 'lodash/uniqueId';

function Accordion(props) {
  const [open, setOpen] = useState(false);
  const [checkboxHover, setCheckboxHover] = useState(false);
  const [uniqueId] = useState(_uniqueId('email-'))
  console.log("accordion: " + JSON.stringify(props));

  const time = new Date(props.time_sent);

  const toggleHandler = (e) => {
    setOpen(!open);
  }

  const monthConverter = (date) => {
    const month = date;
    const converted = ({
      0: 'JAN',
      1: 'FEB',
      2: 'MAR',
      3: 'APR',
      4: 'MAY',
      5: 'JUN',
      6: 'JUL',
      7: 'AUG',
      8: 'SEP',
      9: 'OCT',
      10: 'NOV',
      11: 'DEC',
    })[month] ?? 'Default';
    return converted;
  };
  
  const openAnimation = useSpring({
    to: { "maxHeight": open ? "100" : "0px" },
    config: { duration: "300" }
  });

  const arrowOpenAnimation = useSpring({
    to: { "transform": open ? "rotate(90deg)" : "rotate(0deg)"},
    config: { duration: "250" }
  });

  const buttonHover = useSpring({
    to: { "height": checkboxHover ? "40px" : "0px",
          "width": checkboxHover ? "40px" : "0px" },
    config: { duration: "100" }
  });
  
  
  return(
    <div className="accordion__item flex-row gap-2 bg-white rounded-lg p-4 border-solid border-2 my-4">
      {/* Heading */}
      <div className="accordion__header h-full font-medium flex gap-4 justify-start items-center">
        {/* Grid Order */}
        <BsGrid3X2Gap className="-rotate-90" />
        {/* Checkbox */}
        <div className="flex justify-center items-center w-2">
          <animated.label for={uniqueId} style={buttonHover} className="absolute rounded-full w-25 h-25 bg-gray-200" 
          onMouseLeave={() => setCheckboxHover(false)} />
          <input className="absolute" type="checkbox" id={uniqueId} onMouseOver={() => setCheckboxHover(true)}  />
        </div>
        {/* Clickable for Accordion */}
        <div onClick={toggleHandler} className="flex w-full gap-4 justify-start items-center">
          <div>
            <BsCircleFill className="text-green-600 text-md" />
          </div>
          
          {/* Date Div */}
          <div className="flex-row flex-none text-center bg-gray-50 rounded-md border-2 border-gray-100 p-1 h-14 w-14">
            <p className="text-lg">{time.getDate()}</p>
            <p className="text-sm">{monthConverter(time.getMonth())}</p>
          </div>
          <h2 className="text-lg line-clamp-1">{props.email_subject}</h2>
          {/* Arrow Icon */}
          <animated.span className="justify-self-end ml-auto" style={arrowOpenAnimation}>
            <MdKeyboardArrowRight className="text-3xl text-gray-400"/>
          </animated.span>
        </div>
      </div>

      {/* Content */}
      <div>
        <animated.div id="emailcontent" className="accordion__content overflow-hidden" style={openAnimation}>
          <div className="mt-2 border-t-2 border-dashed">
            <span >{props.email_body}</span>
          </div>
        </animated.div>
      </div>
      
      
    </div>
  )
}

export default Accordion;
// + ( open ? "max-h-max" : "max-h-0" )}