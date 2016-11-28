import React, { Component } from 'react';

class LabDemo extends Component {
  render()
  {
    return (
      <div>
          <p>Connect to a demonstration machine to ensure your system can use GoToMyPC.<br />Please Note, Your browsers dialog boxes may differ slightly from the following steps.</p>
          <ol>
              <li>Click on the following link to start: <u><a href="https://www.gotomypc.com/login" target="_blank">Click Here</a></u></li>
              <li><p>On the login screen, enter the following e-mail address and password and click <strong>Continue</strong> button.</p>
                  <div className="well">
                    Email Address: <strong>QSLiveTest@qslive.com</strong>
                    <br />
                    Password: <strong>Q$Live2011</strong>
                  </div>
              </li>
              <li>Find the machine labeled <strong>GoToMyPC_Test</strong>.</li>
              <li>Click the <strong>Connect</strong> button.</li>
              <li>GoToMyPC will ask to install the GoToMyPC viewer please click <strong>Yes</strong> or <strong>Accept</strong> to continue with the default setup.</li>
              <li><p>On the "Enter Access Code" dialog box please enter the following access code and click <strong>OK.</strong></p>
                  <div className="well">Access code: <strong>Q$Live2011</strong></div>
              </li>
              <li>Once connected you should see a <strong>Locked desktop</strong> displaying a connection successful page at this point this concludes this portion of the test. Please close all open GoToMyPC windows.</li>
          </ol>
      </div>
    );
  }
}

export default LabDemo;
