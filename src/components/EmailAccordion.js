import React, { useState } from "react";
import Accordion from './Accordion.js'
import Data from "../Lophils.json";

function EmailAccordion() {
  const [open, setOpen] = useState(false);
  let data = Data.slice(0,10);
  data.sort((a, b) => {
    return b.time_sent.localeCompare(a.time_sent);
  })

  return(
    <div>
      <div className="accordion__body flex flex-col gap-4">
        {data.map((currElement, index) => (
          <Accordion {...currElement} key={currElement.id} />
        ))}
        
      </div>
    </div>
)};

export default EmailAccordion;