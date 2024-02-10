import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

const DetailedOrderNote = ({
  note,
  handleAddNote,
}: {
  note: string;
  handleAddNote: (note: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(note === "Note: " && true);
  }, [note]);
  return (
    <div className="relative">
      {note && note?.length > 0 && (
        <AlertTriangle
          onClick={() => setOpen(!open)}
          className=" cursor-pointer text-yellow-500"
        />
      )}

      {open && (
        <div
          onMouseLeave={() => setOpen(!open)}
          className={`absolute ease-in-out du -left-[26vw]  w-[30vw] h-[20vh] p-1 z-10 rounded-3xl shadow-xl bg-secondary ml-3`}
        >
          <textarea
            onChange={(e) => handleAddNote(e.target.value)}
            value={note}
            className="w-full h-full rounded-3xl bg-transparent resize-none text-muted-foreground p-7"
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default DetailedOrderNote;
