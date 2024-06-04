import React from "react";
import {
  RadioGroup as CustomRadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "../ui/label";

interface RadioGroupObj {
  title: string;
  items: {
    value: string;
    label: string;
  }[];
}

export default function RadioGroupFilter({
  radioObj,
}: {
  radioObj: RadioGroupObj;
}) {
  return (
    <div className="pt-5">
      <h2 className="font-bold text-[18px]">{radioObj.title}</h2>
      <div className="pt-1 border-b border-gray-300"></div>
      <CustomRadioGroup className="pt-2">
        {radioObj.items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={item.value} id={item.value} />
            <Label className="text-[12px]" htmlFor={item.value}>
              {item.label}
            </Label>
          </div>
        ))}
      </CustomRadioGroup>
    </div>
  );
}
