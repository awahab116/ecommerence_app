"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductFilterSelect() {
  const [selectedValue, setSelectedValue] = React.useState("best-selling");

  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
      <SelectTrigger className="w-full min-w-[180px] border-0 p-2">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="title-ascending">Sort</SelectItem>
          <SelectItem value="manual">Featured</SelectItem>
          <SelectItem value="best-selling">Best selling</SelectItem>
          <SelectItem value="title-ascending">Alphabetically, A-Z</SelectItem>
          <SelectItem value="title-descending">Alphabetically, Z-A</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
