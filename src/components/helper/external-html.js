import React, { Component } from 'react';

class ExternalHtml extends Component {

  componentWillMount()
  {
    this.state = {
      "loading":true
    }
  }

  handleFileLoad()
  {
    this.setState({"loading":false});
  }

  render()
  {
    var Iframe=this.props.iframe;
    return <div className={(this.state.loading?"pre-loader":"")}><Iframe src={this.props.src} height="100%" width="100%" onLoad={() => this.handleFileLoad()}/></div>;
  }
}

export default ExternalHtml;
