import React, { useId } from "react";

function Input({ className = "", type = "text", label, ...props }, ref) {
  const id = useId();
  return (
    <div className="flex items-center">
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} className={className} id={id} ref={ref} {...props} />
    </div>
  );
}

export default React.forwardRef(Input);
