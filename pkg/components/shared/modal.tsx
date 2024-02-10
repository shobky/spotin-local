"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

export default function Modal({
  children,
  handleCloseShiftModal,
}: {
  children: React.ReactNode;
  handleCloseShiftModal?: () => void;
}) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    handleCloseShiftModal ? handleCloseShiftModal() : router.back();
  }, [router, handleCloseShiftModal]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed left-0 right-0 px-4 sm:px-0 top-0 bottom-0 bg-black/70 z-50 flex justify-center items-center h-full w-full"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className=" w-full sm:w-1/2 h-[85svh] sm:h-[80%] flex justify-center  items-center"
      >
        {children}
      </div>
    </div>
  );
}
