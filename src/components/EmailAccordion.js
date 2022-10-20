import React, { useState } from "react";
import Accordion from './Accordion.js'
import Data from "../Lophils.json";

function EmailAccordion() {
  const [open, setOpen] = useState(false);
  let data = Data.slice(0,10);
  console.log(data);
  return(
    <div>
      <div className="emailBody box-border">
        {data.map((currElement, index) => (
          <Accordion {...currElement} />
        ))}
        
      </div>
    </div>
)};

export default EmailAccordion;