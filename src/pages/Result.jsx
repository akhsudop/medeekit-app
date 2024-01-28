import React from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();

  return (
    <>
      {JSON.stringify(state)}
      <div>Result</div>
    </>
  );
};

export default Result;
