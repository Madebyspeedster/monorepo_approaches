import { Button } from "@ng_speedster/common";
import React, { useState } from "react";
import { auth } from "src/api/auth0/auth0";
import { useSilentAuth } from "src/hooks/getToken";

export const LoginForm: React.FC = () => {
  const [email] = useState("l1750sqqs@gmail.com");
  const [password] = useState("Diesel2009");
  const [token, setToken] = useState("");
  const { getTokenSilently } = useSilentAuth();

  return (
    <div>
      <Button
        onClickHandler={() => {
          auth
            .login({ email, password })
            .then((response) => {
              setToken(response.access_token);
              auth.saveRefreshToken(response.refresh_token);
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        Submit
      </Button>
      <Button
        onClickHandler={() => {
          getTokenSilently().then((result) => {
            setToken(result.token);
          });
        }}
      >
        get token
      </Button>
      <p style={{ maxWidth: 550, wordBreak: "break-word" }}>{token}</p>
    </div>
  );
};
