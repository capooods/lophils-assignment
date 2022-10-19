import React, { useState } from "react";

import Accordion from './Accordion.js'

function EmailAccordion() {
  const [open, setOpen] = useState(false);
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