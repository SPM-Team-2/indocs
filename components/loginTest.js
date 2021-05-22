import React, { useState } from "react";
import { useUser } from "../Handlers/useUser";
import getOCR from "../utils/getOCR";

const LoginTest = () => {
  const { user, logout } = useUser();
  
  
  
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    console.log(selected.type);
    getOCR(selected);
    console.log(selected);
  };

  if (user) {
    return (
      <div className="z-10">
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        {user.profilePic ? (
          <image src={user.profilePic} height={100} width={100}></image>
        ) : (
          <p>No profile pic</p>
        )}
        <h1>Logged in dude</h1>
        <input type="file" onChange={changeHandler} />


        <button onClick={() => logout()}> Logout! </button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>User is not logged in!</h1>
      </div>
    );
  }
};

export default LoginTest;
