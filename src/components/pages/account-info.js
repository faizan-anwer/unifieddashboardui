import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import InputField from '../helper/input-field';
import TextArea from '../helper/text-area';
import SelectList from '../helper/select-list';
import MultiSelect from '../helper/multi-select';
import CheckBox from '../helper/checkbox';
import RadioButton from '../helper/radio-button';
import Datetime from '../helper/date-time';

class AccountInfo extends Component {

  componentWillMount()
  {
    this.state = {
      "submitLabel":"Save",
      "submittion":false,
      "waiting":true,
      "canSave":true,

      "newPass":"",
      "verifyNewPass":"",
      "editPass":false,

      "passChecks":{
        "validPass":[0,0],
        "passMsg":["",""],
        "correctFormat":{
          "result":false,
          "msg":""
        }
      },

      "data":"",
      "backup":"",
      "validEmail":true,
      "isValid":[],

      "editPersonalInfo":false,
      "editAddress1":false,
      "editAddress2":false,
      "editVQuestion":false,
      "editCustomFields":false,
      "editReportFields":false
    }
    this.props.fetchUserInfo();
  }

  componentWillUnmount()
  {
    this.props.clearState("GET_USER_INFO");
    this.props.clearState("POST_USER_INFO");
    this.props.clearState("GET_COUNTRIES");
  }

  componentWillReceiveProps(nextProps)
  {
    //  GET SUBMITTION RESPONSE
    try {console.log(nextProps.postUserInfo.status);
      if(nextProps.postUserInfo.status == true)
      {
        let obj = this.state.at;
        obj.isValid = [];
        obj.validEmail = true;
        obj.canSave = true;
        obj.at = null;
        obj.submittion = false;
        obj.backup = JSON.parse(JSON.stringify(this.state.data));
        this.setState(obj);
        return;
      }
      else if(nextProps.postUserInfo.status == false)
      {
        let obj = {};
        obj.submittion = false;
        obj.submitLabel = "Please Try Again";
        this.setState(obj);
        return;
      }
    }
    catch (e){}

    //  GET INFO RESPONSE
    if(typeof nextProps.getUserInfo.personalInformation != 'undefined')
    {
      if(typeof nextProps.countries.country != 'undefined')
      {
         this.setState({"waiting":false});
      }
      else
      {
        this.setState({
          "data":JSON.parse(JSON.stringify(nextProps.getUserInfo)),
          "backup":JSON.parse(JSON.stringify(nextProps.getUserInfo))
        },function()
        {
          //  GET COUNTRY RESPONSE WHICH IS LOCAL
          this.props.getCountries();
        });
      }
    }
  }

  onSubmit(stateObj)
  {
    var key = "";
    for(var k in stateObj){key = k};

    let data = JSON.parse(JSON.stringify(this.state.data));
    let postObj = {};
    switch(key)
    {
      case "editPass":
        postObj = {"personalInformation":{"password":this.state.newPass}};
        break;
      case "editPersonalInfo":
        delete data.personalInformation.address1;
        delete data.personalInformation.address2;
        delete data.personalInformation.password;
        let timeZone = [];
        for(var key in data.personalInformation.timeZone)
        {
          if(data.personalInformation.timeZone[key]["selected"] == true)
          {
            timeZone = [data.personalInformation.timeZone[key]];
          }
        }
        data.personalInformation.timeZone = timeZone;

        postObj = {"personalInformation":data.personalInformation};
        break;
      case "editAddress1":
        postObj = {"personalInformation":{"address1":data.personalInformation.address1}};
        break;
      case "editAddress2":
        postObj = {"personalInformation":{"address2":data.personalInformation.address2}};
        break;
      case "editVQuestion":
        postObj = {"validationQuestions":data.validationQuestions};
        break;
      case "editCustomFields":
        for(var key in data.customFields)
        {
          let obj = data.customFields[key];
          if(obj.type == "SINGLESELECTCUSTOMFIELD"
          || obj.type == "SINGLESELECTCREDITREPORTINGFIELD"
          || obj.type == "MULTISELECTCUSTOMFIELD"
          || obj.type == "MULTISELECTCREDITREPORTINGFIELD")
          {
            let opt = [];
            for(var i in obj.options)
            {
              if(obj.options[i]["selected"] == true)
              {
                opt.push(obj.options[i]);
              }
            }
            obj.options = opt;
          }
        }
        postObj = {"customFields":data.customFields};
        break;
      case "editReportFields":
        for(var key in data.reportingFields)
        {
          let obj = data.reportingFields[key];
          if(obj.type == "SINGLESELECTCUSTOMFIELD"
          || obj.type == "SINGLESELECTCREDITREPORTINGFIELD"
          || obj.type == "MULTISELECTCUSTOMFIELD"
          || obj.type == "MULTISELECTCREDITREPORTINGFIELD")
          {
            let opt = [];
            for(var i in obj.options)
            {
              if(obj.options[i]["selected"] == true)
              {
                opt.push(obj.options[i]);
              }
            }
            obj.options = opt;
          }
        }
        postObj = {"reportingFields":data.reportingFields};
        break;
    }

    this.setState({"at":stateObj,"submittion":true},function()
    {
      //  API CALLING FOR SUBMITTION
      this.props.submitUserInfo(postObj);
    });
  }

