import React from "react";
import { Alert } from "@material-tailwind/react";

export default function AlertComponent(props) {
  return (
    <div>
      {props.alert && (
        <Alert color={props.alert.color} className=" rounded-none">
          {props.alert.message}
        </Alert>
      )}
    </div>
   
  );
}
