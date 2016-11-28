import React, { Component } from 'react';

class CAS extends Component {

  static contextTypes = {
    router:React.PropTypes.object
  }

  componentWillMount()
  {
    this.context.router.push('/LS360Dashboard/courses');
  }
  
  render()
  {
    return (
      <div>
        Please Wait...
      </div>
    );
  }
}

export default CAS;
