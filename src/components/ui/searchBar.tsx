"use client";
import { Input } from "@/components/ui/input";
export default function searchBar() {
  return (
    <Input
      className="text-black w-full max-w-[200px] rounded-[25px]"
      type="text"
      placeholder="Search"
    />
  );
}
