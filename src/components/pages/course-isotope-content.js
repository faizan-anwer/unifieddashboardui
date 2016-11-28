import React, { Component } from 'react';
import CourseDetail from './course-detail';
import ClassDetail from './class-detail';
import BeforeClassStart from './before-class-start';

import PrepareForClass from './prepareforclass';
import CheckYourSystem from './check-your-system';
import NetworkBandwidth from './network-bandwidth';
import LyncDemo from './lync-demo';
import LabDemo from './lab-demo';
import Courseware from './courseware';
import Support from './support';

import Dropdown from '../helper/dropdown';

class CourseIsoContent extends Component {

    componentDidUpdate()
    {
      if(this.state.iso)
      {
        this.state.iso.reloadItems();
        this.state.iso.layout();
      }
    }

    componentDidMount()
    {
        let iso = new Masonry(this.refs.isotope);
        this.setState({
            "iso": iso
        });
    }

    componentWillUnmount()
    {
      if(this.state.iso)
      {
        this.state.iso.destroy();
      }
    }

    checkAPIStatus()
    {
      if (!this.props.isLoading)
      {
        //  success
        return <div className="loaded-pre-loader"></div>;
      }
      else
      {
        //  loading
        return <div className="pre-loader"></div>;
      }
    }

    image(data)
    {
      var img = data.courseImage;
      if(img == "" || img == "null" || img == null)
      {
        switch(data.courseType)
        {
          case "Online Course":
            img = "online";
          break;
          case "Classroom Course":
            img = "classroom";
          break;
          case "Webinar Course":
            img = "webinar";
          break;
        }
        return <div className={"iso-image " +img}></div>
      }
      else
      {
        return <div className="iso-image" style={{backgroundImage: 'url('+img+')'}}></div>
      }
    }

    dateConverion(stamp,withTime, unit = 'CST')
    {
      if(stamp == null){return;}
      stamp = stamp.split("T");
      var sDate = String(stamp[0]).split("-");
      sDate = sDate[1]+"/"+sDate[2]+"/"+sDate[0];

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
      return sDate + " " + sTime + " " + ext + " " + unit;
    }

    mainBtn(data)
    {
      switch(data.courseType)
      {
        case "Online Course":

          //  Locked
          if(data.isLocked)
          {
            let msg;
            if(data.lockedMessage!=null && data.lockedMessage!="")
            {
              msg = "<div class='left-icon locked'>"+data.lockedMessage+"For assistance with locked courses, please see our <a href='#' class='u-anchor' target='_blank'>support forum</a> to contact technical support.</div>";
            }
            else
            {
              msg = "<div class='left-icon locked'>This course is locked. Courses are generally locked due to too many attempts to pass an exam or quiz, or an action in regulated courses such as exiting the screen while playing the course. For assistance with locked courses, please see our <a href='#' class='u-anchor' target='_blank'>support forum</a> to contact technical support.</div>";
            }

            return (
              <a onClick={() => this.props.getModal({
                  "visible":true,
                  "title":"Your Course Is Locked",
                  "body":msg,
                  "size":"modal-md"
                })}
                href="javascript:;"
                title="Your Course Is Locked"
                className="iso-main-btn locked"></a>
            );
          }

          //  Expire
          if(data.isExpired)
          {
            return (
              <a onClick={() => this.props.getModal({
                  "visible":true,
                  "title":"This Course Has Expired",
                  "body":"<div class='left-icon expired'>Please note that this course expired on <span class='text-red'>"+this.dateConverion(data.expiryDate,true)+"</span>. In order to have full access and pass this course, you must finish it before it expires. In order to complete this course, you will have to re-enroll.</div>",
                  "size":"modal-md"
                })}
              href="javascript:;"
              title="This Course Has Expired"
              className="iso-main-btn expired"></a>
            );
          }

          //  Course Launch
          if(!data.isExpired && !data.isLocked)
          {
            if(data.courseStatus == "completed" || data.courseStatus == "affidavitpending" || data.courseStatus == "affidavitreceived" || data.courseStatus == "Reported")
            {
              //  Retake Course
              return (
                <a href="javascript:;" title="Retake This Course" className="iso-main-btn retake"
                onClick={() => this.courseLaunch(data.launchURI+"&token="+localStorage.auth+"&courseId="+data.courseGUID)}></a>
              );
            }
            else if(data.courseStatus == "inprogress" || data.courseStatus == "notstarted")
            {
              //  launch
              return (
                <a href="javascript:;" title="Course Launch" className="iso-main-btn play"
                onClick={() => this.courseLaunch(data.launchURI+"&token="+localStorage.auth+"&courseId="+data.courseGUID)}></a>
              );
            }
          }

        break;
        case "Classroom Course":
            //  Classroom Course
            if(data.classroomStatistics.status == "Completed")
            {
              //  Retake Course
              return (
                <a href="javascript:;" title="Retake This Course" className="iso-main-btn retake"
                        onClick={() => this.props.getModal({
                            "visible":true,
                            "title":"Course Retake Guarantee",
                            "body":"Course Retake Guarantee is our commitment to flexibility and knowledge transfer. Once you enroll and attend a 360training.com public classroom course, you may retake the same course at no charge, on a space available basis, for any reason whatsoever. If a course has a version upgrade you would only need to purchase new courseware. For more information and to re-enroll, please visit our <u><a href='/LS360Dashboard/support'>support page</a></u> for customer assistance. Restrictions apply.",
                            "size":"modal-md"
                          })}></a>
              );
            }
            else
            {
              //  launch
              return (
                <a className="iso-main-btn play" title="Course Launch" href="javascript:void(0);"
                        onClick={() => this.props.getModal({
                            "visible":true,
                            "title":"Before You Start...",
                            "body":<BeforeClassStart />,
                            "size":"modal-md"
                          })}></a>
              );
            }
        break;
        case "Webinar Course":

        break;
      }
    }

