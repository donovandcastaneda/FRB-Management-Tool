"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Add Customer</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="col gap-3  md:w-[200px] lg:w-[200px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Add External Customer">
                Add customer that is paying with cash.
              </ListItem>
              <ListItem
                href="https://buy.stripe.com/test_dR6bMIdBngqw2GscMN"
                title="Add 1st Time Non-Competitive"
              >
                Non-competitive membership with intial fee.
              </ListItem>
              <ListItem
                href="https://buy.stripe.com/test_aEUg2Y1SF5LS6WIcMM"
                title="Add 1st Time Competitive"
              >
                Competitive membership with intial fee.
              </ListItem>
              <ListItem
                href="https://buy.stripe.com/test_8wM3gc2WJeio4OA5km"
                title="Add Non-Competitive Customer"
              >
                Non-competitive membership without intial fee.
              </ListItem>
              <ListItem
                href="https://buy.stripe.com/test_7sIdUQ0OBcag5SEfZ1"
                title="Add Competitive Customer"
              >
                Competitive membership without intial fee.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
