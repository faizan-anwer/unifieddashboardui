import React, { Component } from 'react';
import {Link} from 'react-router';
import Dropdown from './helper/dropdown';
import ModeChange from './pages/mode-change';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Header extends Component {

  componentWillMount()
  {
    this.state = {
        "config":{
            "head":{
              "css":""
            },
            "btn":{
                  "css":"dropdown-toggle",
                  "label":<span className='glyphicon glyphicon-menu-down'></span>
            },
            "list":{
                  "pos":"right"
            }
          }
        }
  }

  menu(data,i)
  {
    if(data.label == 'MENU_DIVIDER')
    {
      return (
        <li key={i} className="divider"></li>
      );
    }
    else if(data.url == "null" || data.url == null || data.url == "" || data.url == "#" || data.type == "sign-out")
    {
      let param = "";
      if(data.content != null && data.content != "null" && data.content != "")
      {
        param = "/"+i;
      }
      return (
        <li key={i}><Link to={"/LS360Dashboard/"+data.type+param} activeClassName="active">{data.label}</Link></li>
      );
    }
    else if(data.type == "support" || data.type == "privacy-policy" || data.type == "terms")
    {
      return (
        <li key={i}><a href={data.url} target="_blank" activeClassName="active">{data.label}</a></li>
      );
    }
    else
    {
      return (
        <li key={i}><a
          href="javascript:;"
          activeClassName="active"
          onClick={() => this.props.getModal({
              "visible":true,
              "title":"Store Mode",
              "body":<ModeChange url={data.url} type='store' title="store" />,
              "size":"modal-md"
            })}
        >
        {data.label}</a></li>
      );
    }
  }

  render()
  {
    var logoUrl = {backgroundImage: 'url("' + this.props.data.logo.source + '")'};
    return (
        <nav className="navbar-fixed-top">
          <a className="brand" style={logoUrl} href={this.props.data.logo.url} target="_blank" title={this.props.data.logo.label}></a>
          <ul className="menu">
    				<li className="user-detail">
    					<Link to="/LS360Dashboard/account-info"><div className="username">{this.props.data.user.firstName}</div>
    					<div>{this.props.data.user.email}</div></Link>
    				</li>
    				<li>
      					<Dropdown config={this.state.config}>
                  {this.props.data.menu.map(this.menu, this)}
      					</Dropdown>
    				</li>
          </ul>
        </nav>
    );
  }
}

function mapState(state)
{
  return {};
}

export default connect (mapState,actions)(Header);
