import React, { Component } from 'react';

class Dropdown extends Component {

  componentWillMount()
  {
    this.state = {
      "open":false
    };
  }

  componentWillUnmount()
  {
    this.handleClose();
  }

  handleClose()
  {
    this.setState({"open":false});
    document.getElementById("dashboard").removeEventListener('click',this.handleClose);
  }

  onClick()
  {
    if(this.state.open)
    {
      document.getElementById("dashboard").removeEventListener('click',this.handleClose);
      return;
    }
    else
    {
      this.setState({"open":true});
    }
    this.handleClose = this.handleClose.bind(this);
    document.getElementById("dashboard").addEventListener('click',this.handleClose);
  }

  render()
  {
    return (
      <div className={this.props.config.head.css+(this.state.open?" open":"")}>
        <button className={"dropdown-toggle "+this.props.config.btn.css} onClick={() => this.onClick()}>{this.props.config.btn.label}</button>
        <ul className={"dropdown-menu"+(this.props.config.list.pos=="right"?" dropdown-menu-right":"")}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

export default Dropdown;
