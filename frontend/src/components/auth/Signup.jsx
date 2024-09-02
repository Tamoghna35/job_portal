import React from "react";
import Navbar1 from "../shared/Navbar1";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";


const Signup = () => {
  return (
    <div>
      <Navbar1 />
      <div className="flex max-w-7xl justify-center items-center mx-auto">
        <form className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl ">Sign Up</h1>
          <div>
            <Label>Full Name</Label>
            <Input type="text" placeholder="Enter FullName" name="fullname" />
          </div>
          <div>
            <Label>Eamil</Label>
            <Input type="email" placeholder="Enter Email" name="email" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              type="number"
              placeholder="Enter Phone Number"
              name="phonnumber"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
            />
          </div>
          <div className="mt-5 flex justify-between items-center">
            <RadioGroup defaultValue="option-one" className="flex">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex justify-center items-center gap-2">
              <Label>Upload Profile Photo</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer w-2/3"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full my-4 bg-[#c39bd3] hover:bg-[#c477e2]"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
