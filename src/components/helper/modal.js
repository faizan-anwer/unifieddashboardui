import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import ExternalHtml from './external-html';

class Modal extends Component {

  componentWillMount()
  {
    this.state = {
      "visible":false,
      "shouldVisible":false
    };
  }

  componentWillReceiveProps(nextProps)
  {
    var that = this;
    var isVisible = nextProps.modal.visible;
    if(isVisible)
    {
      this.setState({"shouldVisible":isVisible});
      setTimeout(function(){
          that.setState({"visible":isVisible});
  		},100);
    }
    else
    {
      this.setState({"visible":isVisible});
      setTimeout(function(){
          that.setState({"shouldVisible":isVisible});
  		},100);
    }
  }

  createBody()
  {
    if(typeof this.props.modal.body != "undefined")
    {
        if(typeof this.props.modal.body == "object")
        {
          return <div>{this.props.modal.body}</div>;
        }
        else if(typeof this.props.modal.body == "string")
        {
          return <div dangerouslySetInnerHTML={{__html: this.props.modal.body}} />;
        }
    }
    else if(typeof this.props.modal.src != "undefined")
    {
      return <ExternalHtml iframe='iframe' src={this.props.modal.src} />;
    }
  }

  footer(content)
  {
    if(typeof content != "undefined")
    {
      return (<div className="modal-footer">
        {content}
      </div>);
    }
  }

  render()
  {
    if(this.state != null)
    {
      if(this.state.shouldVisible)
      {
        var isIn;
        (this.state.visible?isIn=" in":isIn="");

        return (
          <div>
            <div className="modals">
              <div className={"modal fade"+isIn} style={{"display":"block"}}>
                <div className="vertical-alignment-helper">
                  <div className={"modal-dialog vertical-align-center "+this.props.modal.size}>
                    <div className="modal-content">
                      <div className="modal-header">
                        <h2 className="modal-title">{this.props.modal.title}</h2>
                        <button type="button" onClick={() => this.props.getModal({"visible":false})} className="close"></button>
                      </div>
                      <div className="modal-body">
                        {this.createBody()}
                      </div>
                      {this.footer(this.props.modal.footer)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"modal-backdrop fade"+isIn}></div>
          </div>
        );
      }
      else
      {
        return <div></div>;
      }
    }
    else
    {
      return <div></div>;
    }

  }
}

function mapState(state)
{
  return {"modal":state.modal};
}

export default connect(mapState, actions)(Modal);