    title(data)
    {
      var str = data.courseName;
      var limit = 48;
      if(str.length > limit)
      {
        str = str.slice(0,limit)+"...";
      }
      return <div title={data.courseName} className="iso-title">{str}</div>
    }

    progressBar(data)
    {
      if(data.isExpired || data.isLocked)
      {
        return <div className="iso-progress-bar"><span style={{width:100*1.8}}></span></div>
      }
      else
      {
        (data.isExpireSoon?data.isExpireSoon=" red":data.isExpireSoon="")
        return <div className={"iso-progress-bar"+data.isExpireSoon}><span style={{width:(data.courseProgress*1.8)}}></span></div>
      }
    }

    timeSpent(data)
    {
      if(data.courseStatus != "completed" && !data.isExpired && !data.isLocked)
      {
        return <div className="iso-time-take">{data.timeSpent}</div>
      }
    }

    courseStatus(data)
    {
      switch(data.courseType)
      {
        case "Online Course":
          if(data.isLocked)
          {
            return <div className="iso-status">Locked</div>
          }
          if(data.isExpired)
          {
            return <div className="iso-status">{"Expired "+this.dateConverion(data.expiryDate,false)}</div>
          }
          if(data.courseStatus == "completed")
          {
            return <div className="iso-status">{"Completed "+this.dateConverion(data.completionDate,false)}</div>
          }
          if(data.isExpireSoon)
          {
            return <div className="iso-status text-red">Expires Soon</div>
          }
        break;
        case "Classroom Course":
          if(data.classroomStatistics.status == "Completed")
          {
            return <div className="iso-date-time">{"Completed: "+this.dateConverion(data.classroomStatistics.endDate,true,'PST')}</div>;
          }
          else if(data.classroomStatistics.startDate != '')
          {
            return <div className="iso-date-time">{"Start Date: "+this.dateConverion(data.classroomStatistics.startDate,true,'PST')}</div>;
          }
        break;
        case "Webinar Course":
          if(data.courseStatus == "completed")
          {
            return <div className="iso-date-time">{"Completed: "+this.dateConverion(data.completionDate,true)}</div>
          }
          else
          {
            return <div className="iso-date-time">{"Start Date: "+this.dateConverion(data.startDate,true)}</div>
          }
        break;
      }
    }

    courseLaunch(path)
    {
      window.open(path,"Course Launching", "width=800,height=600,toolbar=no");
    }

