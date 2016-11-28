import React, { Component } from 'react';
import Enrollment from './enrollment';

class SubsIsoContent extends Component {

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

    mainBtn(data)
    {
      switch(data.courseType)
      {
        case "On Demand":

          if(data.launchURI == "")
          {
            //  Enrollment
            return (
              <a href="javascript:;" title="Enroll Course Now!" className="iso-main-btn play"
                onClick={() => this.props.getModal({
                    "visible":true,
                    "title":"",
                    "body":<Enrollment data={data} afterEnroll={this.props.afterEnroll}/>,
                    "size":"modal-md"
                  })}></a>
            );
          }
          else
          {
            //  Launch
            return (
              <a href="javascript:;" title="Course Launch" className="iso-main-btn play"
                onClick={() => this.props.getModal({
                    "visible":true,
                    "title":"",
                    "body":<Enrollment data={data} afterEnroll={this.props.afterEnroll}/>,
                    "size":"modal-md"
                  })}></a>
            );
          }

        break;
        case "Virtual Classroom":

          //  Enrollment Only
          return (
            <a href="javascript:;" title="Course Enroll Now!" className="iso-main-btn play"
              onClick={() => this.props.getModal({
                  "visible":true,
                  "title":"",
                  "body":<Enrollment data={data}/>,
                  "size":"modal-md"
                })}></a>
          );

        break;
        case "Print-Based":

          if(data.launchURI == "")
          {
            //  Enrollment
            return (
              <a href="javascript:;" title="Enroll Course Now!" className="iso-main-btn play"
                onClick={() => this.props.getModal({
                    "visible":true,
                    "title":"",
                    "body":<Enrollment data={data} afterEnroll={this.props.afterEnroll}/>,
                    "size":"modal-md"
                  })}></a>
            );
          }
          else
          {
            //  Launch
            return (
              <a href="javascript:;" title="Course Launch" className="iso-main-btn play"
                onClick={() => this.props.getModal({
                    "visible":true,
                    "title":"",
                    "body":<Enrollment data={data} afterEnroll={this.props.afterEnroll}/>,
                    "size":"modal-md"
                  })}></a>
            );
          }

        break;
      }
    }

    title(data)
    {
      var str = data.courseTitle;
      var limit = 48;
      if(str.length > limit)
      {
        str = str.slice(0,limit)+"...";
      }
      return <div title={data.courseTitle} className="iso-title">{str}</div>
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

    bottomBar(data)
    {
      var btns = [];
      switch(data.courseType)
      {
        case "On Demand":

            return (
              <div className="iso-footer">
                <div className="iso-rate" data-reviews={(data.reviewCount<=0?"":"("+data.reviewCount+")")}>
                  {this.starRating(data.rating)}
                  <span className={data.attributeLabel}>{data.attributeLabel}</span>
                </div>
              </div>
            );

        break;
        case "Virtual Classroom":

            return (
              <div className="iso-footer">
                <div className="iso-rate" data-reviews={(data.reviewCount<=0?"":"("+data.reviewCount+")")}>
                  {this.starRating(data.rating)}
                  <span className={data.attributeLabel}>{data.attributeLabel}</span>
                </div>
              </div>
            );

        break;
        case "Print-Based":

            return (
              <div className="iso-footer">
                <div className="iso-rate" data-reviews={(data.reviewCount<=0?"":"("+data.reviewCount+")")}>
                  {this.starRating(data.rating)}
                  <span className={data.attributeLabel}>{data.attributeLabel}</span>
                </div>
              </div>
            );

        break;
      }
    }

    box(data,i)
    {
      data.i = i;
      return(
        <div key={i} className="iso-item single">
            <div className="front">
                {this.image(data)}
                {this.mainBtn(data)}
                {this.title(data)}
                {this.bottomBar(data)}
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

export default SubsIsoContent;
