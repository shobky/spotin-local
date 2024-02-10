import ControlPanelHeader from "@/components/controlPanel/controlPanelHeader";
import React from "react";

export default function ControlPanelLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 pb-4">
      <ControlPanelHeader />
      {props.children}
    </div>
  );
}
