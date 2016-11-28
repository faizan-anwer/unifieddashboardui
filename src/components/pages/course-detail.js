import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class CourseDetail extends Component {

    componentWillMount()
    {
      this.props.getCourseDetail(this.props.eId);
    }

    componentWillUnmount()
    {
      this.props.clearState("COURSE_DETAIL");
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

    txtConverion(val,cond,ret)
    {
        if(val != cond)
        {
          return val;
        }
        return ret;
    }

    preciseRound(value, decPlaces, cond, ret)
    {
        if(value != cond)
        {
          if(parseInt(value) !== 0)
          {
            var val = value * Math.pow(10, decPlaces);
            var fraction = (Math.round((val-parseInt(val))*10)/10);
            if(fraction == -0.5){fraction = -0.6};
            val = Math.round(parseInt(val) + fraction) / Math.pow(10, decPlaces);
            return val+"%";
          }
        }
        return ret;
    }

    dateInSecIntoHrMin(sec)
    {
        //var totalSec = new Date().getTime() / 1000;
        var totalSec = parseInt(sec);
        var hours = parseInt( totalSec / 3600 );
        var minutes = parseInt( totalSec / 60 ) % 60;
        var seconds = totalSec  % 60;
        var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
        return result;
    }

    stringReplace(str)
    {
        if(str == null)
        {
          return "-";
        }
        if(str == "affidavitpending")
        {
         return "Affidavit Pending";
        }

        if(str == "affidavitreceived")
        {
         return "Affidavit Received";
        }

        if(str == "notstarted")
        {
         return "Not Started";
        }
        return str;
    }

    render()
    {
        if(typeof this.props.courseDetail[0] != "undefined")
        {
            return (
              <div>
                 <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Statistics</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Status</td>
                        <td className="caps-text">{this.stringReplace(this.props.courseDetail[0].status)}</td>
                      </tr>
                      <tr>
                          <td>Course Progress</td>
                          <td>{this.props.courseDetail[0].percentComplete+"%"}</td>
                      </tr>
                      <tr>
                          <td>First Access Date</td>
                          <td>{this.dateConverion(this.props.courseDetail[0].firstAccessDate,true)}</td>
                      </tr>
                      <tr>
                          <td>Last Access Date</td>
                          <td>{this.dateConverion(this.props.courseDetail[0].lastAccessDate,true)}</td>
                      </tr>
                      <tr>
                          <td>Total Number of Accesses</td>
                          <td>{this.props.courseDetail[0].launchesOccrued}</td>
                      </tr>
                      <tr>
                          <td>Pre Assessment Score</td>
                          <td>{this.preciseRound(this.props.courseDetail[0].pretestScore,2,-1,"-")}</td>
                      </tr>
                      <tr>
                        <td>Average Quiz Score</td>
                        <td>{this.preciseRound(this.props.courseDetail[0].averageQuizScore,2,-1,"-")}</td>
                      </tr>
                      <tr>
                          <td>Lowest Quiz Score</td>
                          <td>{this.preciseRound(this.props.courseDetail[0].lowestQuizScore,2,-1,"-")}</td>
                      </tr>
                      <tr>
                          <td>Highest Quiz Score</td>
                          <td>{this.preciseRound(this.props.courseDetail[0].highestQuizScore,2,-1,"-")}</td>
                      </tr>
                      <tr>
                          <td>Total Number of Quizzes Attempted</td>
                          <td>{this.txtConverion(this.props.courseDetail[0].numberQuizesTaken,0,"-")}</td>
                      </tr>
                      <tr>
                          <td>Average Post Test Score</td>
                          <td>{this.preciseRound(this.props.courseDetail[0].averagePostTestScore,2,-1,"-")}</td>
                      </tr>
                      <tr>
                          <td>Lowest Post Test Score</td>
                          <td>{this.preciseRound(this.props.courseDetail[0].lowestPostTestScore,2,-1,"-")}</td>
                      </tr>
                      <tr>
                          <td>Highest Post Test Score</td>
                          <td>{this.preciseRound(this.props.courseDetail[0].highestPostTestScore,2,-1,"-")}</td>
                      </tr>
                      <tr>
                          <td>Total Number of Post Tests Attempted</td>
                          <td>{this.txtConverion(this.props.courseDetail[0].numberPostTestsTaken,0,"-")}</td>
                      </tr>
                      <tr>
                          <td>Completion Date</td>
                          <td>{this.dateConverion(this.props.courseDetail[0].completionDate,true)}</td>
                      </tr>
                      <tr>
                          <td>Total Time Spent in Course (hours:minutes)</td>
                          <td>{this.dateInSecIntoHrMin(this.props.courseDetail[0].totalTimeInSeconds)}</td>
                      </tr>
                    </tbody>
                </table>
              </div>
            );
        }
        else
        {
            return <div className="pre-loader"></div>;
        }
    }
}

function mapStatToProps(state)
{
    return {"courseDetail":state.courseDetail};
}

export default connect(mapStatToProps,actions)(CourseDetail);
