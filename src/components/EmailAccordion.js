import React, { useState } from "react";

import Accordion from './Accordion.js'

function EmailAccordion() {
  const [open, setOpen] = useState(false);
  return(
    <div>
      <div className="emailBody">
        <Accordion
          title="Item 1"
          text="Test item" />
      </div>
    </div>
)};

export default EmailAccordion;