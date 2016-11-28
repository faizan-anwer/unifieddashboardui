import React, { Component } from 'react';
import IsoContent from './subs-isotope-content';
import InfinityScroll from '../helper/infinity-scroll';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import ScrollArea from 'react-custom-scroll';
import Dropdown from '../helper/dropdown';

class SubsIsoContainer extends Component {

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
      "facetList":[],
      "loadMore":true,
      "isLoading":false,
      "pageNumber":1,
      "pageSize":20,
      "sort":"ASC",
      "mapFacet":{},
      "searchText":"",
      "sText":"",
      "minHeight":0
    }
    this.fetchIsotopeData(true);
  }

  componentWillUnmount()
  {
    this.props.clearState("SUBS_ISOTOPES");
    this.props.setCurrentEnrollments(0);
  }

  componentWillReceiveProps(nextProps)
  {
    if(nextProps.isotope != "" && this.state.loadMore)
    {
      if(nextProps.isotope.subscriptionCourses != null)
      {
        this.setState({"list": this.state.list.concat(nextProps.isotope.subscriptionCourses)});
      }

      if(nextProps.isotope.facetView != null)
      {
        this.setState({"facetList":nextProps.isotope.facetView});
      }

      if(nextProps.isotope.totalPages == nextProps.isotope.pageNumber)
      {
        this.setState({"loadMore":false});
      }
      this.setState({"pageNumber":this.state.pageNumber+1});
    }
    this.setState({"isLoading":false});
  }

  fetchIsotopeData(withFacet = false)
  {
    if(!this.state.isLoading && this.state.loadMore)
    {
      var queryFacet =[];
      for(var i in this.state.mapFacet)
      {
         queryFacet.push(i);
      }

      this.props.getSubsIsotopes({
        "withFacet":withFacet,
        "pageSize":this.state.pageSize,
        "pageNumber":this.state.pageNumber,
        "sort": this.state.sort,
        "searchText":this.state.searchText,
        "queryFacet":queryFacet
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
    let doFilter = (typeof obj.mapFacet != "undefined");
    let doSearch = (typeof obj.searchText != "undefined");
    if(doFilter)
    {
      obj.searchText = "";
      obj.sText = "";
    }
    if(doSearch)
    {
      obj.mapFacet = {};
    }

    this.setState(obj,function()
    {
      this.fetchIsotopeData();
    });
  }

  afterEnroll(launchURI,i)
  {
    let list = this.state.list;
    list[i].launchURI = launchURI;
    this.setState({"list":list});
  }

  callBack(result)
  {
    this.setState({"affix":result.top});
    if(result.bottom)
    {
      this.fetchIsotopeData();
    }
  }

  calculateTop(t)
  {
    let w = window.innerWidth || document.body.clientWidth;
    if(w < 990)
    {
      if(w < 560)
      {
        t = 850;
      }
      else
      {
        t = 500;
      }
    }
    return t;
  }

  onFacetFilter(e)
  {
    let obj = this.state.mapFacet;
    if(e.target.checked)
    {
      // Add in Que
      obj[e.target.name] = e.target.checked;
    }
    else
    {
      // Remove from Que
      delete obj[e.target.name];
    }
    this.updateList({"mapFacet":obj});
  }

  facetItem(data)
  {
    return (
      <li>
        <div className="scene-option checkbox">
          <label>
            <input disabled={this.state.isLoading} name={data.value} type="checkbox"
              onChange={this.onFacetFilter.bind(this)}
              checked={typeof this.state.mapFacet[data.value]!="undefined"}/>
              <span>{data.label+" ("+data.count+")"}</span>
          </label>
        </div>
      </li>
    );
  }

  facetGroup(data)
  {
    let isPrice = String(data.value).split("price_");
    let isMf = String(data.value).split("mfName_");
    let items = [];
    if(isPrice.length == 1 && isMf.length == 1 && data.value != "ext_contentType")
    {
      let item = [];
      item = data.entry.map(this.facetItem,this);
      items.unshift(<li className="heading">{data.name}</li>);
      items.push(item);
      return <ul>{items}</ul>;
    }
  }

  render()
  {
    return (
      <div className={"iso-container "+(this.state.affix?"fixed":"")}>
        <InfinityScroll call={{"back":this.callBack.bind(this)}} scroll={{"top":this.calculateTop(300),"bottom":-5}} />
        <ul className={"iso-header"+(this.state.isLoading?" disabledElm":"")}>
					<li className="search">
						<input disabled={this.state.isLoading} type="text" className="form-control" placeholder="Search Your Courses By Keyword"
            onKeyDown={this.onSearch.bind(this)} onChange={this.onChange.bind(this)} value={this.state.sText}></input>
					</li>
					<li className={"sorting "+this.state.sort}>
						<Dropdown config={this.state.config}>
              <li><a href="javascript:;" className="ASC" onClick={() => this.updateList({'sort':'ASC'})}>Sort Ascending (A-Z)</a></li>
              <li><a href="javascript:;" className="DESC" onClick={() => this.updateList({'sort':'DESC'})}>Sort Descending (Z-A)</a></li>
						</Dropdown>
					</li>
          <li className={"merge-filter-sorting "+this.state.sort}>
            <Dropdown config={this.state.config}>
              <li><a href="javascript:;" className="ASC" onClick={() => this.updateList({'sort':'ASC'})}>Sort Ascending (A-Z)</a></li>
              <li><a href="javascript:;" className="DESC" onClick={() => this.updateList({'sort':'DESC'})}>Sort Descending (Z-A)</a></li>
            </Dropdown>
					</li>
				</ul>
        <div className="ios-with-left-nav">
          <div className="iso-left-nav">
            <ScrollArea heightRelativeToParent="calc(100%)">
              {this.state.facetList.map(this.facetGroup,this)}
            </ScrollArea>
          </div>
          <div className="iso-content">
            <div style={{minHeight:this.state.minHeight}}>
              <IsoContent isotope={this.state.list} currentDate={this.props.currentDate} isLoading={this.state.isLoading} getModal={this.props.getModal} afterEnroll={this.afterEnroll.bind(this)}/>
            </div>
          </div>
        </div>
			</div>
    );
  }
}

function mapStatToProps(state)
{
    return {"isotope":state.subsIsotopes,"currentDate":state.branding.serverCurrentDate};
}

export default connect(mapStatToProps,actions)(SubsIsoContainer);
