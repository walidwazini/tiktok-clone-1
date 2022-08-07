import React from "react";

interface IProps {
  text: string;
}

const NoResult = ({ text }: IProps) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

export default NoResult;
