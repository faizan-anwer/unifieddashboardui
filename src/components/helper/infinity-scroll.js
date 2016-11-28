import React, { Component } from 'react';

class InfinityScroll extends Component {

  componentWillMount()
  {
    this.state = {
      "top":false,
      "bottom":false
    }
  }

  check(pos,bool)
  {
    if(this.state[pos] === bool){return}
    this.setState({[pos]:bool});
    if (typeof this.props.call.back === 'function')
    {
      this.props.call.back(this.state);
    }
  }

  handleScroll(e)
  {
    var el = e.target;
    if(el.scrollTop < this.props.scroll.top)
    {
      this.check("top",false);
    }
    else
    {
      this.check("top",true);
      this.check("bottom",el.offsetHeight-el.scrollHeight+el.scrollTop>this.props.scroll.bottom);
    }
  }

  componentDidMount()
  {
    this.handleScroll = this.handleScroll.bind(this);
    document.getElementById("wrapper").addEventListener('scroll',this.handleScroll);
  }

  componentWillUnmount()
  {
    document.getElementById("wrapper").removeEventListener('scroll',this.handleScroll);
  }

  render()
  {
    return(
      <div></div>
    );
  }
}

export default InfinityScroll;
