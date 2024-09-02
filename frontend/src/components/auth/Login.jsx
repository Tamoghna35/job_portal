import React, { useState } from "react";
import Navbar1 from "../shared/Navbar1";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  const[input, setInput] = useState({
    email: "",
    password: "",
    role:"",
  });

  const handleInputChange = (e) => {
    setInput({...input,  [e.target.name]: e.target.value })
  }
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
          <h1 className="font-bold text-xl ">Login</h1>

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
            <RadioGroup defaultValue="option-one" className="flex">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={handleInputChange}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
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
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button
            type="submit"
            className="w-full my-4 bg-[#c39bd3] hover:bg-[#c477e2]"
          >
            Login
          </Button>
          <span className="text-sm">
            Don't have an Account ?{" "}
            <Link to="/signup" className="text-[#c39bd3]">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