  onCancel(stateObj)
  {
    var key = "";
    for(var k in stateObj){key = k};

    let data = JSON.parse(JSON.stringify(this.state.data));
    switch(key)
    {
      case "editPersonalInfo":
        data.personalInformation = JSON.parse(JSON.stringify(this.state.backup.personalInformation));
        data.personalInformation.address1 = JSON.parse(JSON.stringify(this.state.data.personalInformation.address1));
        data.personalInformation.address2 = JSON.parse(JSON.stringify(this.state.data.personalInformation.address2));
        break;
      case "editAddress1":
        data.personalInformation.address1 = JSON.parse(JSON.stringify(this.state.backup.personalInformation.address1));
        break;
      case "editAddress2":
        data.personalInformation.address2 = JSON.parse(JSON.stringify(this.state.backup.personalInformation.address2));
        break;
      case "editVQuestion":
        data.validationQuestions = JSON.parse(JSON.stringify(this.state.backup.validationQuestions));
        break;
      case "editCustomFields":
        data.customFields = JSON.parse(JSON.stringify(this.state.backup.customFields));
        break;
      case "editReportFields":
        data.reportingFields = JSON.parse(JSON.stringify(this.state.backup.reportingFields));
        break;
    }

    stateObj.isValid = [];
    stateObj.validEmail = true;
    stateObj.data = data;
    stateObj.canSave = true;
    stateObj.submitLabel = "Save";
    this.setState(stateObj);
  }

  validateEmail(value)
  {
    var x = value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
    {
        return false;
    }
    return true;
  }

  validatePass(value)
  {
    let x = value;
    let atpos = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (x.search(/[0-9]/) < 0)
    {
      return {"result":false,"msg":"Your Password Must Contain a Number"};
    }
    if (x.search(/[a-z]/i) < 0)
    {
      return {"result":false,"msg":"Your Password Must Contain a Letter"};
    }
    if (x.length < 8)
    {
        return {"result":false,"msg":"Your Password Must Have At Least 8 Characters"};
    }
    return {"result":true,"msg":""};
  }

  onChangePass(event)
  {
    let obj = {
      [event.target.name]:event.target.value,
      "passChecks":this.state.passChecks,
      "canSave":false
    };
    let cond = false;
    if (event.target.name == "newPass")
    {
      obj.passChecks.correctFormat = this.validatePass(event.target.value);
      cond = String(event.target.value) == String(this.state.verifyNewPass);
    }
    else if(event.target.name == "verifyNewPass")
    {
      cond = String(this.state.newPass) == String(event.target.value);
    }

    if(obj.passChecks.correctFormat.result)
    {
      obj.passChecks.passMsg[0] = "";
      obj.passChecks.validPass[0] = 1;
    }
    else
    {
      obj.passChecks.passMsg[0] = obj.passChecks.correctFormat.msg;
      obj.passChecks.validPass[0] = 0;
    }

    if(cond)
    {
      obj.passChecks.passMsg[1] = "";
      obj.passChecks.validPass[1] = 1;
    }
    else
    {
      obj.passChecks.passMsg[1] = "The Password You Entered Is Not Matching";
      obj.passChecks.validPass[1] = 0;
    }
    obj.canSave = (obj.passChecks.validPass[0]+obj.passChecks.validPass[1])==2;
    this.setState(obj);
  }

