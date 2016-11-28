import React, { Component } from 'react';
import CourseDetail from './course-detail';
import Dropdown from '../helper/dropdown';

class TransRowContent extends Component {

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

    dateConverion(stamp,withTime)
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
      return sDate + " " + sTime + " " + ext + " CST";
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

    row(data,i)
    {
      if(data.courseType == "Online Course")
      {
        var elm = ["-","-","-","-"];

        //  Certificate
        if(data.certificateURI != "" && data.certificateURI != null && (data.courseStatus == "completed" || data.courseStatus == "reported"))
        {
          elm[0] = <a className="certificate-icon" href={data.certificateURI+"&token="+localStorage.auth} target="_blank" title="Download Certificate">Download</a>;
        }

        //  View Assessment
        if(data.viewAssessmentURI != "" && !data.isLocked)
        {
          elm[1] = <a className="view-assessment-icon" href="javascript:void(0);" title="View Assessment"
                  onClick={() => this.props.getModal({
                      "visible":true,
                      "title":"View Assessment",
                      "src":data.viewAssessmentURI,
                      "size":"modal-md"
                    })}>view</a>;
        }

        //  Start Date
        if(data.firstAccessDate != "" && data.firstAccessDate != null)
        {
          elm[2] = this.dateConverion(data.firstAccessDate,false);
        }

        //  Completion Date
        if(data.completionDate != "" && data.completionDate != null)
        {
          elm[3] = this.dateConverion(data.completionDate,false);
        }

        return(
          <tr className="text-center" key={i}>
            <td className="text-left">{data.courseName}</td>
            <td>{elm[2]}</td>
            <td>{elm[3]}</td>
            <td className="caps-text">{this.stringReplace(data.courseStatus)}</td>
            <td className="text-right">{this.preciseRound(data.score,2,-1,"0%")}</td>
            <td>{elm[0]}</td>
            <td><a className="statistics-icon" onClick={() => this.props.getModal({
                "visible":true,
                "title":"About Your Course",
                "body":<CourseDetail eId={data.enrollmentId}/>,
                "size":"modal-md"
              })}
            href="javascript:;"
            title="View Course Details">View</a></td>
            <td>{elm[1]}</td>
          </tr>
        );
      }
    }

    render()
    {
      if(typeof this.props.isotope != "undefined")
      {
          return (
            <div className="table-scrollable">
               <table className="table table-striped table-hover">
                  <thead className="fixed">
                    <tr>
                      <th>Course</th>
                      <th className="text-center">Start Date</th>
                      <th className="text-center">Completion Date</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Score</th>
                      <th className="text-center">Certificate</th>
                      <th className="text-center">Course Statistics</th>
                      <th className="text-center">Assessment Results</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.isotope.map(this.row,this)}
                  </tbody>
              </table>
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

export default TransRowContent;
