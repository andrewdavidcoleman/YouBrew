import React from "react";

export const FormBtn = props =>
  <button style={{ float: "left", margin: "10px"}} {...props}>
    {props.children}
  </button>;
