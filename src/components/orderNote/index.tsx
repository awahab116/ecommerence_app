import React, { useState } from "react";
import { NotebookPen, CircleX } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <p className="text-black">Add Order note </p>
        {!isAddingNote ? (
          <NotebookPen
            data-testid="add-note-icon"
            className="text-black cursor-pointer"
            onClick={handleAddNoteClick}
          />
        ) : (
          <CircleX
            data-testid="close-note-icon"
            className="text-black cursor-pointer"
            onClick={handleCloseNoteClick}
          />
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
