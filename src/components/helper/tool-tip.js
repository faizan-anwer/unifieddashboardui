import React, { Component } from 'react';
import {connect} from 'react-redux';

class ToolTip extends Component {

  render()
  {
    if(this.props.data.visible)
    {
      return (
        <div className={'tooltip '+this.props.data.pos} style={this.props.data.css} role="tooltip">
          <div className="tooltip-arrow"></div>
          <div className="tooltip-inner">
            {this.props.data.content}
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
    return {"data":state.tooltip};
}

export default connect(mapState)(ToolTip);
