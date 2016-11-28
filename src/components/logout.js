import React, { Component } from 'react';

class Logout extends Component {

  componentWillMount()
  {
    localStorage.removeItem("auth");
    localStorage.removeItem("userName");
    localStorage.removeItem("leftMenu");
    window.location.href = process.env.CAS_SERVER+"/logout?service=http://"+window.location.host+"/LS360Dashboard/login";
  }

  render()
  {
    return (
      <div className="full pre-loader"></div>
    );
  }
}

export default Logout;
