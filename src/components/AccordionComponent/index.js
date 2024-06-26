import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AccordionComponent = ({ question, answer }) => {
  return (
    <Accordion type="single" collapsible className="w-10/12">
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-geist text-xl font-bold text-start tracking-tighter">
          {question}
        </AccordionTrigger>
        <AccordionContent className="font-geist tracking-tighter">
          {answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
