import React from "react";
import GridIconItem from "./gridIconItem";

export default function GridIconList() {
  return (
    <ul className="flex justify-center align-center">
      <GridIconItem
        src="./large-grid.svg"
        width={20}
        height={20}
        alt="Large Grid Icon"
      />
      <GridIconItem
        src="./small-grid.svg"
        width={20}
        height={20}
        alt="Small Grid Icon"
      />
      <GridIconItem
        src="./list-grid.svg"
        width={20}
        height={20}
        alt="List Grid Icon"
      />
    </ul>
  );
}