  onChangeInfo(event)
  {
    let pInfo = this.state.data.personalInformation;
    switch(event.target.name)
    {
      case "timeZone":
        this.singleSelect(pInfo.timeZone,event.target.value);
        break;
      default:
        pInfo[event.target.name] = event.target.value;
        break;
    }
    this.checkInfo(pInfo);
  }

  checkInfo(info)
  {
    this.state.validEmail = this.validateEmail(info.emailAddress);
    if(info.firstName != "" && info.lastName != "" && this.state.validEmail)
    {
      this.setState({"canSave":true});
    }
    else
    {
      this.setState({"canSave":false});
    }
  }

  onChangeAddress(id,event)
  {
    let pInfo = this.state.data.personalInformation;
    pInfo["address"+id][event.target.name] = event.target.value;
    this.checkAddress(pInfo["address"+id]);
  }

  checkAddress(address)
  {
    if(address.streetAddress != "" && address.state != "" && address.city != "")
    {
      this.setState({"canSave":true});
    }
    else
    {
      this.setState({"canSave":false});
    }
  }

  onChangeVQuestion(id,event)
  {
    let vQuestion = this.state.data.validationQuestions[id].questions;
    if(vQuestion[event.target.value]["text"] == "Select a question")
    {
      this.state.isValid[id][0] = 0;
    }
    else
    {
      this.state.isValid[id][0] = 1;
    }
    this.singleSelect(vQuestion,event.target.value);
    this.finalCheck();
  }

  onChangeAnswer(id,event)
  {
    this.state.data.validationQuestions[id].answer = event.target.value;
    if(event.target.value == "")
    {
      this.state.isValid[id][1] = 0;
    }
    else
    {
      this.state.isValid[id][1] = 1;
    }
    this.finalCheck();
  }

  finalCheck()
  {
    let arr = String(this.state.isValid).split("0,");
    this.state.canSave = (arr.length <= 1);
    this.setState();
  }

  onChangeCustomChecked(type,data,event)
  {
    let cField = this.state.data[type][data.i]["options"];
    switch(event.target.type)
    {
      case "radio":
        this.singleSelect(cField,event.target.value);
        break;
      case "checkbox":
        cField[event.target.value]["selected"] = event.target.checked;
        break;
    }
    this.setState();
  }

  onChangeCustomField(id,type,event)
  {
    let cField = this.state.data.customFields[id];
    switch(event.target.name)
    {
      default:
        cField[event.target.name] = event.target.value;
        if(event.target.required == true)
        {
          if(event.target.value == "")
          {
            this.state.isValid[id] = 0;
          }
          else
          {
            this.state.isValid[id] = 1;
          }
        }
        break;
    }
    this.finalCheck();
  }

  onChangeDatetime(id,type,event)
  {
    if(event._d != undefined)
    {
      this.state.data[type][id].text = event._d;
      this.setState();
    }
  }

  saveBtns(stateObj)
  {
    return (
      <ul className="list-inline">
        <li>
          <button onClick={() => this.onSubmit(stateObj)} disabled={!this.state.canSave} className="btn btn-default">{this.state.submitLabel}</button>
        </li>
        <li>
          <button onClick={() => this.onCancel(stateObj)} className="btn">Cancel</button>
        </li>
      </ul>
    );
  }

  editPassword()
  {
    if(this.state.editPass)
    {
      return(
        <div className="form-group">
          <div className="col-md-6">
            <div className="edit-section">
              <section className={(this.state.submittion?"pre-loader":"")}>
                <div className="form-group">
                  <div className="col-sm-12">
                    <InputField type="password" name="newPass" className="form-control"
                      required={true}
                      runtime={true}
                      maxLength={50}
                      autoComplete="off"
                      placeholder="New Password"
                      msg="Enter Your New Password"
                      value={this.state.newPass}
                      validate={{"result":this.state.passChecks.validPass[0]==1,"msg":this.state.passChecks.passMsg[0]}}
                      onChange={this.onChangePass.bind(this)}/>
                  </div>
                </div>
                <div className={"form-group"+(this.state.passChecks.validPass[0]==0?" hide":"")}>
                  <div className="col-sm-12">
                    <InputField type="password" name="verifyNewPass" className="form-control"
                      required={true}
                      runtime={true}
                      maxLength={50}
                      autoComplete="off"
                      placeholder="Verify New Password"
                      msg="Enter Verify New Password"
                      value={this.state.verifyNewPass}
                      validate={{"result":this.state.passChecks.validPass[1]==1,"msg":this.state.passChecks.passMsg[1]}}
                      onChange={this.onChangePass.bind(this)}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    {this.saveBtns({"editPass":false})}
                  </div>
                </div>
                <div className="close" onClick={() => this.onCancel({"editPass":false})}></div>
              </section>
            </div>
          </div>
        </div>
      );
    }
  }

