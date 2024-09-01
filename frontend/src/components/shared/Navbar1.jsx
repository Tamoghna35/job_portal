import React from "react";
import PopoverComponent from "../small-components/PopoverComponent";
const Navbar1 = () => {
  return (
    <div className="flex items-center justify-between mt-2 px-2">
      <div className="">
        <h1 className="text-2xl font-bold">
          Job <span className="text-[#F83002]">Portal</span>
        </h1>
      </div>
      <div className="flex gap-4">
        <ul className="flex gap-5 font-medium">
          <li>Home</li>
          <li>Jobs</li>
          <li>Brows</li>
        </ul>
       <PopoverComponent/>
      </div>
    </div>
  );
};

export default Navbar1;
