import React, { SyntheticEvent } from "react";

export const Button: React.FC<{
  onClickHandler: (e?: SyntheticEvent) => void;
}> = ({ children, onClickHandler }) => {
  return <button onClick={() => onClickHandler()}>{children}</button>;
};
