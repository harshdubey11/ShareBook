import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logoutCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
function Logout() {
 
  const { isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();
  function navigateTo() {
    history.push("/");
  }

  useEffect(() => {
    logoutCall(dispatch);
    navigateTo();
  }, []);

  return <div>Logging Out</div>;
}

export default Logout;