  option(data,i)
  {
    return <option value={i} selected={data.selected}>{data.text}</option>;
  }

  countryOption(obj,data)
  {
    let isSelected = (this.state.data.personalInformation["address"+obj.id][obj.type] === data.code);
    return <option value={data.code} selected={isSelected}>{data.label}</option>;
  }

  viewStates(address,id)
  {
    if(this.props.countries.states[address["country"]] != undefined)
    {
      return (
        <SelectList placeholder="State" name="state" className="form-control"
          onChange={this.onChangeAddress.bind(this,id)}>
          {this.props.countries.states[address["country"]].map(this.countryOption.bind(this,{"id":id,"type":"state"}))}
        </SelectList>
      );
    }
    else
    {
      return (
        <InputField type="text" name="state" className="form-control"
          required={true}
          alert={true}
          placeholder="State"
          msg="Enter Your State"
          value={address["state"]}
          onChange={this.onChangeAddress.bind(this,id)}/>
      );
    }
  }

  viewSelected(data)
  {
    if(data.selected)
    {
      return <span>{data.text}</span>;
    }
  }

  singleSelect(obj,selectId)
  {
    for(var i in obj)
    {
      if(selectId === i)
      {
        obj[selectId]["selected"] = true;
      }
      else
      {
        obj[i]["selected"] = false;
      }
    }
  }

