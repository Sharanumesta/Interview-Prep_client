import React from "react";

const SpinnerLoader = () => {
  return (
    <>
      <div className="mr-2 inline-block">
        <div className="w-4 h-4 border-2 border-black border-t-white rounded-full animate-spin"></div>
      </div>
    </>
  );
};

export default SpinnerLoader;
