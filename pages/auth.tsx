import React, { useReducer, useState } from "react";

enum AuthActionType {
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
}

interface AuthAction {
  type: AuthActionType;
  payload: string;
}

interface AuthState {
  email: string;
  password: string;
}

// ? To be continnued for validity-check for EMAIL and PASSWORD --> {value,validity}
const authReducer = (state: AuthState, action: AuthAction) => {
  const { type, payload } = action;
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const changeMode = () => setIsLogin((prevState) => !prevState);

  const authHandler = (ev: any) => {
    ev.preventDefault();
    // API call

    // resetState
    setEmail("");
    setPassword("");
  };

  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <h1>Login or Sign Up</h1>
      <button
        className={` bg-green-700  rounded-lg shadow-md p-2 w-32 mt-4`}
        onClick={changeMode}
      >
        {isLogin ? "To sign up" : "To login"}
      </button>
      <div
        className={`mt-20 border-blue-600 bg-slate-800 rounded-sm h-1/2 w-3/4 px-10 py-2`}
      >
        <form className='flex flex-col justify-center items-center '>
          <input
            name='email'
            type={"email"}
            placeholder='Email..'
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className={`mt-10 mb-4 w-1/2 rounded-lg h-10 px-4`}
          />
          <input
            name='password'
            type={"password"}
            placeholder='Password..'
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className={`mb-4 w-1/2 rounded-lg h-10 px-4`}
          />
          {!isLogin && (
            <input
              name='password'
              type={"password"}
              placeholder='Password..'
              value={confirmPw}
              onChange={(ev) => setConfirmPw(ev.target.value)}
              className={`mb-4 w-1/2 rounded-lg h-10 px-4`}
            />
          )}
          <button
            onClick={authHandler}
            className={`bg-indigo-500 mt-4 p-2 w-36 rounded-lg text-lg shadow-sm shadow-blue-300 text-white`}
          >
            {isLogin ? "Login" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
