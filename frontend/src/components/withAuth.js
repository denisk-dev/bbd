import React, { useState, useEffect } from "react";

import Axios from "axios";

import { useHistory, Redirect } from "react-router-dom";

const withAuth = (ComponentToProtect) => {
  const New = (props) => {
    // let history = useHistory();

    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      Axios.get("http://localhost:3500/checkingtoken", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          //console.log(res);
          setLoading(!loading);
        })
        .catch((err) => {
          //console.log(err);
          setRedirect(!redirect);
          setLoading(!loading);
        });
    }, []);

    if (loading) return "Loading";

    if (redirect) {
      return <Redirect to="/login" />;
      // history.push("/login");
      // return;
    }

    return <ComponentToProtect {...props} />;
    // if (loading) return null;
    // if (redirect) history.push("/login");
  };

  return New;
};

export default withAuth;
