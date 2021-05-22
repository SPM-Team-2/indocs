import React from "react";
import { useUser } from "../Handlers/useUser";

const LoginTest = () => {
  const { user, logout } = useUser();

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
        <h1>logged in dude</h1>
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
