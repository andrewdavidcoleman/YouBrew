import React from "react";

export const EditBtn = props =>
  <button {...props} style={{backgroundColor: "rgb(231,175,95)", border: "none"}} className="btn btn-danger">
    {props.children}
  </button>;
