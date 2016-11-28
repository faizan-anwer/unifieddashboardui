import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import InputField from './helper/input-field';

class Login extends Component {

  static contextTypes = {
    router:React.PropTypes.object
  }

  componentWillMount()
  {
    this.state = {
      "email":"",
      "pass":"",
      "waiting":false,
      "valid":true,
      "remember":false,
      "readOnly":true,
      "allowLogin":false,
      "goToCAS":false
    }

    const instance = this;
    setTimeout(function(){
				instance.setState({"readOnly":false});
        if(typeof(Storage))
        {
          if(typeof localStorage.email != "undefined")
          {
            instance.setState({
              "remember":true,
              "email":localStorage.email,
              "pass":localStorage.pass
            },function()
            {
              instance.checkAllowLogin();
            });
          }
        }
		},100);

    this.onKeyEnter = this.onKeyEnter.bind(this);
    document.addEventListener('keyup',this.onKeyEnter);
  }

  componentWillUnmount()
  {
    document.removeEventListener('keyup',this.onKeyEnter);
  }

  componentDidMount()
  {
    this.checkAllowLogin();
  }

  componentWillReceiveProps(nextProps)
  {
    if(typeof nextProps.auth.errors == "undefined")
    {
      if(typeof(Storage) && this.state.remember)
      {
        localStorage.setItem("email",this.state.email);
        localStorage.setItem("pass",this.state.pass);
      }

      this.setState({"valid": true,"goToCAS":true});
      //this.context.router.push("/LS360Dashboard/courses");
      return;
    }
    else
    {
      this.setState({"valid": false});
    }

    this.setState({"waiting": false});
  }

  checkAllowLogin()
  {
    this.setState({"allowLogin":(this.state.email.length <= 0 || this.state.pass.length <= 0)});
  }

  onRemember(event)
  {
    this.setState({"remember": event.target.checked});
  }

  onChange(event)
  {
    let name = event.target.name;
    let val = event.target.value
    this.setState({
      [name]: val,
      "valid": true
    },function()
    {
      this.checkAllowLogin();
    });
  }

  onKeyEnter(e)
  {
    var k=e.which||e.keyCode;
    if(k==13 && !this.state.waiting && !this.state.allowLogin)
    {
      this.onSubmit();
    }
  }

  onSubmit()
  {
      this.setState({"waiting": true});
      this.props.authentication(true,this.state.email,this.state.pass);
  }

  validationMsg()
  {
    if(this.state.valid)
    {
      return "";
    }
    else
    {
      return <div className="side-balance form-group has-error">
        <label className="control-label">Invalid User Name or Password. Please try again.</label>
      </div>
    }
  }

  createCASForm()
  {
    if(this.state.goToCAS)
    {
      let that = this;
      setTimeout(function(){that.submitCAS()},500);
      return (
        <div className="hide">
          <form action={process.env.CAS_SERVER+"/login"} method="post" name="Logon" id="frm_login">
      		  <input id="auto" type="hidden" value="true" name="auto" />
      		  <input type="hidden" name="service" value={"http://"+window.location.host+"/LS360Dashboard/cas"} />
            <input type="text" id="username" name="username" value={this.state.email} readOnly/>
    				<input type="password" id="password" name="password" value={this.state.pass} readOnly/>
      		</form>
        </div>
      );
    }
  }

  submitCAS()
  {
    if(this.state.goToCAS)
    {
      document.getElementById('frm_login').submit();
    }
  }

  render()
  {
    return (
      <div className="login-form">
        {this.createCASForm()}
        <div>
          <h2>Sign In To <span className="blue-text">360training</span>.com</h2>
          <div>
            <div className="form-body">
              {this.validationMsg()}
              <div className={"side-balance form-group"+(!this.state.valid?" has-error":"")}>
                <InputField type="text" name="email" className="form-control"
                  required={true}
                  placeholder="Email / Username"
                  msg="Enter your Email / Username"
                  disabled={this.state.waiting}
                  readOnly={this.state.readOnly}
                  value={this.state.email}
                  onChange={this.onChange.bind(this)}/>
              </div>
              <div className={"side-balance form-group"+(!this.state.valid?" has-error":"")}>
                <InputField type="password" name="pass"  className="form-control"
                  placeholder="Password"
                  required={true}
                  msg="Enter your Password"
                  disabled={this.state.waiting}
                  readOnly={this.state.readOnly}
                  value={this.state.pass}
                  onChange={this.onChange.bind(this)}/>
              </div>
              <div className="form-group">
                <div className="scene-option checkbox">
                  <label><input type="checkbox"
                  checked={this.state.remember}
                  onChange={this.onRemember.bind(this)}/><span className="text-muted">Remember Me</span></label>
                </div>
              </div>
              <div className="form-group">
                <div className="btn-group btn-group-justified">
                  <div className="btn-group btn-group-lg">
                    <button
                      className={"btn btn-primary"+(this.state.waiting?" disabled":"")}
                      disabled={this.state.waiting | this.state.allowLogin}
                      onClick={() => this.onSubmit()}>{(!this.state.waiting?"Sign in":"Signing...")}</button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="btn-group btn-group-justified">
                  <div className="btn-group btn-group-lg">
                    <button
                      className={"btn fb-icon btn-primary"+(this.state.waiting?" disabled":"")}
                      disabled={this.state.waiting}>Login With Facebook</button>
                  </div>
                  <div className="btn-group btn-group-lg">
                    <button
                      className={"btn in-icon btn-primary"+(this.state.waiting?" disabled":"")}
                      disabled={this.state.waiting}>Login With LinkedIn</button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <ui className="list-inline">
                  <li className="go-right">
                    <a href="#" className="text-muted">Forgot your password?</a>
                  </li>
                  <li className="go-left">
                    <a href="#" className="text-muted">New? Sign Up</a>
                  </li>
                </ui>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state)
{
  return {auth: state.auth};
}

export default connect(mapState,actions)(Login);
