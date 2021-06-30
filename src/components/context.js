import React, { useState } from "react";

export const userContext = React.createContext();

function Settings({ children }) {
  const [itemState, setItemState] = useState(false);
  const [itemPerScreen, setItemPerScreen] = useState(3);
  const [sortOn, setSortOn] = useState("difficult");

  const states = {
    itemState,
    setItemState,
    itemPerScreen,
    setItemPerScreen,
    sortOn,
    setSortOn,
  };

  return (
    <userContext.Provider value={states}>{children}</userContext.Provider>
  );
}

export default Settings;