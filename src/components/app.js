import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from './header';
import LeftMenu from './left-menu';
import Tooltip from './helper/tool-tip';
import Popover from './helper/popover';
import Modal from './helper/modal';

class App extends Component {

  componentWillMount()
  {
    if(typeof this.props.auth != "undefined" && this.props.auth != false && this.props.auth != "false")
    {
      this.props.fetchBrand();
      if(typeof(Storage) && typeof localStorage.leftMenu != "undefined")
      {
        var obj = JSON.parse(localStorage.leftMenu);
        this.props.leftMenuToggle(obj.isOpen,obj.activeAccType,obj.activeType);
      }
      else
      {
        this.props.leftMenuToggle(true);
      }
    }
  }

  componentWillUnmount()
  {
    this.props.authentication(false);
    this.props.clearState("FETCH_BRAND");
  }

  render()
  {
    if(typeof this.props.branding.logo != 'undefined')
    {
      return (
        <div>
          <Tooltip />
          <Popover />
          <Modal />
          <div id="wrapper" className={(!this.props.leftMenu.isOpen)?"left-toggle":""}>
            <Header
              data={{
                logo:this.props.branding.logo,
                menu:this.props.branding.topMenu.child,
                user:this.props.branding.userData
              }}
            />
            <LeftMenu
              data={this.props.branding.leftMenu}
              config={this.props.leftMenu}
            />
            <div className="main">
              {this.props.children}
            </div>
            <div className="left-menu-overlay"></div>
          </div>
        </div>
      );
    }
    else
    {
      return (<div className="full pre-loader"></div>);
    }
  }
}

function mapState(state)
{
  return {"branding":state.branding,"leftMenu":state.leftMenu};
}

export default connect(mapState,actions)(App);
