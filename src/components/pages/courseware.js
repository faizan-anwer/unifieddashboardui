import React, { Component } from 'react';

class Courseware extends Component {

  render()
  {
    return (
      <div>
        <div>
          <p>In most cases QSLive students will receive courseware electronically by the Friday before class. Training facilities students will receive courseware upon arrival at our facilities on class start date.</p>
          <p>If attending via QSLive you should receive an e-mail from courseware.marketplace@arvato.com containing a link to the new Skillpipe Reader via the Courseware Marketplace site, where you will be able to access your courseware.</p>
          <p>Please keep an eye on your junk mail as it is auto generated and often flagged as spam. If your course is not using dMOC (Digital Microsoft Official Courseware), you will receive the printed version of your courseware via postal mail.</p>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            1. Open Skillpipe
          </div>
          <div className="panel-body">
            <strong>Open the microsoft skillpipe tool by navigating to</strong> <u><a href="https://skillpipe.courseware-marketplace.com/reader/en-GB/Account/Login?ReturnUrl=%2Freader%2F" target="_blank">Skillpipe</a>.</u>
            <br/>
            <small>(Once open, drag the new window to your secondary monitor)</small>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            2. Register or Sign In to Skillpipe
          </div>
          <div className="panel-body">
            <strong>Log into skillpipe or create your account by following the instructions below:</strong>
            <br />
            <small>(This is a new account <span><u>not associated</u></span> with your my.quickstart account. You only need to create this account one time and will have access to all your Skillpipe courseware.)</small>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            3. Register for a Skillpipe Account
          </div>
          <div className="panel-body">
              <ol>
                <li><u><a href="https://skillpipe.courseware-marketplace.com/reader/en-GB/Account/Register" target="_blank">Click here</a></u> to register now.</li>
                <li>
                  <p>Use an email address that you can access now. You will receive a confirmation email and you must open this email to confirm your registration.</p>
                  <div className="alert alert-warning">
                      <strong>Suggested Address that work:</strong>
                      <ul>
                        <li>OWA (Outlook via web access).</li>
                        <li>@hotmail.com, @live.com, @gmail.com, @yahoo.com</li>
                        <li>Any email you can access on a handheld device, such as windows phone, blackberry, i-device, etc.</li>
                      </ul>
                      <br />
                      <strong>Examples of address that will not work for registration in an off-site training center:</strong>
                      <ul>
                        <li>Government email addresses (not accessible outside of work).</li>
                        <li>@comcast.net (blocks emails from arvato).</li>
                        <li>Some school addresses (not accessible from outside of school).</li>
                      </ul>
                  </div>
                </li>
                <li>Click <strong>Register</strong> button.</li>
                <li>Complete registration: Go to your email and look for confirmation email.</li>
                <li>
                  <p>Click <strong>Activate Account</strong> in confirmation email.</p>
                  <div className="alert alert-warning">
                    <strong>Troubleshoot</strong>
                    <ul>
                      <li>
                        Cannot access your email?
                        <ol>
                          <li>Please register again with a different email address.</li>
                        </ol>
                      </li>
                      <li>
                        Did not receive the activation email?
                        <ol>
                          <li>Check your junk email folder.</li>
                          <li>Try to register again to confirm email address was typed correctly.</li>
                          <li>Contact customer support: <br />
                            English +1 855 507-6283</li>
                        </ol>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>Registration is complete. Please login.</li>
                <li>Click on <strong>Add Book</strong> button.</li>
                <li>Enter license code to register digital book.</li>
              </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Courseware;
