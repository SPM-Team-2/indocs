import initFirebase from "../Handlers/firebaseHandler";
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import { setUserCookie } from "../Handlers/userCookies";
import { mapUserData } from "../Handlers/mapUserData";

initFirebase();

const FirebaseAuthConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: "/loginTest",
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = mapUserData(user);
      setUserCookie(userData);
    },
  },
};

const FirebaseAuth = () => {
  const [renderAuth, setRenderAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);

  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={FirebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : (
        <h1>RenderAuth is false</h1>
      )}
    </div>
  );
};

export default FirebaseAuth;
