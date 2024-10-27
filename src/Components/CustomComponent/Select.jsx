import React from "react";

function Select({ className = "", options, children, ...props }, ref) {
  console.log(options);
  return (
    <div>
      <select ref={ref} {...props} className={className}>
        {children && <option>{children}</option>}
        {options?.map((option, index) => (
          <option key={index}>{option?._id}</option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
