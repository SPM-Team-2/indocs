import FirebaseAuth from "./FirebaseAuth";
import React, { useState } from "react";
import Head from "next/head";
import ProgressBar from "../components/ProgressBar";

const Login = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const allowed = ["application/pdf"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    console.log(selected.type);
    if (selected && allowed.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an Image File");
    }
    console.log(selected);
  };

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(() => {})
      .catch(alert);
  };

  return (
    <div className="z-10 w-full">
      <Head>
        <title>Login</title>
      </Head>
      <FirebaseAuth />
      {/* <p>
        <a href="/"> goto testing page </a>
      </p> */}
      {/* <form>
        <label>
          <input type="file" onChange={changeHandler} />
          <span>+</span>
        </label>

        <div className="output">
          {error && <div className="error"> {error}</div>}
          {file && <div className="file"> {file.name}</div>}
          {file && <ProgressBar file={file} setFile={setFile} />}
        </div>
      </form> */}
    </div>
  );
};

export default Login;
