import React, { useState } from "react";

export default function Forms() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setUsername(value);
  };
  const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setEmail(value);
  };
  const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPassword(value);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={onUsernameChange}
        value={username}
        required
        type="text"
        placeholder="Username"
      />
      <input
        onChange={onEmailChange}
        value={email}
        required
        type="email"
        placeholder="Email"
      />
      <input
        onChange={onPasswordChange}
        value={password}
        required
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
