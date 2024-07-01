import React from "react";
import Link from "next/link";

const menuItems = [
  {
    value: "SHOPS",
    link: "/",
  },
  {
    value: "WEEKLY DEALS",
    link: "/",
  },
  {
    value: "FAQS",
    link: "/faqs",
  },
  {
    value: "CONTACT US",
    link: "/contact-us",
  },
];

export default function MenuItems() {
  return (
    <ul className="flex flex-wrap justify-center items-center px-10 py-0">
      {menuItems.map((item, index) => (
        <Link href={item.link} key={index}>
          <li
            key={index}
            className="px-5 py-4 border-b-2 border-transparent hover:border-white"
          >
            {item.value}
          </li>
        </Link>
      ))}
    </ul>
  );
}
