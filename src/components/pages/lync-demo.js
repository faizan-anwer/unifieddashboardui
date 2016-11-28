import React, { Component } from 'react';

class LyncDemo extends Component {

  render()
  {
    return (
      <div>
        <div className="model-content lync-demo">
          <p>Please be sure to go through our Lync setup questions. If you run into any issue during testing, please contact our support team at <a href="mailto:it.skills.helpdesk@360training.com">it.skills.helpdesk@360training.com</a> with the details of your issue, and a representative will respond shortly.</p>
          <div className="panel panel-default">
            <div className="panel-heading">
              1. Click on the following link to start:
            </div>
            <div className="panel-body">
              <u><a href="https://meet.qslive.com/qslive.demo/BMLJL4SC?sl=1" target="_blank">Click Here</a></u>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              2. Enter your name.
            </div>
            <div className="panel-body">
              <img className="lync-step-1" />

              <div className="alert alert-warning">
                <p>2.1 If this is your first time using Lync 2013’s Web application, make sure you have selected “Install Lync Web App plug-in”, then click “Join the meeting”</p>
                <hr />
                <p>2.2 Click "Run" allowing the Plug-in to install.<br /><img className="lync-step-2" /></p>
                <hr />
                <p>2.3 Click "Allow" giving plug-in permission to launch.<br /><img className="lync-step-3" /></p>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              3. You will be joined into the demo conference and your screen should look like the following.
            </div>
            <div className="panel-body">
              <img className="lync-step-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LyncDemo;
