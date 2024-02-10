"use client";
import React, { useCallback, useEffect } from "react";

export default function ShortCutContainer() {
  
  const focusOnSearchBox = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    const searchBoxInput = document.getElementById("searchbox-input-id");
    searchBoxInput?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") focusOnSearchBox(e);
    },
    [focusOnSearchBox]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [focusOnSearchBox]);

  return <></>;
}
