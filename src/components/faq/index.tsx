import React from "react";
import faqData from "./faqData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="flex flex-col justify-center items-center px-10 py-[35px]">
      <h1 className="text-2xl text-left font-bold w-1/2">
        Frequently Asked Questions
      </h1>

      <Accordion type="single" collapsible className="w-1/2">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
