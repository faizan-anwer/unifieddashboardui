import React, { Component } from 'react';

class NetworkBandwidth extends Component {

  componentWillMount()
  {
    this.state = {
      "imageAddr":"http://www.frycode.com/speed-test.jpg",
      "result" : "",
      "testing":false,
      "status":""
    }
  }

  InitiateSpeedDetection()
  {
    this.setState({"result" : ""});
    setTimeout(this.MeasureConnectionSpeed(), 1);
  };

  MeasureConnectionSpeed()
  {
    var startTime, endTime;
    var download = new Image();
    var that = this;
    download.onload = function ()
    {
        endTime = (new Date()).getTime();
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = 732000 * 8; //4995374
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        that.setState({"result" : "Your connection speed is "+speedMbps+" Mbps."});
        that.setState({"status" : "warning"});
        that.setState({"testing" : false});
    }

    download.onerror = function (err,msg)
    {
        that.setState({"result" : "There is no internet connection. Please check the network cables, modem, and router."});
        that.setState({"status" : "danger"});
        that.setState({"testing" : false});
    }

    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = this.state.imageAddr + cacheBuster;
  }

  onTest()
  {
    this.setState({"testing" : true});
    this.InitiateSpeedDetection();
  }

  getMsg()
  {
      if(this.state.result != "")
      {
        return (
          <p className={"alert alert-"+this.state.status}>{this.state.result}</p>
        );
      }
  }

  render()
  {
    return (
      <div>
        <div className={(this.state.testing?"pre-loader full":"")}></div>
        <p>A limited network speed test is available on our Test Page; for a fuller test of network capability, please visit Speedtest.net and run their diagnostic.

If you will be connecting to class from behind a firewall, or from a corporate environment, we strongly encourage running <span className="blue-text">GoToMyPCs</span> connection wizard, available Here. Please download the wizard follow the steps outlined Here to test your connectivity to <span className="blue-text">GoToMyPC.</span>

Finally, wireless internet connectivity is strongly discouraged as it will impact the quality of your classroom experience.</p>
        <p>In order for you to have a satisfactory classroom experience, we require a minimum connection capable of a sustained <span className="blue-text">1024Kbps</span> download speed and a <span className="blue-text">768Kbps</span> upload speed. Most broadband-type connections are capable of this speed, however some DSL providers may not be able to sustain transfer rates of this level. </p>
        <p>Click to run our network connectivity Test.</p>
        <br />
        <div className="text-center">
          {this.getMsg()}
          <a href="javascript:;" className="btn btn-primary btn-lg" onClick={()=> this.onTest()}>Start Test</a>
        </div>
      </div>
    );
  }
}

export default NetworkBandwidth;
