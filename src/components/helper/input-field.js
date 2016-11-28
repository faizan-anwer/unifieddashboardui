import React, { Component } from 'react';

class InputField extends Component {

  componentWillMount()
  {
    var cond;
    if(typeof this.props != "undefined")
    {
      if(this.props.value != null)
      {
        cond = (this.props.value.length <= 0);
      }
      else
      {
        cond = false;
      }
    }
    else
    {
      cond = true;
    }
    this.state = {
      "status":(cond?"":" up "),
      "placeholder":(cond?"":this.props.placeholder),
      "required":(this.props.required!=undefined?(this.props.required?"required":""):"")
    };
    try{
      if(this.props.alert)
      {
        this.check(this.props);
      }
    }catch(e){}
  }

  onFocused()
  {
    this.setState({"status":" up ","placeholder":this.props.placeholder});
  }

  onBlured()
  {
    this.check(this.props);
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.runtime != undefined && this.props.runtime == true)
    {
      this.check(nextProps);
    }
  }

  check(props)
  {
    if(this.state.required == "required")
    {
      if(props.value.length <= 0)
      {
        this.setState({"status":" error ","placeholder":props.msg});
      }
      else
      {
        if(props.validate != undefined)
        {
          if(props.validate.result == false)
          {
            this.setState({"status":" error ","placeholder":props.validate.msg});
          }
          else
          {
            this.setState({"status":" up ","placeholder":props.placeholder});
          }
        }
        else
        {
          this.setState({"status":" up ","placeholder":props.placeholder});
        }
      }
    }
    else
    {
      this.setState({"status":" up ","placeholder":props.placeholder});
    }
  }

  render()
  {
    return (
      <div className={"animated-input"+this.state.status}
        data-placeholder={this.state.placeholder}>
        <input {...this.props}
          onFocus={() => this.onFocused()}
          onBlur={() => this.onBlured()}/>
      </div>
    );
  }
}

export default InputField;
