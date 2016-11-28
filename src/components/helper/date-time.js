import React, { Component } from 'react';
import Datetime from "react-datetime";

class DateAndTime extends Component {

  render()
  {
    return(
      <div className="animated-input up"
        data-placeholder={this.props.placeholder}>
        <Datetime timeFormat={false} {...this.props} inputProps={{
          "placeholder":this.props.placeholder,
          "readOnly":"readOnly"
        }}/>
      </div>
    );
  }
}

export default DateAndTime;
