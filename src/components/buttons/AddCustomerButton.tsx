import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Banknote, Dumbbell, Medal } from "lucide-react";
import IconMenu from "../IconMenu";
import { ResponsiveDialog } from "../ResponsiveDialog";
import { AddCashCustomerForm } from "../forms/AddCashCustomerForm";
import Link from "next/link";

interface AddCustomerButtonProps {}

const AddCustomerButton: FC<AddCustomerButtonProps> = ({}) => {
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  return (
    <>
      <ResponsiveDialog
        isOpen={isAddCustomerOpen}
        setIsOpen={setIsAddCustomerOpen}
        title="Add Cash Customer"
      >
        <AddCashCustomerForm setIsOpen={setIsAddCustomerOpen} />
      </ResponsiveDialog>
      <div>
        <Button>
          <DropdownMenu>
            <DropdownMenuTrigger>Add Customer</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Type of Customer</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  onClick={() => {
                    setIsAddCustomerOpen(true);
                  }}
                >
                  <IconMenu
                    text="Cash Customers"
                    icon={<Banknote className="h-4 w-4" />}
                  />
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href={"https://buy.stripe.com/3cscQa7UraZKbhm8ww"}>
                  <IconMenu
                    text="Newbie Non-Competive Customers"
                    icon={<Dumbbell className="h-4 w-4" />}
                  />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href={"https://buy.stripe.com/fZe7vQ5Mjgk45X2145"}>
                  <IconMenu
                    text="Newbie Competive Customers"
                    icon={<Medal className="h-4 w-4" />}
                  />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href={"https://buy.stripe.com/eVa5nIeiPc3O0CIdQT"}>
                  <IconMenu
                    text="Non-Competive Customers"
                    icon={<Dumbbell className="h-4 w-4" />}
                  />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href={"https://buy.stripe.com/bIY03o7Ur3xi5X24gi"}>
                  <IconMenu
                    text="Competive Customers"
                    icon={<Medal className="h-4 w-4" />}
                  />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </div>
    </>
  );
};

export default AddCustomerButton;
