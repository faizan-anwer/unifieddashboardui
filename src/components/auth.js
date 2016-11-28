import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

export default (Composition) => {

  class Auth extends Component {

    static contextTypes = {
      router:React.PropTypes.object
    }

    componentWillMount()
    {
      if(typeof this.props.auth == "undefined" || this.props.auth == false || this.props.auth == "false")
      {
        this.context.router.push('/LS360Dashboard/login');
        return;
      }
      axios.defaults.headers.common['Authorization'] = "bearer "+this.props.auth;
    }

    render()
    {
      return <Composition {...this.props}/>;
    }
  }

  function mapState(state)
  {
    return {auth: localStorage.auth}; //state.auth};
  }

  return connect(mapState)(Auth);
}
