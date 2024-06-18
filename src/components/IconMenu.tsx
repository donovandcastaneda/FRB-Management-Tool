import { ReactNode } from "react";
import { cn } from "@/lib/utils";

import { FC } from "react";

interface IconMenuProps {
  icon: ReactNode;
  text: string;
  className?: string;
}

const IconMenu: FC<IconMenuProps> = ({ className, icon, text }) => {
  return (
    <div
      className={cn(
        "flex flex-row text-center items-center justify-center space-x-2",
        className
      )}
    >
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default IconMenu;
