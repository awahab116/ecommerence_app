import React from "react";
import {
  RadioGroup as CustomRadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "../ui/label";

interface Genre {
  value: string;
  label: string;
}

interface RadioGroup {
  title: string;
  items: Genre[];
}

const RadioGroupFilter: React.FC<{ radioObj: RadioGroup }> = ({ radioObj }) => {
  const handleRadioValue = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    console.log("radio value: ", target.value);
  };

  return (
    <div className="pt-5">
      <h2 className="font-bold text-[18px]">{radioObj.title}</h2>
      <div className="pt-1 border-b border-gray-300"></div>
      <CustomRadioGroup
        className="pt-2"
        onClick={(value) => handleRadioValue(value)}
      >
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
};

export default RadioGroupFilter;
