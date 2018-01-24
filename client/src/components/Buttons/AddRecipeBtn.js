import React from "react";

export const AddRecipeBtn = props =>
  <button {...props} style={{ float: "left"}} className="btn btn-primary" id="adminBtn">
    {props.children}
  </button>;
