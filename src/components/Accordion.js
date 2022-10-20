import React, { useState } from 'react';
import { BsGrid3X2Gap, BsCircleFill } from 'react-icons/bs'
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';
import Tag from './Tag';
import _uniqueId from 'lodash/uniqueId';

function Accordion(props) {
  const [open, setOpen] = useState(false);
  const [checkboxHover, setCheckboxHover] = useState(false);
  const [uniqueId] = useState(_uniqueId('header-'))

  const time = new Date(props.time_sent);
  const time_date = time.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  const time_shortdate = time.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
  const time_hour = time.toLocaleString('default', { hour12: true, hour: 'numeric', minute: 'numeric'});

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
    to: { "maxHeight": open ? "200" : "0px" },
    config: { duration: "250" }
  });


  const arrowOpenAnimation = useSpring({
    to: { "transform": open ? "rotate(90deg)" : "rotate(0deg)"},
    config: { duration: "150" }
  });

  const buttonHover = useSpring({
    to: { "height": checkboxHover ? "40px" : "0px",
          "width": checkboxHover ? "40px" : "0px" },
    config: { duration: "100" }
  });
  
  
  return(
    <div className="accordion__item flex flex-col bg-white rounded-lg p-5 border-solid border hover:drop-shadow cursor-default"
      onClick={toggleHandler} >
      {/* Heading */}
      <div className="accordion__header h-max font-medium flex flex-auto flex-col md:flex-row gap-4 justify-start items-start md:items-center">
        {/* Grid Order */}
        <div className="flex justify-start items-center gap-4 h-full">
          <div className="flex-none cursor-grab text-gray-400">
            <BsGrid3X2Gap className="-rotate-90" />
          </div>
          {/* Checkbox */}
          <div className="flex justify-center items-center w-2" onClick={(e) => e.stopPropagation()}>
            <animated.label for={uniqueId} style={buttonHover} className="absolute rounded-full w-25 h-25 bg-gray-200" 
            onMouseLeave={() => setCheckboxHover(false)} />
            <input className="absolute" type="checkbox" id={uniqueId} onMouseOver={() => setCheckboxHover(true)}  />
          </div>
          {/* Clickable */}
          <div className="flex justify-start items-center gap-4 my-auto">
            {/* Green Circle */}
            <div>
              <BsCircleFill className="text-green-600 text-md" />
            </div>
            
            {/* Date Div */}
            <div className="text-slate-900 flex flex-col flex-none justify-center text-center bg-gray-50 rounded-lg border-2 border-gray-100 p-1 h-14 w-14">
              <div className="text-xl leading-none">{time.getDate()}</div>
              <div className="text-xs font-light leading-none">{monthConverter(time.getMonth())}</div>
            </div>
            {/* Icon */}
            <div className="flex-none h-9 w-9">
              <img className="rounded-full bg-neutral-300" src={props.sender_pfp} />
            </div>
          </div>
        </div>
        
        {/* Center Div */}
        <div className="flex flex-col md:flex-row w-full gap-4 justify-start items-center select-none">
          {/* Subject Div */}
          <div>
            <div>
              <h2 className="text-slate-900 text-lg line-clamp-1 transition-all ease-out delay-100">{props.email_subject}</h2>
            </div>
            <div className={"flex flex-col md:inline font-normal text-sm transition-colors ease-out delay-100 " + (open ? "text-gray-400" : "text-slate-900")}>
              <span>{props.first_name} {props.last_name} </span>
              <span className="text-gray-400 w-full">{"<" + props.email + ">"}</span>
              <span className="text-gray-400 invisible md:visible w-0 md:w-full h-0 md:h-full"> | </span>
              <span className="text-gray-400 w-full">{time_date} at {time_hour}</span> 
            </div>
          </div>
        </div>
        {/* Right Div */}
        <div className="flex items-center justify-self-end ml-auto mt-4 md:mt-0 h-16">
          {/* Tag with Div */}
          
            <Tag props={props.tags} open={open} location="header"/>
          
            
            {/* Arrow Div */}
          <animated.div style={arrowOpenAnimation}>
            <MdKeyboardArrowRight className="text-3xl text-gray-400"/>
          </animated.div>
        </div>
      </div>


      {/* Content */}
      <div className="">
        <animated.div id="emailcontent" className="accordion__content overflow-hidden" style={openAnimation}>
          <hr className="border-t border-dashed my-2 border-gray-300" />
          <div className="mt-4">
            {/* Content header */}
            <div className="text-md flex flex-initial justify-between ">
              <div>
                <p className="font-medium">{props.first_name} {props.last_name}</p>
                <p className="text-gray-400">{time_shortdate} {time_hour}</p>
              </div>
              <div className="max-w-4xl">
                <Tag props={props.tags} open={open} location="content" />
              </div>
            </div>
            {/* Email Body */}
            <div>
              <span >{props.email_body}</span>
            </div>
          </div>
        </animated.div>
      </div>
      
      
    </div>
  )
}

export default Accordion;
// + ( open ? "max-h-max" : "max-h-0" )}