import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline:
          "text-foreground border-border bg-background",
        success:
          "border-transparent bg-emerald-500 text-white",
        warning:
          "border-transparent bg-amber-500 text-white",
        info:
          "border-transparent bg-blue-500 text-white",
        purple:
          "border-transparent bg-purple-500 text-white",
        pink:
          "border-transparent bg-pink-500 text-white",
        gray:
          "border-transparent bg-gray-500 text-white",
        light:
          "border-gray-200 bg-gray-50 text-gray-700",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        default: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Badge({ className, variant, size, children, ...props }) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      role="status"
      aria-label={typeof children === 'string' ? children : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
