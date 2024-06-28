import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCustomer } from "../../../api/supabase/actions";
import IconMenu from "@/components/IconMenu";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import { UpdateCashCustomerForm } from "@/components/forms/UpdateCashCustomerForm";
import { UpdateStripeCustomerForm } from "@/components/forms/UpdateStripeCustomers";

export type Payment = {
  id: string;
  name: string;
  email: string;
  phone: number;
  creation: Date;
  source: string; 

};
type Row = {
  row: any;
};

const ActionsCell: React.FC<Row> = ({ row }) => {
  const payment = row.original;
  const [isEditCustomerOpen, setIsEditCustomerOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isEditCustomerOpen}
        setIsOpen={setIsEditCustomerOpen}
        title="Edit Cash Customer"
      >
          {payment.source === 'stripe' ? (
          <UpdateStripeCustomerForm
            setIsOpen={setIsEditCustomerOpen}
            payment={payment}
          />
        ) : (
          <UpdateCashCustomerForm
            setIsOpen={setIsEditCustomerOpen}
            payment={payment}
          />
        )}
      </ResponsiveDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button onClick={() => setIsEditCustomerOpen(true)}>
              <IconMenu text="Edit" icon={<Pencil className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteCustomer(payment.id)}>
            <IconMenu text="Delete" icon={<Trash2 className="h-4 w-4" />} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "wgt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Wgt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "plan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "creation",
    header: "Creation Date",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell,
  },
];
