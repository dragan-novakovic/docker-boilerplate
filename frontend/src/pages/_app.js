import React from "react";
import App from "next/app";
export const UserContext = React.createContext();

import "../styles/tailwind.css";

class MyApp extends App {
  constructor() {
    super();
    this.state = {
      userId: null
    };
  }

  setUserId = userId => {
    this.setState({ userId });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserContext.Provider
        value={{ userId: this.state.userId, setUserId: this.setUserId }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}

export default MyApp;
