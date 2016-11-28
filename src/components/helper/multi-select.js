import React, { Component } from 'react';

class MultiSelect extends Component {

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
      <div className={"scene-option multi-select "+data.selected}>
        <label><input onChange={this.onChange.bind(this)} type="checkbox" value={i}
         checked={data.selected}/><span>{data.text}</span></label>
      </div>
    );
  }

  render()
  {
    return (
      <div className={"well-2 animated-input up"}
        data-placeholder={this.props.placeholder}>
        <div className="multi-select-holder">
          {this.props.options.map(this.list.bind(this))}
        </div>
      </div>
    );
  }
}

export default MultiSelect;
