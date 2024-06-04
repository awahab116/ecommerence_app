import React from "react";

export default function PageHeading({ title }: { title: string }) {
  return (
    <div>
      <h1 className="font-bold text-4xl">{title}</h1>
    </div>
  );
}
