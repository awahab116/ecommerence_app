"use client";
import React, { useState, useEffect } from "react";
import { useGetProductCategoryQuery } from "@/provider/redux/query";
import {
  RadioGroup as CustomRadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

interface Genre {
  value: string;
  label: string;
}

interface RadioGroup {
  title: string;
  items: Genre[];
}

const RadioGroupFilter = () => {
  const { data, isError, isLoading } = useGetProductCategoryQuery();
  const [genreRadioGroup, setGenreRadioGroup] = useState<RadioGroup | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const radioGroup: RadioGroup = {
        title: "CATEGORIES",
        items: data.map((genre: string) => ({
          value: genre,
          label: genre,
        })),
      };
      setGenreRadioGroup(radioGroup);
    }
  }, [data, isError, isLoading]);

  const handleRadioValue = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    console.log("radio value: ", target.value);
    router.push(`/${target.value}`);
  };

  if (isLoading || isError || !genreRadioGroup) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-5">
      <h2 className="font-bold text-[18px]">{genreRadioGroup.title}</h2>
      <div className="pt-1 border-b border-gray-300"></div>
      <CustomRadioGroup
        className="pt-2"
        onClick={(value) => handleRadioValue(value)}
      >
        {genreRadioGroup.items.map((item, index) => (
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
