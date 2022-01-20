import { Button, say } from "@ng_speedster/common";
import React, { useState } from "react";

export const Example: React.FC = () => {
  const [showMessage, toggleShowMessage] = useState(false);
  return (
    <section>
      <h1>We're going to use common module</h1>
      <hr />
      <Button onClickHandler={() => toggleShowMessage(!showMessage)}>
        Toggle message
      </Button>
      <hr />
      {showMessage && say("Hi there!")}
    </section>
  );
};
