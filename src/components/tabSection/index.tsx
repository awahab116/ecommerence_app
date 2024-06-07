import React, { useState } from "react";
import QuestionSection from "@/components/questionSection";
import ReviewSection from "@/components/reviewSection";

const TabSection = () => {
  const [activeTab, setActiveTab] = useState<"reviews" | "questions">(
    "reviews"
  );

  return (
    <div className="px-10">
      <div className="flex pt-[45px]">
        <div
          className={`flex items-center justify-center w-full cursor-pointer ${
            activeTab === "reviews"
              ? "border-b-[6px] border-black"
              : "text-gray-500 border-b-[6px] border-gray-500"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          <h2 className="text-2xl pb-[15px]">Reviews</h2>
        </div>
        <div
          className={`flex items-center justify-center w-full cursor-pointer ${
            activeTab === "questions"
              ? "border-b-[6px] border-black"
              : "text-gray-500 border-b-[6px] border-gray-500"
          }`}
          onClick={() => setActiveTab("questions")}
        >
          <h2 className="text-2xl pb-[15px]">Questions</h2>
        </div>
      </div>
      {activeTab === "reviews" ? <ReviewSection /> : <QuestionSection />}
    </div>
  );
};

export default TabSection;
