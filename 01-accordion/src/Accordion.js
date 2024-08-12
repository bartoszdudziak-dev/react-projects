import { useState } from "react";
import AccordionItem from "./AccordionItem";

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      <ul className="accordionList">
        {data.map((item, index) => (
          <AccordionItem
            item={item}
            key={index}
            index={index}
            curOpen={curOpen}
            onOpen={setCurOpen}
          />
        ))}
      </ul>
    </div>
  );
}

export default Accordion;
