import React, { Component } from 'react';

class SelectList extends Component {

  check()
  {
    if(this.props.validate != undefined)
    {
      return (this.props.validate.result==false?" error":"");
    }
    return "";
  }

  render()
  {
    return (
      <div className={"animated-input up"+this.check()}
        data-placeholder={this.props.placeholder}>
        <select {...this.props}/>
      </div>
    );
  }
}

export default SelectList;
