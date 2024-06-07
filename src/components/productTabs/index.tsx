import React, { useState } from "react";

type TabData = {
  [key: string]: string;
};

const productTabs = [
  "BRIEF",
  "DESCRIPTION",
  "PERFORMANCE",
  "SHIPPING",
  "UNBOXING VIDEO",
];

const tabData: TabData = {
  BRIEF: "Brief description of the product",
  DESCRIPTION: "Detailed description of the product",
  PERFORMANCE: "Performance metrics of the product",
  SHIPPING: "Shipping information",
  "UNBOXING VIDEO": "Watch the unboxing video",
};

export default function ProductTabs() {
  const [selectedTab, setSelectedTab] = useState<string>("BRIEF");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <ul className="flex flex-wrap items-center justify-between bg-black font-bold text-white rounded-t-lg">
        {productTabs.map((tab) => (
          <li
            key={tab}
            className={`px-2 py-2 cursor-pointer text-center ${
              selectedTab === tab ? "bg-[#B5B3B3] text-black" : ""
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className="border border-gray-300">
        <p>{tabData[selectedTab]}</p>
      </div>
    </div>
  );
}
