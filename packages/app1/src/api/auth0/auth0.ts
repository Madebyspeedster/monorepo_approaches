import authConfig from "src/utils/auth.config";

type AuthResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type Credentials = {
  email: string;
  password: string;
};

const auth = {
  login({ email, password }: Credentials): Promise<AuthResponse> {
    return fetch(`https://${authConfig.auth0_client_domain}/oauth/token`, {
      headers: new Headers({ "content-type": "application/json" }),
      method: "POST",
      body: JSON.stringify({
        audience: authConfig.auth0_audience,
        client_id: authConfig.auth0_client_id,
        username: email,
        password,
        scope: "offline_access",
        grant_type: "password",
      }),
    }).then((response) => response.json());
  },
  saveRefreshToken(token: string) {
    const data = JSON.stringify({
      token,
    });
    return fetch("/v1/auth0/save-refresh-token", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: data,
    });
  },
};
export { auth };
