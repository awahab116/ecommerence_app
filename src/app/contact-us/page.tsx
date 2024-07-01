import React from "react";
import ContactUsForm from "@/components/contactUsForm";

export default function Contact() {
  return (
    <div className="pt-[60px] mb-[45px]">
      <div className="flex flex-col items-center justify-center px-10">
        <h1 className="text-2xl text-left font-bold w-1/2 mb-10">Contact Us</h1>
        <ContactUsForm />
      </div>
    </div>
  );
}
