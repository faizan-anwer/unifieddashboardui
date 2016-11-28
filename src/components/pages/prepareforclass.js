import React, { Component } from 'react';

class PrepareForClass extends Component {

  render()
  {
    return (
      <video src={process.env.ROOT_DIR+"assets/videos/classroom-preparation.mp4"} autoPlay controls />
    )
  }
}

export default PrepareForClass;
