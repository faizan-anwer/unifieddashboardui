import React, {Component} from 'react';
import {connect} from 'react-redux';

class PrivacyPolicy extends Component {

  checkStatus()
  {
    let result = typeof this.props.params == "undefined";
    if(!result)
    {
      result = (typeof this.props.params.i == "undefined");
    }
    return result;
  }

  render()
  {
    if(this.checkStatus())
    {
      return (
        <div>
          Privacy Policy
        </div>
      );
    }
    else
    {
      let content = this.props.branding.topMenu.child[this.props.params.i]["content"];
      return <div dangerouslySetInnerHTML={{__html: content}} />;
    }
  }
}

function mapState(state)
{
  return {"branding":state.branding};
}

export default connect (mapState)(PrivacyPolicy);
