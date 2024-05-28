import React from "react";
import GridIcon from "./gridIcon";
import { GridIconItemProps } from "./gridIconItems.interface";

const GridIconItem: React.FC<GridIconItemProps> = ({
  src,
  width,
  height,
  alt,
}) => {
  return (
    <li>
      <GridIcon src={src} width={width} height={height} alt={alt} />
    </li>
  );
};

export default GridIconItem;
