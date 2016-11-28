import React, { Component } from 'react';
import IsoContent from './course-isotope-content';
import InfinityScroll from '../helper/infinity-scroll';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Dropdown from '../helper/dropdown';

class CourseIsoContainer extends Component {

  componentWillMount()
  {
    this.state = {
      "config":{
          "head":{
            "css":""
          },
          "btn":{
                "css":"dropdown-toggle",
                "label":""
          },
          "list":{
                "pos":"right"
          }
      },
      "affix":false,
      "list":[],
      "loadMore":true,
      "isLoading":false,
      "pageNumber":1,
      "pageSize":20,
      "sort":"ASC",
      "filter":"All",
      "searchText":"",
      "sText":"",
      "minHeight":0
    }
    this.fetchIsotopeData();
  }

  componentWillUnmount()
  {
    this.props.clearState("COURSE_ISOTOPES");
  }

  componentWillReceiveProps(nextProps)
  {
    if(nextProps.isotope != "" && this.state.loadMore)
    {
      this.setState({"list": this.state.list.concat(nextProps.isotope.learnerEnrollments)});
      if(nextProps.isotope.totalPages == nextProps.isotope.pageNumber)
      {
        this.setState({"loadMore":false});
      }
      this.setState({"pageNumber":this.state.pageNumber+1});
    }
    this.setState({"isLoading":false});
  }

  fetchIsotopeData()
  {
    if(!this.state.isLoading && this.state.loadMore)
    {
      this.props.getCourseIsotopes({
        "pageSize":this.state.pageSize,
        "pageNumber":this.state.pageNumber,
        "sort": this.state.sort,
        "searchText":this.state.searchText,
        "filter":this.state.filter
      });

      //  Set min-height to avoid reset scroll
      let h = window.innerHeight || document.body.clientHeight;
      this.setState({"isLoading":true,"minHeight":h});
    }
  }

  onSearch(e)
  {
    var k=e.which||e.keyCode;
    if(k==13 && !this.state.isLoading)
    {
      this.updateList({"searchText": e.target.value});
    }
  }

  onChange(e)
  {
    this.setState({"sText": e.target.value});
  }

  updateList(obj)
  {
    obj.loadMore = true;
    obj.list = [];
    obj.pageNumber = 1;
    let doFilter = (typeof obj.filter != "undefined");
    let doSearch = (typeof obj.searchText != "undefined");
    if(doFilter)
    {
      obj.searchText = "";
      obj.sText = "";
    }
    if(doSearch)
    {
      obj.filter = "All";
    }
    this.setState(obj,function()
    {
      this.fetchIsotopeData();
    });
  }

  callBack(result)
  {
    this.setState({"affix":result.top});
    if(result.bottom)
    {
      this.fetchIsotopeData();
    }
  }

  render()
  {
    return (
      <div className={"iso-container "+(this.state.affix?"fixed":"")}>
        <InfinityScroll call={{"back":this.callBack.bind(this)}} scroll={{"top":200,"bottom":-5}} />
        <ul className={"iso-header"+(this.state.isLoading?" disabledElm":"")}>
					<li className="search">
						<input disabled={this.state.isLoading} type="text" className="form-control" placeholder="Search Your Courses By Keyword"
            onKeyDown={this.onSearch.bind(this)} onChange={this.onChange.bind(this)} value={this.state.sText}></input>
					</li>
					<li className={"filters "+this.state.filter}>
						<button type="button" className="All" onClick={() => this.updateList({'filter':'All'})}>All</button>
            <button type="button" className="New" onClick={() => this.updateList({'filter':'New'})}>New</button>
						<button type="button" className="Started" onClick={() => this.updateList({'filter':'Started'})}>Started</button>
						<button type="button" className="Completed" onClick={() => this.updateList({'filter':'Completed'})}>Completed</button>
						<button type="button" className="Subscription" onClick={() => this.updateList({'filter':'Subscription'})}>Subscription</button>
					</li>
					<li className={"sorting "+this.state.sort}>
            <Dropdown config={this.state.config}>
              <li><a href="javascript:;" className="ASC" onClick={() => this.updateList({'sort':'ASC'})}>Sort Ascending (A-Z)</a></li>
              <li><a href="javascript:;" className="DESC" onClick={() => this.updateList({'sort':'DESC'})}>Sort Descending (Z-A)</a></li>
            </Dropdown>
					</li>
          <li className={"merge-filter-sorting "+this.state.filter+" "+this.state.sort}>
            <Dropdown config={this.state.config}>
              <li><a href="javascript:;" className="All" onClick={() => this.updateList({'filter':'All'})}>All</a></li>
              <li><a href="javascript:;" className="New" onClick={() => this.updateList({'filter':'New'})}>New</a></li>
              <li><a href="javascript:;" className="Started" onClick={() => this.updateList({'filter':'Started'})}>Started</a></li>
              <li><a href="javascript:;" className="Completed" onClick={() => this.updateList({'filter':'Completed'})}>Completed</a></li>
              <li><a href="javascript:;" className="Subscription" onClick={() => this.updateList({'filter':'Subscription'})}>Subscription</a></li>
              <li className="divider"></li>
              <li><a href="javascript:;" className="ASC" onClick={() => this.updateList({'sort':'ASC'})}>Sort Ascending (A-Z)</a></li>
              <li><a href="javascript:;" className="DESC" onClick={() => this.updateList({'sort':'DESC'})}>Sort Descending (Z-A)</a></li>
            </Dropdown>
					</li>
				</ul>
        <div style={{minHeight:this.state.minHeight}}>
          <IsoContent isotope={this.state.list} currentDate={this.props.currentDate} isLoading={this.state.isLoading} getModal={this.props.getModal}/>
        </div>
			</div>
    );
  }
}

function mapStatToProps(state)
{
    return {"isotope":state.courseIsotopes,"currentDate":state.branding.serverCurrentDate};
}

export default connect(mapStatToProps,actions)(CourseIsoContainer);
