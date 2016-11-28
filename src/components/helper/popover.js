import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Popover extends Component {

  componentWillReceiveProps(nextProps)
  {
    if(nextProps.data.visible)
    {
      this.closeIt = this.closeIt.bind(this);
      document.getElementById("wrapper").addEventListener('click',this.closeIt);
    }
  }

  closeIt(e)
  {
    document.getElementById("wrapper").removeEventListener('click',this.closeIt);
    this.props.popover();
  }

  title()
  {
    if(this.checkProps(this.props.data.title,false))
    {
      return (<h3 className="popover-title">{this.props.data.title}</h3>);
    }
    else
    {
      return;
    }
  }

  closeBtn()
  {
    if(this.checkProps(!this.props.data.closeBtn,false))
    {
      return;
    }
    return <button type="button" onClick={() => this.closeIt()} className="close"><span>X</span></button>;
  }

  checkProps(prop,returnVal='')
  {
    if(prop == undefined)
    {
      return returnVal;
    }
    return prop;
  }

  render()
  {
    if(this.checkProps(this.props.data.visible,false) && this.props.data.visible)
    {
      return (
        <div className={"popover "+this.checkProps(this.props.data.pos)}
         style={this.checkProps(this.props.data.css,{})}>
          <div className="arrow"></div>
          {this.closeBtn()}
          {this.title()}
          <div className="popover-content">
            <p>{this.checkProps(this.props.data.content)}</p>
          </div>
        </div>
      );
    }
    else
    {
      return (
        <div></div>
      );
    }
  }
}

function mapState(state)
{
    return {"data":state.popover};
}

export default connect(mapState,actions)(Popover);
