import React, { useState } from "react";
import { BsGrid3X2Gap, BsCircleFill } from 'react-icons/bs'
import Accordion from './Accordion.js'

function EmailAccordion() {
  const [open, setOpen] = useState(false);
  return(
    <div>
      <div className="emailBody">
        <Accordion
          title="Item 1"
          text="Test item" />
            {/* <!-- Accordion end --></li> */}
        {/* <label className="grid grid-cols-2">
          <div className="flex flex-row items-center">
            <BsGrid3X2Gap className="-rotate-90" />
            <input type="checkbox" />
            <BsCircleFill className="text-green-600" />
            <div className="flex-col">
              <div className="">12</div>
              <div>JAN</div>
            </div>
          </div>
        </label> */}
      </div>
    </div>
)};

export default EmailAccordion;