import React, { useState } from "react";

interface OrderNoteProps {}

const OrderNote: React.FC<OrderNoteProps> = () => {
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNoteClick = () => {
    setIsAddingNote(true);
  };

  const handleCloseNoteClick = () => {
    setIsAddingNote(false);
  };

  return (
    <div className="mt-5">
      <div className="flex items-center">
        <p className="text-black">Add Order note </p>
        {!isAddingNote ? (
          <span
            className="text-black cursor-pointer"
            onClick={handleAddNoteClick}
          >
            O
          </span>
        ) : (
          <span
            className="text-black cursor-pointer"
            onClick={handleCloseNoteClick}
          >
            X
          </span>
        )}
      </div>
      {isAddingNote && (
        <textarea
          className="w-full mt-2 p-2 border text-black"
          rows={5}
          placeholder="Add your note here..."
        ></textarea>
      )}
    </div>
  );
};

export default OrderNote;
