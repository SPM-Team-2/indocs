import initFirebase from "../Handlers/firebaseHandler";
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import { setUserCookie } from "../Handlers/userCookies";
import { mapUserData } from "../Handlers/mapUserData";
import { useUser } from "../Handlers/useUser";

initFirebase();

const FirebaseAuthConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: "/",
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = mapUserData(user);
      setUserCookie(userData);
    },
  },
};

const FirebaseAuth = () => {
  // const [renderAuth, setRenderAuth] = useState(true);
  const { user, logout } = useUser();

  // useEffect(() => {
  // if (user) setRenderAuth(true);
  // if (typeof window !== "undefined") {
  //   setRenderAuth(true);
  // }
  // }, []);

  console.log(user);

  return (
    <>
      {!user ? (
        <div className="w-8/12 mx-auto">
          <StyledFirebaseAuth
            uiConfig={FirebaseAuthConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      ) : (
        <div className="w-1/5 mx-auto">
          <button
            className="w-full border-2 border-white p-2 sm:p-1 bg-red-500 mt-3 rounded-lg text-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </>
    // <div className="w-8/12 mx-auto">
    //   {!user ? (
    //     <StyledFirebaseAuth
    //       uiConfig={FirebaseAuthConfig}
    //       firebaseAuth={firebase.auth()}
    //     />
    //   ) : (
    //     <h1>RenderAuth is false</h1>
    //   )}
    // </div>
  );
};

export default FirebaseAuth;
