import React from "react";

const appContext = React.createContext(null)
const userContext = React.createContext(null)
const commentsContext = React.createContext(null)

export { userContext, commentsContext, appContext }