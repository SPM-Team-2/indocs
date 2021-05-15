import FirebaseAuth from '../components/FirebaseAuth'
import React from "react";
import Head from "next/head";

const login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <FirebaseAuth/>
      <p><a href="/loginTest"> goto testing page </a></p>
    </div>
  );
};

export default login;
