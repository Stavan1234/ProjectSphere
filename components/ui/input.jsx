import * as React from "react";
import { Input as NextInput } from "@nextui-org/react";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <NextInput
      type={type}
       // Change 'blue' to your desired color
      className={className}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
