import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const domain = import.meta.env.VITE_AUTH_0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH_0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH_0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH_0_AUDIENCE;

  const navigate = useNavigate();
  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("Unable to initialize Auth 0");
  }

  const onRedirectCallback = () => {
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
