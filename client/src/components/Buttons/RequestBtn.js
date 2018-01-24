import React from "react";

export const RequestBtn = props =>
  <button {...props} style={{ float: "left", margin: "10px"}} className="btn btn-primary" id="requestBtn">
    {props.children}
  </button>;
