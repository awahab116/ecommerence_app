import React from "react";
import RadioGroupFilter from "../radioGroupFilter";

const genreRadioGroup = {
  title: "GENRE",
  items: [
    {
      value: "men",
      label: "Best Branded Perfumes for Men",
    },
    {
      value: "women",
      label: "Best Perfumes for Women 2024",
    },
  ],
};

export default function sidebar() {
  return (
    <div className="hidden sm:block pr-[10px] pb-5">
      <RadioGroupFilter radioObj={genreRadioGroup} />
      <RadioGroupFilter radioObj={genreRadioGroup} />
      <RadioGroupFilter radioObj={genreRadioGroup} />
    </div>
  );
}
