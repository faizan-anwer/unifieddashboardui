import React, { Component } from 'react';

class ModeChange extends Component {

  componentWillMount()
  {
    let that = this;
    setTimeout(function(){
      window.location.href = that.props.url;
    },1000);
  }

  render()
  {
    return (
      <div className="row">
        <div className="col-sm-6">
          <div className={this.props.type+" mode-screenshot"}></div>
          <div className="reloader"></div>
        </div>
        <div className="col-sm-6">
          <p><strong>Migrating You To Classic Experience</strong></p>
          <p>We are working fast to bring managing capabilities to the new dashboard experience. In the mean time, we will migrate you over to the classic {this.props.title} mode.</p>
        </div>
      </div>
    );
  }
}

export default ModeChange;
