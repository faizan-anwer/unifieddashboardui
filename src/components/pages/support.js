import React, {Component} from 'react';
import {connect} from 'react-redux';

class Support extends Component {

  checkStatus()
  {
    let result = typeof this.props.params == "undefined";
    if(!result)
    {
      result = (typeof this.props.params.i == "undefined");
    }
    return result;
  }

  render()
  {
    if(this.checkStatus())
    {
      return (
        <div>
          <h5>Technical Support: 24 hours a day, 7 days per week</h5>
          <dl>
            <dt>On the Web:</dt>
            <dd><a href="http://www.360training.com/support" className="u-anchor" target="_blank">Click here</a> to visit our support site.</dd>
            <br/>
            <dt>By Phone:</dt>
            <dd>Toll-Free 877-881-2235 (option 1)</dd>
            <br/>
            <dt>Or Email:</dt>
            <dd><a href="mailto:support@360training.com" className="u-anchor">support@360training.com</a></dd>
            <br/>
            <dt>Corporate Headquarters</dt>
      			<dd>360training.com, Inc.</dd>
            <dd>13801 N. Mo-Pac, Suite 100,</dd>
            <dd>Austin, Texas 78727</dd>
            <br/>
            <dd><strong>Toll Free:</strong> 888-360-TRNG</dd>
      			<dd><strong>Local</strong> / <strong>International:</strong> +1-877-881-2235</dd>
            <dd><strong>Fax:</strong> 512-441-1811</dd>
            <br/>
            <dt>Sales Inquiries:</dt>
            <dd>Toll-Free 877-881-2235 (follow menu options) or<br/> e-mail:<a href="mailto:sales@360training.com">sales@360training.com</a></dd>
            <br/>
            <dt>Press Information:</dt>
            <dd><a href="mailto:press@360training.com">press@360training.com</a></dd>
            <br/>
            <dt>Careers @ 360training:</dt>
            <dd><a href="mailto:jobs@360training.com" target="_blank">jobs@360training.com</a></dd>
      		</dl>
        </div>
      );
    }
    else
    {
      let content = this.props.branding.topMenu.child[this.props.params.i]["content"];
      return <div dangerouslySetInnerHTML={{__html: content}} />;
    }
  }
}

function mapState(state)
{
  return {"branding":state.branding};
}

export default connect (mapState)(Support);
