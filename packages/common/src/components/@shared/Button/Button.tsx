import React from "react";

export const Button: React.FC<{ onClickHandler: () => void }> = ({
  children,
  onClickHandler,
}) => {
  return <button onClick={() => onClickHandler()}>{children}</button>;
};
