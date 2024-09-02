import React, { useState } from "react";
import Navbar1 from "../shared/Navbar1";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(input); // Log input to verify that all fields are correctly captured

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
   
    

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
       console.log("Tamoghna");
      console.log("Response ===> ", res);
      
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      // toast.error(error.res.data.message);
    }
  };

  return (
    <div>
      <Navbar1 />
      <div className="flex max-w-7xl justify-center items-center mx-auto">
        <form
          onSubmit={handleFormSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl ">Sign Up</h1>
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter FullName"
              name="fullName"
              value={input.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Eamil</Label>
            <Input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={input.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-5 flex justify-between items-center">
            <RadioGroup className="flex">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={handleInputChange}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={handleInputChange}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex justify-center items-center gap-2">
              <Label>Upload Profile Photo</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={handleFileChange}
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
          <span className="text-sm">
            Already have an Account ?{" "}
            <Link to="/login" className="text-[#c39bd3]">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
