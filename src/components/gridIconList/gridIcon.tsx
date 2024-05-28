import React from "react";
import { Button } from "@/components/ui/button"; // assuming you have a Button component
import Image from "next/image";
import { GridIconItemProps } from "./gridIconItems.interface";

const GridIconItem: React.FC<GridIconItemProps> = ({
  src,
  width,
  height,
  alt,
}) => {
  return (
    <Button
      className="border-0 hover:bg-transparent"
      variant="outline"
      size="icon"
    >
      <Image src={src} width={width} height={height} alt={alt} />
    </Button>
  );
};

export default GridIconItem;
