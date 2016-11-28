import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import InputField from '../helper/input-field';
import SelectList from '../helper/select-list';

class Enrollment extends Component {

  componentWillMount()
  {
    if(this.props.data.courseType == "Virtual Classroom")
    {
      //  Classroom
      this.state = {
        "valid":false,
        "classAvailable":false,
        "seeMore":true,
        "waiting":true,
        "firstName":"",
        "lastName":"",
        "emailAddress":"",
        "isValidEmail":false,
        "locationName":"",
        "stateDate":"",
        "className":"",
        "agreed":false,
        "locationId":0
      }
      this.props.getSubsClassLocations({"courseGuid":this.props.data.courseGUID});
    }
    else
    {
      //  Online and Other Course type
      this.state = {
        "valid":true,
        "seeMore":true,
        "waiting":false
      }
    }
  }

  componentWillUnmount()
  {
    this.props.clearState("ENROLL_SUBS_COURSE");
    this.props.clearState("ENROLL_SUBS_CLASS");
    this.props.clearState("SUBS_CLASS_LOCATIONS");
  }

  courseLaunch(path)
  {
    window.open(path,"Course Launching", "width=800,height=600,toolbar=no");
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.data.courseType == "Virtual Classroom")
    {
      //  Classroom
      if(nextProps.classEnroll.status != undefined)
      {
        //  After Enrollment
        if(nextProps.classEnroll.status)
        {
          //  Email Successfully Send
          this.props.setCurrentEnrollments(this.props.currentEnrollments+1);
          this.props.popover({
            "visible":true,
            "closeBtn":true,
            "pos":"right",
            "css":{
              "top":'15px',
              "left":(this.props.leftMenuOpen?'200px':'50px')
            },
            "title":"Done! You're Enrollment Request Has Been Send.",
            "content":"Your dashboard has all of your enrolled courses. Go there to start your course. Or continue browsing your subscription."
          });
          this.props.getModal({"visible":false});
        }
        else
        {
          //  Email Has Not Send
          //  Need to get Story on Fail
        }
      }
      else
      {
        //  Before Enrollment Run only First time
      }
      this.setState({"waiting": false});
    }
    else
    {
      //  Online and Other Course type
      if(nextProps.courseEnroll.enrollmentId != null)
      {
        //  Enrollment Successfully Done
        this.props.setCurrentEnrollments(this.props.currentEnrollments+1);
        this.props.popover({
          "visible":true,
          "closeBtn":true,
          "pos":"right",
          "css":{
            "top":'40px',
            "left":(this.props.leftMenuOpen?'200px':'50px')
          },
          "title":"Done! You're Enrolled.",
          "content":"Your dashboard has all of your enrolled courses. Go there to start your course. Or continue browsing your subscription."
        });

        this.props.afterEnroll(nextProps.courseEnroll.launchURL,this.props.data.i);
        this.courseLaunch(this.props.data.launchURI+"&token="+localStorage.auth+"&courseId="+this.props.data.courseGUID);
        this.props.getModal({"visible":false});
      }
      else
      {
        //  Enrollment Failed
        //  Need to get Story on Fail
      }
      this.setState({"waiting": false});
    }
  }

  image(data)
  {
    var img = data.thumbnail;
    if(img == "" || img == "null" || img == null)
    {
      switch(data.courseType)
      {
        case "On Demand":
          img = "online";
        break;
        case "Virtual Classroom":
          img = "classroom";
        break;
        case "Print-Based":
          img = "online";
        break;
      }
      return <div className={"iso-image " +img}></div>
    }
    else
    {
      return <div className="iso-image" style={{backgroundImage: 'url('+img+')'}}></div>
    }
  }

  item(label,value,unit)
  {
    if(value == "")
    {
        return;
    }
    if(label == "Duration")
    {
        let val = value.split("*");
        value = val[0] + " " + unit;
    }
    return <li><strong>{label}</strong> {value}</li>;
  }

  starRating(rate)
  {
    //  Business Login ---------------
    if(rate <= 2.5)
    {
      rate = 0;
    }
    let num = rate.toString().split(".");
    if(num[1] > 5)
    {
      rate = Math.round(rate);
    }
    else if(num[1] >= 1)
    {
      rate = num[0]+".5";
    }
    //  ------------------------------

    num = rate.toString().split(".");
    let stars = [], at = ["empty",false];
    for(let f=0;f<5;f++)
    {
      (num[0]>f?at[0] = "full":(num[1]>=5 && !at[1]?at = ["half",true]:at[0] = "empty"));
      stars.push(<i className={"star "+at[0]}></i>);
    }
    return stars;
  }

  dateConverion(stamp,withTime)
  {
    if(stamp != null)
    {
       stamp = stamp.split("T");
       var monthNames = ["January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"
       ];

        var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var sDate = new Date(stamp[0]);
        sDate = monthShortNames[sDate.getMonth()]+' '+sDate.getDate()+', '+sDate.getFullYear();

        if(!withTime)
        {
          return sDate;
        }

        var ext;
        var sTime = String(stamp[1]).split(":");
        if(sTime[0]<12)
        {
          (sTime[0] == 0? sTime[0] = 12:"");
          ext = "AM";
        }
        else
        {
          ext = "PM";
          (sTime[0] >= 13? sTime[0] = sTime[0]-12:"");
        }

        sTime = sTime[0]+":"+sTime[1];
        return sDate + " " + sTime + " " + ext; //+ " CST";
    }
    return "-";
  }

  onChange(event)
  {
    let name = event.target.name;
    let val = event.target.value;
    this.setState({[name]: val},function()
    {
      if(name == "emailAddress")
      {
        this.emailValidator(val);
      }
      this.isValid();
    });
  }

  onLocationChange(event)
  {
    this.updateLocationAndDate(event.target.value);
  }

  onDateChange(event)
  {
    this.updateLocationAndDate(this.state.locationId,event.target.value);
  }

  updateLocationAndDate(LID,CID=0)
  {
    let location = this.props.locations[LID];
    let classes = location["classes"];
    let obj = {};

    if(classes.length > 0)
    {
      //  Class available
      obj = {
        "locationId": LID,
        "locationName":location["locationName"],
        "stateDate":this.dateConverion(classes[CID]["classDate"],false),
        "className":classes[CID]["className"],
        "classAvailable":true
      };
    }
    else
    {
      //  No Class available
      obj = {
        "locationId": LID,
        "locationName":location["locationName"],
        "stateDate":"",
        "className":"",
        "classAvailable":false
      };
    }

    this.setState(obj,function()
    {
      this.isValid();
    });
  }

  isValid()
  {
    let cond = (this.state.firstName != "" && this.state.lastName != "" && this.state.isValidEmail && this.state.agreed && this.state.classAvailable);
    this.setState({"valid":cond});
  }

  onAgreement(event)
  {
    this.setState({"agreed": event.target.checked},function()
      {
        this.updateLocationAndDate(this.state.locationId);
      }
    );
  }

  emailValidator(value)
  {
    var x = value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
    {
        this.setState({"isValidEmail":false});
        return;
    }
    this.setState({"isValidEmail":true});
  }

  setLocation(data,i)
  {
    return <option value={i}>{data.locationName}</option>;
  }

  setDate(data,i)
  {
    return <option value={i}>{this.dateConverion(data.classDate,false)}</option>;
  }

  formForClassroom()
  {
    if(this.props.data.courseType == "Virtual Classroom"
    && !this.state.waiting)
    {
      if(this.props.locations.length > 0)
      {
        return (
          <div className="form-body form-horizontal">
            <div className="form-group">
              <div className="col-sm-6">
                <InputField type="text" name="firstName" className="form-control"
                  required={true}
                  placeholder="First Name"
                  msg="Enter Your First Name"
                  value={this.state.firstName}
                  onChange={this.onChange.bind(this)}/>
              </div>
              <div className="col-sm-6">
                <InputField type="text" name="lastName" className="form-control"
                  required={true}
                  placeholder="Last Name"
                  msg="Enter Your Last Name"
                  value={this.state.lastName}
                  onChange={this.onChange.bind(this)}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <InputField type="text" name="emailAddress" className="form-control"
                  required={true}
                  placeholder="Email Address"
                  msg="Enter Your Email Address"
                  value={this.state.emailAddress}
                  validate={{"result":this.state.isValidEmail,"msg":"Enter Your Valid Email Address"}}
                  onChange={this.onChange.bind(this)}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-6">
                <SelectList placeholder="Select A Location" name="location" className="form-control"
                  onChange={this.onLocationChange.bind(this)}>
                  {this.props.locations.map(this.setLocation,this)}
                </SelectList>
              </div>
              <div className="col-sm-6">
                <SelectList placeholder="Select A Date" name="stateDate" className="form-control"
                  onChange={this.onDateChange.bind(this)}>
                  {this.props.locations[this.state.locationId]["classes"].map(this.setDate,this)}
                </SelectList>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <div className="scene-option checkbox">
                  <label>
                    <input type="checkbox"
                    checked={this.state.agreed}
                    onChange={this.onAgreement.bind(this)}/>
                    <span className="text-muted">By checking this box, you understand that actuat enrollment type, dates, times, and locations are subject to availability. You will be contacted by a course advisor to complete this enrollment. You also agree that you are the original subscription owner that is being enrolled in this course. Enrolling anyone else besides you in this subscription will result in fees or loss of account.</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else
      {
        return (
          <h4 className="blue-text text-center">Coming Soon...</h4>
        );
      }
    }
  }

  onSubmit()
  {
    this.setState({"waiting": true});
    if(this.props.data.courseType == "Virtual Classroom")
    {
      //  Classroom
      this.props.enrollSubsClass({
        "courseGuid":this.props.data.courseGUID,
        "subscriptionCode":this.props.data.subscriptionId[0],
        "learnerFirstName":this.state.firstName,
        "learnerLastName":this.state.lastName,
        "learnerEmail":this.state.emailAddress,
        "locationName":this.state.locationName,
        "startDateTime":this.state.stateDate,
        "className":this.state.className
      });
    }
    else
    {
      //  Online and Other Course type

      if(this.props.data.launchURI != "")
      {
        //  If Already Enrolled
        this.courseLaunch(this.props.data.launchURI+"&token="+localStorage.auth+"&courseId="+this.props.data.courseGUID);
        this.props.getModal({"visible":false});
      }
      else
      {
        //  If not Enrolled
        this.props.enrollSubsCourse({
          "courseGuid":this.props.data.courseGUID,
          "courseGroupGUID":this.props.data.courseGroupGUID,
          "subscriptionCode":this.props.data.subscriptionId[0]
        });
      }
    }
  }

  submitBtn()
  {
    if(this.props.data.courseType == "Virtual Classroom")
    {
      return (<button disabled={!this.state.valid || this.state.waiting} className="btn btn-primary" onClick={() => this.onSubmit()}>Enroll</button>);
    }
    else
    {
      return (<button disabled={!this.state.valid || this.state.waiting} className="btn btn-primary play-icon" onClick={() => this.onSubmit()}>Start Course<i></i></button>);
    }
  }

  moreBtn()
  {
    if(this.props.data.courseType == "Virtual Classroom" && this.state.seeMore)
    {
      return (<button className="btn btn-default">Course Details</button>);
    }
    else
    {
      return (<button className="btn btn-default">More Information</button>);
    }
  }

  render()
  {
    return (
      <div className={"enroll-now"+(this.state.waiting?" pre-loader":"")}>
        <div className="head">
          <div className="image">
            {this.image(this.props.data)}
            <div className="iso-rate">
              {this.starRating(this.props.data.rating)}
              <span className={this.props.data.attributeLabel}>{this.props.data.attributeLabel}</span>
            </div>
          </div>
          <div className="specs">
            <div className="heading">{this.props.data.courseTitle}</div>
            <ul className="list-unstyled">
              {this.item("Category",this.props.data.category)}
              {this.item("Format",this.props.data.format)}
              {this.item("Level",this.props.data.level)}
              {this.item("Duration",this.props.data.duration,this.props.data.durationUnit)}
            </ul>
          </div>
        </div>
        <div className="content">
          <p>{this.props.data.shortDesc}</p>
          {this.formForClassroom()}
        </div>
        <div className="footer">
            {this.submitBtn()}
            {this.moreBtn()}
        </div>
      </div>
    );
  }
}

function mapStatToProps(state)
{
    return ({
      "locations":state.subsClassLocations,
      "classEnroll":state.enrollSubsClass,
      "courseEnroll":state.enrollSubsCourse,
      "currentEnrollments":state.currentEnrollments,
      "leftMenuOpen":state.leftMenu.isOpen
    });
}

export default connect(mapStatToProps,actions)(Enrollment);