    bottomBtns(data)
    {
      var btns = [];
      switch(data.courseType)
      {
        case "Online Course":

          //  Course Launch
          if(!data.isExpired && !data.isLocked)
          {
            if((data.courseStatus == "inprogress" || data.courseStatus == "notstarted"))
            {
              //  Launch
              btns.push(<a key="1" href="javascript:;" className="play-icon" title="Course Launch" onClick={() => this.courseLaunch(data.launchURI+"&token="+localStorage.auth+"&courseId="+data.courseGUID)}>play</a>);
            }
            else if(data.courseStatus == "completed" || data.courseStatus == "affidavitpending" || data.courseStatus == "affidavitreceived" || data.courseStatus == "Reported")
            {
              //  Retake
              btns.push(<a key="1" href="javascript:;" className="retake-icon" title="Retake This Course" onClick={() => this.courseLaunch(data.launchURI+"&token="+localStorage.auth+"&courseId="+data.courseGUID)}>retake</a>);
            }
          }

          // Course Details
          if(!data.isLocked)
          {
            btns.push(<a key="2" className="info-icon" href="javascript:void(0);" title="Course Details"
                      onClick={() => this.props.getModal({
                        "visible":true,
                        "title":"About Your Course",
                        "body":<CourseDetail eId={data.enrollmentId}/>,
                        "size":"modal-md"
                      })}>info</a>);
          }

          //  Expire Soon
          if(data.isExpireSoon)
          {
            btns.push(<a key="3" className="expire-soon-icon pull-right" href="javascript:void(0);" title="This Course Is Expiring"
                      onClick={() => this.props.getModal({
                          "visible":true,
                          "title":"This Course Is Expiring",
                          "body":"<div class='left-icon expire-soon'>Please note that this course will be expiring on <span class='text-red'>"+this.dateConverion(data.expiryDate,true)+"</span>. In order to have full access and pass this course, you must finish it before it expires. Expired courses prior to completion means you will have to re-enroll.</div>",
                          "size":"modal-md"
                        })}>expire soon</a>);
          }

          //  View Assessment
          if(data.viewAssessmentURI != "" && !data.isLocked)
          {
            btns.push(<a key="4" className="view-assessment-icon" href="javascript:void(0);" title="View Assessment"
                    onClick={() => this.props.getModal({
                        "visible":true,
                        "title":"View Assessment",
                        "src":data.viewAssessmentURI,
                        "size":"modal-md"
                      })}>view</a>);
          }

          //  Locked
          if(data.isLocked)
          {
            let msg;
            if(data.lockedMessage!=null && data.lockedMessage!="")
            {
              msg = "<div class='left-icon locked'>"+data.lockedMessage+"For assistance with locked courses, please see our <a href='#' class='u-anchor' target='_blank'>support forum</a> to contact technical support.</div>";
            }
            else
            {
              msg = "<div class='left-icon locked'>This course is locked. Courses are generally locked due to too many attempts to pass an exam or quiz, or an action in regulated courses such as exiting the screen while playing the course. For assistance with locked courses, please see our <a href='#' class='u-anchor' target='_blank'>support forum</a> to contact technical support.</div>";
            }
            btns.push(<a key="5" className="locked-icon" href="javascript:void(0);" title="Your Course Is Locked"
                      onClick={() => this.props.getModal({
                          "visible":true,
                          "title":"Your Course Is Locked",
                          "body":msg,
                          "size":"modal-md"
                        })}>locked</a>);
          }

          //  Certificate
          if(data.certificateURI != "" && data.certificateURI != null && (data.courseStatus == "completed" || data.courseStatus == "reported"))
          {
            btns.push(<a key="6" className="certificate-icon pull-right" href={data.certificateURI+"&token="+localStorage.auth} target="_blank" title="View Certificate">certificate</a>);
          }

          return (
            <div className="iso-bottom-options">
              <div className="iso-icons">
                {btns}
              </div>
            </div>
          );

        break;
        case "Classroom Course":

          //  Classroom Course
          if(data.classroomStatistics.status == "Completed")
          {
            //  Retake
            btns.push(<a key="1" className="retake-icon" href="javascript:;" title="Retake This Course"
                    onClick={() => this.props.getModal({
                        "visible":true,
                        "title":"Course Retake Guarantee",
                        "body":"Course Retake Guarantee is our commitment to flexibility and knowledge transfer. Once you enroll and attend a 360training.com public classroom course, you may retake the same course at no charge, on a space available basis, for any reason whatsoever. If a course has a version upgrade you would only need to purchase new courseware. For more information and to re-enroll, please visit our <u><a href='#'>support page</a></u> for customer assistance. Restrictions apply.",
                        "size":"modal-md"
                      })}>retake</a>);
          }
          else
          {
            //  Launch
            btns.push(<a key="1"  className="play-icon" title="Course Launch" href="javascript:void(0);"
                    onClick={() => this.props.getModal({
                        "visible":true,
                        "title":"Before You Start...",
                        "body":<BeforeClassStart />,
                        "size":"modal-md"
                      })}>play</a>);
          }

          //  Info
          btns.push(<a key="2" className="info-icon" title="Course Detail" href="javascript:;" onClick={() => this.props.getModal({
                      "visible":true,
                      "title":"About Your Class",
                      "body":<ClassDetail eId={data.enrollmentId} />,
                      "size":"modal-md"
                    })}>info</a>);

          //  Lab
          if(data.classroomStatistics.labURL != "")
          {
            btns.push(<a key="3" className="lab-icon" title="Launch Lab" href={data.classroomStatistics.labURL} target="_blank">lab</a>);
          }

          let config = {
            "head":{
              "css":"settings"
            },
            "btn":{
                  "css":"setting-icon pull-right",
                  "label":"settings"
            },
            "list":{
                  "pos":"right"
            }
          };

          return (
            <div className="iso-bottom-options">
              <div className="iso-icons" title="Prepare For Class">
                {btns}
                <Dropdown config={config}>
                    <li><a className="movie-icon" href="javascript:;" onClick={() => this.props.getModal({
                      "visible":true,
                      "title":"",
                      "body":<PrepareForClass />,
                      "size":"modal-md"
                    })}>Prepare For Class</a></li>
                    <li className="divider"></li>
                    <li><a href="javascript:;" onClick={() => this.props.getModal({
                      "visible":true,
                      "title":"Check Your System",
                      "body":<CheckYourSystem />,
                      "size":"modal-md"
                    })}>Check Your System</a></li>
                    <li><a href="javascript:;" onClick={() => this.props.getModal({
                      "visible":true,
                      "title":"Network & Bandwidth",
                      "body":<NetworkBandwidth />,
                      "size":"modal-md"
                    })}>Network & Bandwidth</a></li>
                    <li><a href="javascript:;" onClick={() => this.props.getModal({
                      "visible":true,
                      "title":"Lync Demonstration",
                      "body":<LyncDemo />,
                      "size":"modal-md"
                    })}>Lync Demonstration</a></li>
                    <li><a href="javascript:;" onClick={() => this.props.getModal({
                      "visible":true,
                      "title":"Lab Demonstration",
                      "body":<LabDemo />,
                      "size":"modal-md"
                    })}>Lab Demonstration</a></li>
                    <li><a href="javascript:;" onClick={() => this.props.getModal({
                      "visible":true,
                      "title":"My Courseware",
                      "body":<Courseware />,
                      "size":"modal-md"
                    })}>My Courseware</a></li>
                    <li className="divider"></li>
                    <li><a href="javascript:;" onClick={() => this.props.getModal({
                      "visible":true,
                      "title":"Support",
                      "body":<Support />,
                      "size":"modal-md"
                    })}>Support</a></li>
                </Dropdown>
              </div>
            </div>
          );

        break;
        case "Webinar Course":
          return (
            <div className="iso-bottom-options">
              <div className="iso-icons">
                <a className="play-icon" href="javascript:void(0);">play</a>
                <a className="info-icon" href="javascript:void(0);">info</a>
                <a className="setting-icon pull-right" href="javascript:void(0);">setting</a>
              </div>
            </div>
          );
        break;
      }
    }

