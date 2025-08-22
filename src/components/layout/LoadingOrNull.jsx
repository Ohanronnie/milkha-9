import { useEffect } from "react";

import React from "react";
const NoDataCard = () => {
  return (
    <div className="min-h-max flex items-center justify-center   font-sans text-[#1f2321] px--6 py--12">
      <div
        className="w-full max-w-[720px] text-center bg-transparent px-6 py-12 rounded-xl"
        role="status"
        aria-live="polite"
      >
        <svg
          className="w-[120px] h-[120px] mx-auto mb-7 block"
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 86s-34-22-34-42c0-11.046 8.954-20 20-20 7.02 0 11.6 3.98 14 7.6 2.4-3.62 6.98-7.6 14-7.6 11.046 0 20 8.954 20 20 0 20-34 42-34 42z"
            fill="none"
            stroke="#1f2321"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h1 className="text-[36px] leading-none tracking-[1px] mb-[18px] uppercase font-bold text-[#1f2321]">
          NO DATA AVAILABLE YET
        </h1>
        <p className="text-lg leading-relaxed text-[#4b4f4d] max-w-[560px] mx-auto">
          There is no data to display at the moment.
        </p>
      </div>
    </div>
  );
};

export default function Loading({ data }){
  if(data) return <NoDataCard />;
  return <NoDataCard />;
}