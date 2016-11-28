import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class ClassDetail extends Component {

    componentWillMount()
    {
      this.props.getClassDetail(this.props.eId);
    }

    componentWillUnmount()
    {
      this.props.clearState("CLASS_DETAIL");
    }

    dateConverion(stamp,withTime)
    {
        if(stamp != null)
        {
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
          return sDate + " " + sTime + " " + ext + " PST";
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

    pareseNumberOfDays(val,unit)
    {
      if(val == ""
        || val == null
        || val == 0
        || val == '0')
      {
        return "-";
      }

      return (val+" "+unit);
    }

    render()
    {
      if(typeof this.props.classDetail.className != "undefined")
      {
          return (
            <div>
              <table className="table table-striped">
                  <thead>
                    <tr>
                      <th width="50%">Information</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Class</td>
                      <td className="caps-text">{this.props.classDetail.className}</td>
                    </tr>
                    <tr>
                      <td>Course</td>
                      <td>{this.props.classDetail.courseName}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>{this.props.classDetail.status}</td>
                    </tr>
                    <tr>
                      <td>Student</td>
                      <td>{this.props.classDetail.studentName}</td>
                    </tr>
                    <tr>
                      <td>Start Date / Time</td>
                      <td>{this.dateConverion(this.props.classDetail.startDate,true)}</td>
                    </tr>
                    <tr>
                      <td>End Date / Time</td>
                      <td>{this.dateConverion(this.props.classDetail.endDate,true)}</td>
                    </tr>
                    <tr>
                      <td>Duration</td>
                      <td>{this.pareseNumberOfDays(this.props.classDetail.duration,this.props.classDetail.durationUnit)}</td>
                    </tr>
                    <tr>
                      <td>Location</td>
                      <td>{this.props.classDetail.location}</td>
                    </tr>
                    <tr>
                      <td>Instructor Location</td>
                      <td>{this.props.classDetail.instructorLocation}</td>
                    </tr>
                  </tbody>
              </table>
              <p className="blue-text">Cancellation And No Show Policy</p>
              <hr />
              <p>
                We are saving your seat! In order to provide you with the highest quality training at the best price, we ask that you abide by our cancellation policy. You may cancel a class without a cancellation charge up to 10 business days prior to the class start date. If you cancel less than 10 business days prior to the class start date, then 360training will charge you the full amount of the class. You will have the option to reschedule the class at no additional fee - on a space available basis only. If you are unable to reschedule the class because of personal reasons or 360training.com no longer offers the class, no refund will be provided. 360training.com asks that you notify us as soon as possible if you need to reschedule a class.
              </p>
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
    return {"classDetail":state.classDetail};
}

export default connect(mapStatToProps,actions)(ClassDetail);
