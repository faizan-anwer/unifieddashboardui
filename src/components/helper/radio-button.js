import React, { Component } from 'react';

class RadioButton extends Component {

  onChange(event)
  {
    if(typeof this.props.onChange === 'function')
    {
      this.props.onChange(this.props.data,event);
    }
  }

  list(data,i)
  {
    return(
      <div className="scene-option radio">
        <label><input onChange={this.onChange.bind(this)} type="radio" value={i}
          checked={data.selected}/><span>{data.text}</span></label>
      </div>
    );
  }

  render()
  {
    return (
      <div className={"well-2 animated-input up "+(this.props.align)}
        data-placeholder={this.props.placeholder}>
        <div className="radio-holder">
        {this.props.options.map(this.list.bind(this))}
        </div>
      </div>
    );
  }
}

export default RadioButton;
