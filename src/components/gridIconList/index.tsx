import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SmallGridIcon from "@/components/svg/smallGridIcon";
import LargeGridIcon from "@/components/svg/largeGridIcon";
import ListGridIcon from "@/components/svg/listGridIcon";

interface GridIconListProps {
  setGridView: (view: string) => void;
}

const viewOptions = [
  { type: "large", icon: <LargeGridIcon /> },
  { type: "small", icon: <SmallGridIcon /> },
  { type: "list", icon: <ListGridIcon /> },
];

export default function GridIconList({ setGridView }: GridIconListProps) {
  const [selectedView, setSelectedView] = useState<string>("small");

  const handleGridViewChange = (view: string) => {
    setSelectedView(view);
    setGridView(view);
  };

  return (
    <ul className="flex justify-center items-center">
      {viewOptions.map((option) => (
        <li key={option.type}>
          <Button
            className="border-0 hover:bg-transparent"
            variant="outline"
            size="icon"
            onClick={() => handleGridViewChange(option.type)}
          >
            {React.cloneElement(option.icon, {
              className:
                selectedView === option.type
                  ? "fill-black hover:fill-current"
                  : "",
            })}
          </Button>
        </li>
      ))}
    </ul>
  );
}
