import React, { Component } from 'react';

class CheckYourSystem extends Component {

  componentWillMount()
  {
    this.state = {
      "tabIndex":0
    }
  }

  clickOnTab(i)
  {
    this.setState({"tabIndex":i});
  }

  checkActiveTab(i)
  {
    return (this.state.tabIndex==i?"active":"");
  }

  render()
  {
    return (
      <div>
        <p>360training.com has recommended the minimum system requirements for optimal classroom experience. From time to time the recommended minimum system requirements may change to help improve software performance while complying with operating system updates. As updates are made to our system, some minimum system requirement updates may occur.</p>
        <ul className="nav nav-tabs-equally">
          <li className={this.checkActiveTab(0)}><a href="javascript:;" onClick={() => this.clickOnTab(0)}>Windows OS</a></li>
          <li className={this.checkActiveTab(1)}><a href="javascript:;" onClick={() => this.clickOnTab(1)}>Mac OS</a></li>
        </ul>
        <div className="tab-content">
          <div className={"tab-pane "+this.checkActiveTab(0)}>
            <table className="table table-striped gray-head">
               <thead>
                 <tr>
                   <th width="50%">Component</th>
                   <th>Minimum Requirement</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>Operating System</td>
                   <td>Windows 7 Or Higher</td>
                 </tr>
                 <tr>
                     <td>Processor/CPU</td>
                     <td>Dual Core 1.9 GHz processor or higher for Standard Video; Quad Core 2.0 GHz or higher for High Definition</td>
                 </tr>
                 <tr>
                     <td>Memory</td>
                     <td>2 gigabytes (GB) of RAM</td>
                 </tr>
                 <tr>
                     <td>Graphics Hardware</td>
                     <td>128 MB of graphics memory</td>
                 </tr>
                 <tr>
                     <td>Display Resolution</td>
                     <td>1024x768 or Greater</td>
                 </tr>
                 <tr>
                     <td>Display</td>
                     <td>While not required, we do wish to note that you will be working with multiple windows and environments during training. Dual-Monitor workstations are strongly encouraged to provide a satisfactory experience.</td>
                 </tr>
                 <tr>
                   <td>Web Browser</td>
                   <td>Suggested: Internet Explorer 10 or above. Or one of these supported combinations: http://technet.microsoft.com/en-us/library/gg425820.aspx</td>
                 </tr>
                 <tr>
                     <td>Communication</td>
                     <td>USB Headset with microphone, or equivalent audio device with built-in noise cancellation</td>
                 </tr>
                 <tr>
                     <td>Installation / Software</td>
                     <td>
                         User-level installation rights are required
                         Microsoft Silverlight browser plug-in version 4.0 (installed automatically during setup, if not present already)
                         Additionally, some antivirus providers require exceptions be enabled for full functionality of Lync. Please check with your antivirus software provider.
                     </td>
                 </tr>
               </tbody>
            </table>
          </div>
          <div className={"tab-pane "+this.checkActiveTab(1)}>
            <table className="table table-striped gray-head">
               <thead>
                 <tr>
                   <th width="50%">Component</th>
                   <th>Minimum Requirement</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>Operating System</td>
                   <td>Max OSX 10 Or Higher</td>
                 </tr>
                 <tr>
                     <td>Processor/CPU</td>
                     <td>Dual Core 1.9 GHz processor or higher for Standard Video; Quad Core 2.0 GHz or higher for High Definition</td>
                 </tr>
                 <tr>
                     <td>Memory</td>
                     <td>2 gigabytes (GB) of RAM</td>
                 </tr>
                 <tr>
                     <td>Graphics Hardware</td>
                     <td>128 MB of graphics memory</td>
                 </tr>
                 <tr>
                     <td>Display Resolution</td>
                     <td>1024x768 or Greater</td>
                 </tr>
                 <tr>
                     <td>Display</td>
                     <td>While not required, we do wish to note that you will be working with multiple windows and environments during training. Dual-Monitor workstations are strongly encouraged to provide a satisfactory experience.</td>
                 </tr>
                 <tr>
                   <td>Web Browser</td>
                   <td>Suggested: Latest version of Google Chrome, Firefox, or Safari</td>
                 </tr>
                 <tr>
                     <td>Communication</td>
                     <td>USB Headset with microphone, or equivalent audio device with built-in noise cancellation</td>
                 </tr>
                 <tr>
                     <td>Installation / Software</td>
                     <td>
                         User-level installation rights are required
                         Microsoft Silverlight browser plug-in version 4.0 (installed automatically during setup, if not present already)
                     </td>
                 </tr>
               </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckYourSystem;
