import React from "react";

function Button({ children, className = "", type = "", ...props }) {
  return (
    <div>
      <button type={type} className={className} {...props}>
        {children}
      </button>
    </div>
  );
}

export default Button;
