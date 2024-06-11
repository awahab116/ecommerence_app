"use client";
import React, { useState, useEffect } from "react";
import RadioGroupFilter from "../radioGroupFilter";
import { useGetProductCategoryQuery } from "@/provider/redux/query";

interface Genre {
  value: string;
  label: string;
}

interface RadioGroup {
  title: string;
  items: Genre[];
}

export default function Sidebar(): JSX.Element {
  const { data, isError, isLoading } = useGetProductCategoryQuery();
  const [genreRadioGroup, setGenreRadioGroup] = useState<RadioGroup | null>(
    null
  );

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

  if (isLoading || isError || !genreRadioGroup) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hidden sm:block pr-[10px] pb-5">
      <RadioGroupFilter radioObj={genreRadioGroup} />
    </div>
  );
}
