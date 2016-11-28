import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import IsotopeContainer from './subs-isotope-container';

class Subscriptions extends Component {

  componentWillMount()
  {
    let obj = JSON.parse(localStorage.leftMenu);
    this.props.leftMenuToggle(obj.isOpen,"learn",obj.activeType);
    this.props.subsCounters();
    this.state = {
      "apiStatus":0,
      "new":0,
      "popular":0,
      "premium":0,
      "elm":0,
      "available":0,
      "enrolled":0,
      "enrolledPercent":0,
      "popularPercent":0,
      "premiumPercent":0,
      "elmPercent":0
    }
  }

  componentWillUnmount()
  {
    this.props.clearState("SUBS_COUNTERS");
  }

  componentWillReceiveProps(nextProps)
  {
    if(typeof nextProps.counters.subscriptionStatistics == "object")
    {
      let counts = {"popular":0,"new":0,"premium":0,"elm":0};
      let key = 0;
      let entryIndex;
      for(key in nextProps.counters.subscriptionStatistics)
      {
        if(typeof nextProps.counters.subscriptionStatistics[key].entry != "undefined")
        {
          entryIndex = key;
        }
      }

      if(typeof entryIndex != "undefined")
      {
        key = 0;
        let entries = nextProps.counters.subscriptionStatistics[entryIndex].entry;
        for(key in entries)
        {
          switch(entries[key].label)
          {
            case "Popular":
              counts.popular = entries[key].count;
            break;
            case "New":
              counts.new = entries[key].count;
            break;
            case "Premium":
              counts.premium = entries[key].count;
            break;
            case "eLM":
              counts.elm = entries[key].count;
            break;
          }
        }
      }

      this.setState({
        "apiStatus":1,
        "new":counts.new,
        "popular":counts.popular,
        "premium":counts.premium,
        "elm":counts.elm,
        "available":nextProps.counters.aggregateSubscriptionCoursesCount,
        "enrolled":nextProps.counters.enrolledSubscriptionCoursesCount,
        "enrolledPercent":this.inPercent(nextProps.counters.enrolledSubscriptionCoursesCount,nextProps.counters.aggregateSubscriptionCoursesCount),
        "newPercent":this.inPercent(counts.new,nextProps.counters.aggregateSubscriptionCoursesCount),
        "popularPercent":this.inPercent(counts.popular,nextProps.counters.aggregateSubscriptionCoursesCount),
        "premiumPercent":this.inPercent(counts.premium,nextProps.counters.aggregateSubscriptionCoursesCount),
        "elmPercent":this.inPercent(counts.elm,nextProps.counters.aggregateSubscriptionCoursesCount)
      });
    }
  }

  inPercent(num,total)
  {
    if(total == 0)
    {
      return 0;
    }
    return Math.round((num/total)*100);
  }

  translateStatus()
  {
    switch (this.state.apiStatus)
    {
      case 0:
        //  loading
        return "pre-loader";
        break;
      case 1:
        //  success
        return "";
        break;
      case 2:
        //  fail
        return "result-fail";
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
      <div className="subscriptions">
        <h1 className="page-heading">My Subscriptions</h1>
        <div className={this.translateStatus()}>
          <div className="row">
            <div className="col-md-6">
              <div className="pie-chart rounded">
                <div className={"c100 s1 blue p"+this.state.newPercent}>
                  <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                  </div>
                </div>
                <div className={"c100 s2 gray p"+this.state.premiumPercent}>
                  <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                  </div>
                </div>
                <div className={"c100 s3 green p"+this.state.popularPercent}>
                  <span className="perc popular">{this.state.popularPercent}%</span>
                  <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                  </div>
                </div>
              </div>
              <div className="activities">
                <div className="on-demand hide"></div>
                <div className="activity">
                  <h5 className="heading">Subscription Activity Monitor</h5>
                  <div><span className="blue-text">{this.numFormation(this.state.new)}</span> courses are new.</div>
                  <div><span>{this.numFormation(this.state.premium)}</span> courses are premium.</div>
                  <div><span className="green-text">{this.numFormation(this.state.popular)}</span> courses are popular.</div>
                  <div><span className="blue-text">{this.numFormation(this.state.available)}</span> total courses in subscription.</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="pie-chart left-18">
                <div className={"c100 s2 p"+this.state.enrolledPercent}>
                  <span className="perc enrolled">{this.numFormation(this.state.enrolled)}</span>
                  <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                  </div>
                </div>
              </div>
              <div className="activities">
                <div className="activity">
                  <h5 className="heading">Your Enrolled Courses</h5>
                  <div>You are currently enrolled in <span className="green-text">{this.numFormation(this.state.enrolled)}</span> courses within your subscription. With <span className="blue-text">{this.numFormation(this.state.available)}</span> courses available, take advantage of endless learning!</div>
                </div>
              </div>
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
  return {"counters":state.subsCounters};
}

export default connect(mapState,actions)(Subscriptions);
