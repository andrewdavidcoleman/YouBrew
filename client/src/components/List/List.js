import React from "react";

export const List = ({ children }) => {
  return (
    <div style={{width: "70%"}} className="containermyrecipes">
        <div className="row">
            {children}
        </div>
    </div>
  );
};
