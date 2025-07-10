import React from "react";

export const ViewAllProjectsCard = () => {
  return (
    // 'view-all-card' is its unique selector for GSAP.
    <div className="view-all-card invisible flex h-full w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/60 p-6 transition-all duration-300 hover:border-cyan-400 hover:bg-slate-900">
      <div className="text-center">
        <div className="text-4xl">→</div>
        <h3 className="mt-2 font-bold text-white">View All Projects</h3>
      </div>
    </div>
  );
};