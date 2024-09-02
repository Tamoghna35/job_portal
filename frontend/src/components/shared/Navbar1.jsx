import React from "react";
import PopoverComponent from "../small-components/PopoverComponent";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const Navbar1 = () => {
  const user = false;
  return (
    <div className="flex items-center justify-between mt-2 px-16 max-w-7xl">
      <div className="">
        <h1 className="text-2xl font-bold">
          Job <span className="text-[#F83002]">Portal</span>
        </h1>
      </div>
      <div className="flex gap-4">
        <ul className="flex gap-5 font-medium my-3">
          <li>Home</li>
          <li>Jobs</li>
          <li>Brows</li>
        </ul>
        {!user ? (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="outline"
                className="bg-[#c39bd3] hover:bg-[#c070e0]"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <PopoverComponent />
        )}
      </div>
    </div>
  );
};

export default Navbar1;