  editPersonalInfo()
  {
    if(this.state.editPersonalInfo)
    {
      return(
        <div className="edit-section">
          <section className={(this.state.submittion?"pre-loader":"")}>
            <div>
              <div className="form-group">
                <div className="col-md-4">
                  <InputField type="text" name="firstName" className="form-control"
                    required={true}
                    alert={true}
                    placeholder="First Name"
                    msg="Enter Your First Name"
                    value={this.state.data.personalInformation.firstName}
                    onChange={this.onChangeInfo.bind(this)}/>
                </div>
                <div className="col-md-4">
                  <InputField type="text" name="middleName" className="form-control"
                    placeholder="Middle Name"
                    msg="Enter Your Middle Name"
                    value={this.state.data.personalInformation.middleName}
                    onChange={this.onChangeInfo.bind(this)}/>
                </div>
                <div className="col-md-4">
                  <InputField type="text" name="lastName" className="form-control"
                    required={true}
                    alert={true}
                    placeholder="Last Name"
                    msg="Enter Your Last Name"
                    value={this.state.data.personalInformation.lastName}
                    onChange={this.onChangeInfo.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-4">
                  <InputField type="text" name="phone" className="form-control"
                    placeholder="Phone Number"
                    msg="Enter Your Phone Number"
                    value={this.state.data.personalInformation.phone}
                    onChange={this.onChangeInfo.bind(this)}/>
                </div>
                <div className="col-md-4">
                  <InputField type="text" name="officePhone" className="form-control"
                    placeholder="Office Phone Number"
                    msg="Enter Your Office Phone Number"
                    value={this.state.data.personalInformation.officePhone}
                    onChange={this.onChangeInfo.bind(this)}/>
                </div>
                <div className="col-md-4">
                  <InputField type="text" name="officeExtension" className="form-control"
                    placeholder="Office Phone Extension"
                    msg="Enter Your Office Phone Entension"
                    value={this.state.data.personalInformation.officeExtension}
                    onChange={this.onChangeInfo.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <InputField type="text" name="emailAddress" className="form-control"
                    required={true}
                    runtime={true}
                    alert={true}
                    placeholder="Email Address"
                    msg="Enter Your Email Address"
                    value={this.state.data.personalInformation.emailAddress}
                    validate={{"result":this.state.validEmail,"msg":"Please Enter Valid Email Address"}}
                    onChange={this.onChangeInfo.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <SelectList placeholder="Preferred Time Zone" name="timeZone" className="form-control"
                    onChange={this.onChangeInfo.bind(this)}>
                    {this.state.data.personalInformation.timeZone.map(this.option)}
                  </SelectList>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  {this.saveBtns({"editPersonalInfo":false})}
                </div>
              </div>
            </div>
            <div className="close" onClick={() => this.onCancel({"editPersonalInfo":false})}></div>
          </section>
        </div>
      );
    }
  }

  viewPersonalInfo()
  {
    return(
      <div className="form-group">
        <div className="col-lg-8">
          <div className="form-group interactive" title="Change Your Personal Information?" onClick={() => this.setState({"editPersonalInfo":true})}>
            <div className="col-sm-6">
              <p><span className="blue-text">Full Name</span><br/>{this.state.data.personalInformation.firstName} {this.state.data.personalInformation.middleName} {this.state.data.personalInformation.lastName}</p>
              <p><span className="blue-text">Email Address</span><br/>{this.state.data.personalInformation.emailAddress}</p>
              <p><span className="blue-text">Preferred Time Zone</span><br/>{this.state.data.personalInformation.timeZone.map(this.viewSelected)}</p>
            </div>
            <div className="col-sm-6">
              <p><span className="blue-text">Phone Number</span><br/>{(this.state.data.personalInformation.phone!=""?this.state.data.personalInformation.phone:"N/A")}</p>
              <p><span className="blue-text">Office Phone Number</span><br/>{(this.state.data.personalInformation.officePhone!=""?this.state.data.personalInformation.officePhone:"N/A")}</p>
              <p><span className="blue-text">Office Phone Extension</span><br/>{(this.state.data.personalInformation.officeExtension!=""?this.state.data.personalInformation.officePhone:"N/A")}</p>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              {this.editAddress(1)}
              {this.viewAddress(1)}
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              {this.editAddress(2)}
              {this.viewAddress(2)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  editAddress(id)
  {
    let address = this.state.data.personalInformation["address"+id];
    if(this.state["editAddress"+id])
    {
      return(
        <div className="edit-section">
          <section className={(this.state.submittion?"pre-loader":"")}>
              <div className="form-group">
                <div className="col-md-12">
                  <TextArea name="streetAddress" className="form-control"
                    required={true}
                    alert={true}
                    placeholder="Street Address"
                    msg="Enter Your Address"
                    value={address["streetAddress"]}
                    onChange={this.onChangeAddress.bind(this,id)}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-6">
                  <SelectList placeholder="Country" name="country" className="form-control"
                    onChange={this.onChangeAddress.bind(this,id)}>
                    {this.props.countries.country.map(this.countryOption.bind(this,{"id":id,"type":"country"}))}
                  </SelectList>
                </div>
                <div className="col-md-6">
                  {this.viewStates(address,id)}
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-6">
                  <InputField type="text" name="city" className="form-control"
                    required={true}
                    alert={true}
                    placeholder="City"
                    msg="Enter Your City"
                    value={address["city"]}
                    onChange={this.onChangeAddress.bind(this,id)}/>
                </div>
                <div className="col-md-6">
                  <InputField type="text" name="zipCode" className="form-control"
                    placeholder="Zip / Postal Code"
                    msg="Enter Your Zip Code"
                    value={address["zipCode"]}
                    onChange={this.onChangeAddress.bind(this,id)}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  {this.saveBtns({["editAddress"+id]:false})}
                </div>
              </div>
              <div className="close" onClick={() => this.onCancel({["editAddress"+id]:false})}></div>
          </section>
        </div>
      );
    }
  }

  viewAddress(id)
  {
    let address = this.state.data.personalInformation["address"+id];
    return (
      <div>
        <div className="well-2 animated-input up interactive" title={"Change Your Address "+id+"?"} onClick={() => this.setState({["editAddress"+id]:true})} data-placeholder={"Address "+id}>
          <div className="form-group">
            <div className="col-sm-12">
              {address["streetAddress"]},
              <br />
              {address["city"]}, {address["state"]},
              <br />
              {address["country"]}, {address["zipCode"]}
            </div>
          </div>
        </div>
        <div className="edit-btn">
          <a href="javascript:;" onClick={() => this.setState({["editAddress"+id]:true})}><i className="glyphicon glyphicon-edit"></i> Change Address {id}</a>
        </div>
      </div>
    );
  }

  emailAndPassword()
  {
    let initObj = {
      "editPass":true,
      "newPass":"",
      "verifyNewPass":"",
      "canSave":false,
      "passChecks":{
        "validPass":[0,0],
        "passMsg":["",""],
        "correctFormat":{
          "result":false,
          "msg":""
        }
      }
    };

    return(
      <div>
        <h4>Username and Password</h4>
        <p className="help-block">This is your main account information for purchasing courses and your account with 360training.com. Information here does not affect your 360Engage profile.</p>
        <br/>
        <div className="form-body form-horizontal">
          <div className="form-group">
            <div className="col-md-6">
              <div className="well-2 animated-input up" data-placeholder="Email">
                {this.state.data.personalInformation.userName}
              </div>
            </div>
          </div>
          {this.editPassword()}
          <div className="form-group">
            <div className="col-md-6">
              <div className="well-2 animated-input up interactive text-muted" data-placeholder="Password"
              title="Change Your Password?"
              onClick={() => this.setState(initObj)}>
                ********
              </div>
              <div className="edit-btn">
                <a href="javascript:;" onClick={() => this.setState(initObj)}><i className="glyphicon glyphicon-edit"></i> Change Password</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  personalInfo()
  {
    return (
      <div>
        <h4>Personal Information - <small><a href="javascript:;" onClick={() => this.setState({"editPersonalInfo":true})}><i className="glyphicon glyphicon-edit"></i> Edit</a></small></h4>
        <p className="help-block">Below you may update your profile. Update the fields you wish to change and click on the 'Save' button to save your changes</p>
        <div className="form-body form-horizontal">
          <div className="row">
            <div className="col-lg-8">
              {this.editPersonalInfo()}
              {this.viewPersonalInfo()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  editValidationQuestion()
  {
    if(this.state.editVQuestion)
    {
      return(
        <div className="edit-section">
          <section className={(this.state.submittion?"pre-loader":"")}>
            {this.state.data.validationQuestions.map(this.editQuestion,this)}
            <div className="form-group">
              <div className="col-sm-12">
                {this.saveBtns({"editVQuestion":false})}
              </div>
            </div>
            <div className="close" onClick={() => this.onCancel({"editVQuestion":false})}></div>
          </section>
        </div>
      );
    }
  }

  viewValidationQuestion()
  {
    return(
      <div className="interactive" title="Change Your Validation Information?" onClick={() => this.setState({"editVQuestion":true})}>
        {this.state.data.validationQuestions.map(this.viewQuestion,this)}
      </div>
    );
  }

  editQuestion(data,i)
  {
    this.initValidation(i,[1,(data.answer==""?0:1)]);

    return(
      <div key={i} className="form-group">
        <div className="col-sm-6">
          <SelectList placeholder={"Question "+(i+1)} name={"questions"} className="form-control"
            validate={{"result":this.state.isValid[i][0]==1}}
            onChange={this.onChangeVQuestion.bind(this,i)}>
            {data.questions.map(this.option)}
          </SelectList>
        </div>
        <div className="col-sm-6">
          <InputField type="password" name={"a"+i} className="form-control"
            required={true}
            runtime={true}
            alert={true}
            placeholder="Your Answer"
            msg="Enter Your Answer"
            value={data.answer}
            onChange={this.onChangeAnswer.bind(this,i)}/>
        </div>
      </div>
    );
  }

  viewQuestion(data,i)
  {
    return(
      <div key={i} className="form-group">
        <div className="col-sm-6">
          {i+1}. <span className="blue-text">{data.questions.map(this.viewSelected)}</span>
        </div>
        <div className="col-sm-6">
          {(data.answer!=""?"*****":"N/A")}
        </div>
      </div>
    );
  }

  validationQuestions()
  {
    if(this.state.data.validationQuestions.length != 0)
    {
      return(
        <div>
          <h4>Validation Information - <small><a href="javascript:;" onClick={() => this.setState({"editVQuestion":true})}><i className="glyphicon glyphicon-edit"></i> Edit</a></small></h4>
          <p className="help-block">Some courses require you to respond to validation questions. Please select a question from each of the following dropdowns and respond to that question.</p>
          <div className="form-body form-horizontal ques-and-ans">
            <div className="form-group">
              <div className="col-lg-9">
                {this.editValidationQuestion()}
                {this.viewValidationQuestion()}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  initValidation(i,val)
  {
    if(this.state.isValid[i] == undefined)
    {
      //  Run Only FIrst Time
      this.state.isValid[i] = val;
      let arr = String(val).split("0");
      if(arr.length > 1)
      {
        this.state.canSave = false;
      }
    }
  }

  editFields(type,data,i)
  {
    let cases;
    if(data.type == "DATETIMECUSTOMFIELD" || data.type == "DATETIMECREDITREPORTINGFIELD"){cases = "DATE"}
    if(data.type == "NUMERICCUSTOMFIELD" || data.type == "NUMERICCREDITREPORTINGFIELD"){cases = "NUMERIC"}
    if(data.type == "SSNCUSTOMFIELD" || data.type == "SSNCREDITREPORTINGFIELD"){cases = "SSN"}
    if(data.type == "SINGLELINETEXTCUSTOMFIELD" || data.type == "SINGLELINETEXTCREDITREPORTINGFIELD"){cases = "INPUTTEXT"}
    if(data.type == "MULTIPLELINETEXTCUSTOMFIELD" || data.type == "MULTIPLELINETEXTCREDITREPORTINGFIELD"){cases = "TEXTAREA"}
    if(data.type == "SINGLESELECTCUSTOMFIELD" || data.type == "SINGLESELECTCREDITREPORTINGFIELD"){cases = "SINGLESELECT"}
    if(data.type == "MULTISELECTCUSTOMFIELD" || data.type == "MULTISELECTCREDITREPORTINGFIELD"){cases = "MULTISELECT"}

    //STATICCREDITREPORTINGFIELD
    if(!data.required || data.type == "MULTISELECT" || data.type == "SINGLESELECT")
    {
      this.initValidation(i,1);
    }
    else
    {
      this.initValidation(i,(data.text==""?0:1));
    }

    switch(cases)
    {
      case "DATE":
        return(
          <div className="form-group">
            <div className="col-lg-12">
              <Datetime
                required={data.required}
                placeholder={data.label}
                msg={"Enter "+data.label}
                value={data.text}
                onChange={this.onChangeDatetime.bind(this,i,type)}
                />
            </div>
          </div>
        );
        break;
      case "NUMERIC":
        return(
          <div className="form-group">
            <div className="col-lg-12">
              <InputField type={(data.encrypted?"password":"number")} name="text" className="form-control"
                required={data.required}
                alert={data.required}
                placeholder={data.label}
                msg={"Enter "+data.label}
                value={data.text}
                onChange={this.onChangeCustomField.bind(this,i,type)}/>
            </div>
          </div>
        );
        break;
      case "SSN":
        return(
          <div className="form-group">
            <div className="col-lg-12">
              <InputField type={(data.encrypted?"password":"text")} name="text" className="form-control"
                maxLength={11}
                required={data.required}
                alert={data.required}
                placeholder={data.label}
                msg={"Enter "+data.label}
                value={data.text}
                onChange={this.onChangeCustomField.bind(this,i,type)}/>
            </div>
          </div>
        );
        break;
      case "INPUTTEXT":
        return(
          <div className="form-group">
            <div className="col-lg-12">
              <InputField type={(data.encrypted?"password":"text")} name="text" className="form-control"
                required={data.required}
                alert={data.required}
                placeholder={data.label}
                msg={"Enter "+data.label}
                value={data.text}
                onChange={this.onChangeCustomField.bind(this,i,type)}/>
            </div>
          </div>
        );
        break;
      case "TEXTAREA":
        return(
          <div className="form-group">
            <div className="col-lg-12">
              <TextArea name="text" className="form-control"
                required={data.required}
                alert={data.required}
                placeholder={data.label}
                msg={"Enter "+data.label}
                value={data.text}
                onChange={this.onChangeCustomField.bind(this,i,type)}/>
            </div>
          </div>
        );
        break;
      case "SINGLESELECT":
        return (
          <div className="form-group">
            <div className="col-lg-12">
              <RadioButton placeholder={data.label}
                required={data.required}
                data={{"i":i}}
                align={data.alignment}
                options={data.options}
                onChange={this.onChangeCustomChecked.bind(this,type)} />
            </div>
          </div>
        );
        break;
      case "MULTISELECT":
        if(data.checkBox)
        {
          return (
            <div className="form-group">
              <div className="col-lg-12">
                <CheckBox placeholder={data.label}
                  data={{"i":i}}
                  align={data.alignment}
                  options={data.options}
                  onChange={this.onChangeCustomChecked.bind(this,type)} />
              </div>
            </div>
          );
        }
        else
        {
          return (
            <div className="form-group">
              <div className="col-lg-12">
                <MultiSelect placeholder={data.label}
                  data={{"i":i}}
                  options={data.options}
                  onChange={this.onChangeCustomChecked.bind(this,type)} />
              </div>
            </div>
          );
        }
        break;
      case "TELEPHONENUMBERCREDITREPORTINGFIELD":
        return(
          <div className="form-group">
            <div className="col-lg-12">
              <InputField type={(data.encrypted?"password":"number")} name="text" className="form-control"
                required={data.required}
                alert={data.required}
                placeholder={data.label}
                msg={"Enter "+data.label}
                value={data.text}
                onChange={this.onChangeCustomField.bind(this,i,type)}/>
            </div>
          </div>
        );
        break;
    }
  }

  viewFields(data,i)
  {
    return(
      <div key={i} className="col-sm-3">
        <p>
          <span className="custom-field">{data.label}</span>
        </p>
      </div>
    );
  }

  editDynamicFields(editType,property)
  {
    if(this.state[editType])
    {
      return(
        <div className="edit-section">
          <section className={(this.state.submittion?"pre-loader":"")}>
            {this.state.data[property].map(this.editFields.bind(this,property))}
            <div className="form-group">
              <div className="col-sm-12">
                {this.saveBtns({[editType]:false})}
              </div>
            </div>
            <div className="close" onClick={() => this.onCancel({[editType]:false})}></div>
          </section>
        </div>
      );
    }
  }

  viewDynamicFields(editType,property)
  {
    return(
      <div className="row interactive" onClick={() => this.setState({[editType]:true})}>
        {this.state.data[property].map(this.viewFields,this)}
      </div>
    );
  }

  customFields()
  {
    if(this.state.data.customFields.length != 0)
    {
      return(
        <div>
          <h4>Custom Fields - <small><a href="javascript:;" onClick={() => this.setState({"editCustomFields":true})}><i className="glyphicon glyphicon-edit"></i> Edit</a></small></h4>
          <div className="form-body form-horizontal">
            <div className="form-group">
              <div className="col-sm-8">
                {this.editDynamicFields("editCustomFields","customFields")}
                {this.viewDynamicFields("editCustomFields","customFields")}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  reportFields()
  {
    if(this.state.data.reportingFields.length != 0)
    {
      return(
        <div>
          <h4>Reporting Fields - <small><a href="javascript:;" onClick={() => this.setState({"editReportFields":true})}><i className="glyphicon glyphicon-edit"></i> Edit</a></small></h4>
          <div className="form-body form-horizontal">
            <div className="form-group">
              <div className="col-lg-8">
                {this.editDynamicFields("editReportFields","reportingFields")}
                {this.viewDynamicFields("editReportFields","reportingFields")}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  allSections()
  {
    if(this.state.waiting)
    {
      return (<div className="full pre-loader"></div>);
    }
    else
    {
      return (
        <div>
          {this.emailAndPassword()}
          {this.personalInfo()}
          {this.validationQuestions()}
          {this.customFields()}
          {this.reportFields()}
        </div>
      );
    }
  }

  render()
  {
    return (
      <div className="acct-info">
        <h1 className="page-heading">Account Information</h1>
        {this.allSections()}
      </div>
    );
  }
}

function mapStatToProps(state)
{
    return({
      "getUserInfo":state.getUserInfo,
      "postUserInfo":state.postUserInfo,
      "countries":state.countries
    });
}

export default connect(mapStatToProps,actions)(AccountInfo);
