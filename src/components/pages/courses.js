import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import IsotopeContainer from './course-isotope-container';

class Courses extends Component {

  componentWillMount()
  {
    let obj = JSON.parse(localStorage.leftMenu);
    this.props.leftMenuToggle(obj.isOpen,"learn",obj.activeType);
    this.props.courseCounters();
    this.state = {
      "apiStatus":0
    }
  }

  componentWillUnmount()
  {
    this.props.clearState("COURSE_COUNTERS");
  }

  componentWillReceiveProps(nextProps)
  {
    if(typeof nextProps.counters.all == "number")
    {
      this.setState({"apiStatus":1});
    }
  }

  translateStatus()
  {
    switch (this.state.apiStatus)
    {
      case 0:
        //  loading
        return " pre-loader";
        break;
      case 1:
        //  success
        return "";
        break;
      case 2:
        //  fail
        return " result-fail";
        break;
    }
  }

  numFormation(num = 0)
  {
    return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }

  render()
  {
    return (
      <div>
        <h1 className="page-heading">My Courses</h1>
        <div className={"statistics"+this.translateStatus()}>
  				<div className="statistics-col">
  				  <div className="placeholder">
  					<h4>{this.numFormation(this.props.counters.all)}</h4>
  					<span>Number Of My Courses</span>
  				  </div>
  				</div>
  				<div className="statistics-col">
  				  <div className="placeholder">
  					  <h4>{this.numFormation(this.props.counters.subscriptions)}</h4>
  					  <span>Courses In Your Subscription</span>
  				  </div>
  				</div>
  				<div className="statistics-col">
  				  <div className="placeholder">
  					  <h4>{this.numFormation(this.props.counters.completed)}</h4>
  					  <span>Courses You&#39;ve Completed</span>
  				  </div>
  				</div>
  			</div>
        <IsotopeContainer />
      </div>
    );
  }
}

function mapState(state)
{
  return {"counters":state.courseCounters};
}

export default connect(mapState,actions)(Courses);
