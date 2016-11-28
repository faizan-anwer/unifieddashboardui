import React, { Component } from 'react';

class InternetSpeedTest extends Component {

  componentWillMount()
  {
    this.state = {
      "imageAddr":"http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg",
      "msg" : "",
      "speedBps":0,
      "speedKbps":0,
      "speedMbps":0
    }
  }
  // componentWillUnmount()
  // {
  //   if (window.removeEventListener) {
  //       window.removeEventListener('load', this.InitiateSpeedDetection(), false);
  //   } else if (window.detachEvent) {
  //       window.detachEvent('onload', this.InitiateSpeedDetection());
  //   }
  // }
  ShowProgressMessage(msg)
  {
      if (console) {
          if (typeof msg == "string") {
              console.log(msg);
          } else {
              for (var i = 0; i < msg.length; i++) {
                  console.log(msg[i]);
              }
          }
      }

      //var oProgress = document.getElementById("progress");
      //if (oProgress) {
          this.setState(
          {
            "msg" : (typeof msg == "string") ? msg : msg.join("<br />")
          });
          //oProgress.innerHTML = actualHTML;
      //}
  }
  InitiateSpeedDetection()
  {
    this.ShowProgressMessage("Loading the image, please wait...");
    setTimeout(this.MeasureConnectionSpeed(), 1);
  };

  MeasureConnectionSpeed()
  {
    var startTime, endTime;
    var download = new Image();
    var that = this;
    download.onload = function () {
        endTime = (new Date()).getTime();
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = 4995374 * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);

        that.ShowProgressMessage([
            "Your connection speed is:",
            speedBps + " bps",
            speedKbps + " kbps",
            speedMbps + " Mbps"
        ]);
    }

    download.onerror = function (err, msg) {
        this.ShowProgressMessage("Invalid image, or error downloading");
    }

    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = this.state.imageAddr + cacheBuster;

  }

  onTest()
  {
    this.InitiateSpeedDetection();
    // if (window.addEventListener) {
    //     window.addEventListener('load', this.InitiateSpeedDetection(), false);
    // } else if (window.attachEvent) {
    //     window.attachEvent('onload', this.InitiateSpeedDetection());
    // }
  }
  render()
  {
    return (
      <div>
        <a href="#" onClick={()=> this.onTest()} className="button btncolor">TEST!</a>
        {this.state.msg}
      </div>
    );
  }
}

export default InternetSpeedTest;
