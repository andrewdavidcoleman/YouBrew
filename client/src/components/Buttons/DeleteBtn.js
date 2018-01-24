import React from "react";

export const DeleteBtn = props =>
  <button {...props}
    className="btn btn-danger deleteRec"
  >
    {props.children}
  </button>;
