import React from "react";
import { Button } from "../ui/button";

const QuestionSection = () => {
  return (
    <div className="px-10">
      <div className="flex justify-between pt-12">
        <p>Showing questions</p>
        <div className="flex gap-3">
          <Button className="bg-black text-white px-16">Ask a Question</Button>
        </div>
      </div>
      <div>Question 1</div>
      <div>Question 2</div>
      <div>Question 3</div>
    </div>
  );
};

export default QuestionSection;
