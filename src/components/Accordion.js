import React, { useEffect, useState } from 'react';
import { BsGrid3X2Gap, BsCircleFill } from 'react-icons/bs'
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FiClock } from 'react-icons/fi'
import { useSpring, animated } from 'react-spring';
import Tag from './Tag';
import _uniqueId from 'lodash/uniqueId';

function Accordion(props, { keyId, checkedState, handleCheckChange }) {
  const element_key = parseInt(props.keyId);
  const [open, setOpen] = useState(false);
  const [checkboxHover, setCheckboxHover] = useState(false);

  const time = new Date(props.time_sent);
  const time_date = time.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  const time_shortdate = time.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
  const time_hour = time.toLocaleString('default', { hour12: true, hour: 'numeric', minute: 'numeric'});



  let timer;
  const showTimer = (time) => {
    if (time < 60) {
      if ((time === 1)) { return(time + " min. ")}
      return(time + " mins. ") }
    timer = Math.ceil(time / 60)
    if ((time) >= 60 && (time) <= 120) { return(timer + " hr. ") }
    return(timer + " hrs. ")
  }


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
    to: { "maxHeight": open ? "1000" : "0px" },
    config: { duration: "200" }
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
      <div className="accordion__header h-max font-medium flex flex-auto flex-col lg:flex-row gap-4 justify-start items-start lg:items-center">
        {/* Grid Order */}
        <div className="flex justify-start items-center gap-4 h-full">
          <div className="flex-none cursor-grab text-gray-400">
            <BsGrid3X2Gap className="-rotate-90" />
          </div>
          {/* Checkbox */}
          <div className="flex justify-center items-center w-2" onClick={(e) => e.stopPropagation()}>
            <animated.label for={props.keyId} onClick={(e) => handleCheckChange(e)} style={buttonHover} className="absolute rounded-full w-25 h-25 bg-gray-200" 
            onMouseLeave={() => setCheckboxHover(false)} />
            <input className="absolute" 
              type="checkbox" 
              id={props.keyId} 
              key={props.keyId} 
              checked={props.checkedState[element_key].checked}
              onChange={(e) => props.handleCheckChange(e, props.keyId)} 
              onMouseOver={() => setCheckboxHover(true)}  />
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
        <div className="flex justify-between w-full flex-col lg:flex-row">
          <div className="flex flex-col lg:flex-row gap-4 justify-start items-start lg:items-center select-none basis-1/2">
            {/* Subject Div */}
            <div>
              <div>
                <h2 className="text-slate-900 text-lg line-clamp-1 transition-all ease-out delay-100">{props.email_subject}</h2>
              </div>
              <div className={"flex flex-col lg:inline font-normal text-sm transition-colors ease-out delay-100 " + (open ? "text-gray-400" : "text-slate-900")}>
                <span>{props.first_name} {props.last_name} </span>
                <span className="text-gray-400 w-full">{"<" + props.email + ">"}</span>
                <span className="text-gray-400 invisible lg:visible w-0 lg:w-full h-0 lg:h-full"> | </span>
                <span className="text-gray-400 w-full">{time_date} at {time_hour}</span> 
              </div>
            </div>
          </div>

          {/* Right Div */}
          <div className="flex items-center justify-end mt-4 lg:mt-0 h-16 gap-2 basis-1/2">
            {/* Tag with Div */}
            <div className="flex flex-row lg:flex-row items-center justify-end">
              <div className="mr-2 w-2/3">
                <Tag className="justify-end" props={props.tags} open={open} location="header"/>
              </div>
              {/* Timer with Div */}
            </div>
            <div className="flex">
              
            </div>
            <div className="flex-none justify-end items-center bg-amber-100 text-xs text-amber-400 rounded p-1 pb-0">
                <div className="flex flex-row">
                  <div className="pt-[0.5px]"> 
                    <FiClock />
                  </div>
                  <div className="flex-none font-light">{showTimer(props.time.toString())}</div>
                </div>
              </div> 
              {/* Arrow Div */}
            <animated.div style={arrowOpenAnimation}>
              <MdKeyboardArrowRight className="text-3xl text-gray-400"/>
            </animated.div>
          </div>
        </div>
      </div>


      {/* Content */}
      <div className="">
        <animated.div id="emailcontent" className="accordion__content overflow-hidden" style={openAnimation}>
          <hr className="border-t border-dashed my-2 border-gray-300" />
          <div className="mt-4">
            {/* Content header */}
            <div className="text-md flex flex-col lg:flex-row flex-initial justify-between">
              <div>
                {/* Name */}
                <p className="font-medium">{props.first_name} {props.last_name}</p>
                {/* Date */}
                <p className="text-gray-400">{time_shortdate} {time_hour}</p>
              </div>
              <div className="justify-start lg:justify-end">
                <Tag props={props.tags} open={open} location="content" />
              </div>
            </div>
            {/* Email Body */}
            <div className="mt-4">
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