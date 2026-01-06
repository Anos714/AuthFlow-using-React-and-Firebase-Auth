import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen bg-green-500/5 flex justify-center items-center">
      <div className="h-[100px] w-[100px] border-4 border-t-green-500/0 animate-spin rounded-full"></div>
    </div>
  );
};

export default Loader;
