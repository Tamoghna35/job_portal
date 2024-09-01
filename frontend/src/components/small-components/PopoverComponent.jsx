import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import AvatarComponent from './AvatarComponent';

const PopoverComponent = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <AvatarComponent/>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <div className="flex items-center gap-3">
          <AvatarComponent/>
            <div>
              <h4>Tamoghna Roy</h4>
              <p>Lorem ipsum dolor sit</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <User2 />
              <Button variant="link">View Profile</Button>
            </div>
            <div className="flex items-center gap-3">
              <LogOut />
              <Button variant="link">Logout</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverComponent