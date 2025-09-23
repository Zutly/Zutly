"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react"; // Importeer de Plus en Minus iconen

import { cn } from "@/lib/utils";

const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
      {...props}
    >
      {children}
      {/* Conditionally render Plus or Minus based on data-state */}
      <span className="h-4 w-4 shrink-0 transition-transform duration-200">
        <Plus className="h-4 w-4 transition-all duration-200 group-data-[state=open]:hidden" />
        <Minus className="h-4 w-4 transition-all duration-200 group-data-[state=closed]:hidden" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export { CustomAccordionTrigger };