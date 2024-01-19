import React from "react";

export default function LogoBar() {
  return (
    <div className="flex gap-4 items-center border border-b-1 border-slate-200">
      <h1 className="font-bold text-[19px] text-indigo-950 px-4 py-4 mr-4">
        Template Designer{" "}
        <span className="inline-block ml-4 bg-zinc-100 px-3 pt-1.5 pb-2 rounded-full text-indigo-800 text-[14px] font-medium">
          Designing data entry templates for eNanoMapper
        </span>
      </h1>
    </div>
  );
}
