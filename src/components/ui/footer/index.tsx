import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListBlock from "@/components/listBlocks";

export default function Footer() {
  const aboutListItems = [
    "FAQs",
    "Our Story",
    "Media Page",
    "Quiz",
    "Our New Logo",
    "Careers / Jobs",
    "Accessibility Statement",
  ];

  const supportListItems = [
    "Return Form",
    "Privacy Policy",
    "Shipping Policy",
    "Terms of Service",
    "Track Your Order",
    "My account",
  ];

  const quickLinksListItems = [
    "Gold Membership",
    "Ask For A Perfume",
    "Bulk / Customize Orders",
    "Own a Franchise",
    "Store Locator",
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center py-[30px] gap-3">
        <p className="text-[16px] font-bold">
          Let's keep in touch ! Get email offers & the latest news from us
        </p>
        <div className="flex">
          <Input
            className="text-black w-full max-w-[180px] rounded-none"
            type="text"
            placeholder="Search"
          />
          <Button className="bg-[#C21010] rounded-tr-[25px] rounded-br-[25px] rounded-tl-none rounded-bl-none hover:bg-[#C21010]">
            Subscribe{" "}
          </Button>
        </div>
      </div>
      <div className="bg-black text-white">
        <div className="pt-[50px] pb-[30px]">
          <div className="px-10">
            <div className="flex flex-wrap justify-around gap-2">
              <Image
                src="/qg_icon.webp"
                alt="QG Icon"
                // layout="responsive"
                width={310}
                height={210}
                className="w-[310px] h-[210px]"
              />
              <ListBlock title="About" listItems={aboutListItems} />
              <ListBlock title="Support" listItems={supportListItems} />
              <ListBlock title="Quick Links" listItems={quickLinksListItems} />
              <div>
                <h2 className="text-[16px] font-bold mb-[15px]">
                  Get in touch
                </h2>
                <ul>
                  <li className="flex flex-row py-1">
                    <Image
                      src="/phone.svg"
                      width={20}
                      height={20}
                      alt="phone"
                      className="mr-1"
                    />
                    <span className="underline">+92 311 100 7862</span>
                  </li>
                  <li className="flex flex-row py-1">
                    <Image
                      src="/phone.svg"
                      width={20}
                      height={20}
                      alt="phone"
                      className="mr-1"
                    />
                    <span className="underline">Email us</span>
                  </li>
                </ul>
              </div>
              <div className="relative w-[200px] h-[100px]">
                <Image
                  fill
                  sizes="(max-width: 200px) 100vw, 200px (max-height: 100px) 100vh, 100px"
                  src="/debit-cards.avif"
                  alt="Debit Cards"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center py-[30px] border-t border-white">
          <span className="text-center">
            © 2024 Scents N Stories Pvt Ltd. support@scentsnstories.pk
          </span>
        </div>
      </div>
    </div>
  );
}
