import React, { useState } from "react";
import Accordion from './Accordion.js'
import Data from "../Lophils.json";

function EmailAccordion() {
  const [open, setOpen] = useState(false);
  console.log(Data);
  return(
    <div>
      <div className="emailBody box-border">
        <Accordion
          title="Item 1"
          text="Test item" />
        <Accordion
          title="Item 2"
          text="Test item 2" />
      </div>
    </div>
)};

export default EmailAccordion;