    content(data)
    {
      switch(data.courseType)
      {
        case "Online Course":
          return (
            <div>
              {this.progressBar(data)}
              {this.timeSpent(data)}
              {this.courseStatus(data)}
            </div>
          );
        break;
        case "Classroom Course":
          return (
            <div>
              {this.courseStatus(data)}
            </div>
          );
        break;
        case "Webinar Course":
          return (
            <div>
              {this.courseStatus(data)}
            </div>
          );
        break;
      }
    }

    isExpiredOrSoon(currentDate,expDate)
    {
      //currentDate = "2016-08-11T23:59:59";
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      currentDate = new Date(currentDate);
      expDate = new Date(expDate);
      var diffDays = Math.round((currentDate.getTime() - expDate.getTime())/oneDay);
      var arr = [diffDays >= 0,diffDays >= -10]; // expired, soon
      if(arr[0])
      {
        arr[1] = false;
      }
      //console.log(diffDays, arr);
      return arr;
    }

    box(data,i)
    {
      var cData = [false,false];
      if(!data.isLocked && (data.courseStatus == "notstarted" || data.courseStatus == "inprogress"))
      {
        cData = this.isExpiredOrSoon(this.props.currentDate,data.expiryDate);
      }
      data.isExpired = cData[0];
      data.isExpireSoon = cData[1];

      return(
        <div key={i} className={"iso-item single " + data.courseStatus}>
            <div className="front">
                {this.image(data)}
                {this.mainBtn(data)}
                {this.title(data)}
                {this.content(data)}
                {this.bottomBtns(data)}
            </div>
          </div>
      );
    }

    render()
    {
      if(typeof this.props.isotope != "undefined")
      {
          return (
            <div>
              <div ref="isotope">
                {this.props.isotope.map(this.box,this)}
              </div>
              {this.checkAPIStatus()}
            </div>
          );
      }
      else
      {
          return (
              <div>{this.checkAPIStatus()}</div>
          );
      }
    }
}

export default CourseIsoContent;
