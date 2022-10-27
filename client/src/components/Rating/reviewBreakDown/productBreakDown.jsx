import React, {useState, useEffect} from "react";
import ProductBDentry from './productBDentry.jsx';

export default class ProductBreakDown extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      Size:['Too small','Perfect','Too large'],
      Width:['Too narrow','Perfect','Too wide'],
      Comfort:['uncomfortable', 'as expected', 'perfect'],
      Quality: ['poor', 'as expected', 'perfect'],
      Fit:['Runs Short','Perfect','Runs long'],
      Length:['Runs tight','Perfect','Runs long']
    };
  }

render() {


  return (
    <div style={{marginTop:'20px',boxSizing:'border-box'}}>
    {Object.keys(this.props.metaData.characteristics).map((name,id)=>{
      return (
            <div key={id}>{name}
            <ProductBDentry
              name={name}
              value={this.props.metaData.characteristics[name].value}
              moods={this.state[name]}
              />
              </div>
      )
    })}
    </div>

  )
}
}