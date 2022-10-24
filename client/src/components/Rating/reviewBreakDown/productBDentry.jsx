import React, {useState, useEffect} from "react";

export default class ProductBDentry extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      moodSlect:null,
      value:'0%',
    };
  }

  componentDidMount() {
    let rate = this.props.value/5*100;
    let subRate = 0;
    if (rate >= 80) {
      console.log(this.props.name)
      subRate=(rate-80)/20
      this.setState({ moodSlect: this.props.moods[2], value: subRate*100+'%' });
    } else if (rate >=20 ) {
      subRate=(rate-20)/60
      this.setState({ moodSlect: this.props.moods[1], value: subRate*100+'%' });
    } else if (rate >= 0) {
      subRate=(rate)/20
      this.setState({ moodSlect: this.props.moods[0], value: subRate*100+'%' });
    }
  }

render() {
  let rate=Number((this.props.value/5*100).toFixed(2));



  const largeWidth={width:'44%'}
  const smallWidth={width:'22%'}
  const progressArticleStyle = {
    position:'relative',
    height: '10px',
    display: 'inline-block',
    // overflow: 'hidden',
    marginTop: '5px',
    marginRight: '5px',
    marginBottom: '10px',
    color: '#aaa',
    background: '#D3D3D3',
    border: `1px solid '#aaa'`,
  };
  const moodStyle = {
    position:'absolute',
    left:'0',
    bottom:'-16px',
    color: '#aaa',
    fontSize:'10px'
  }

  const indicateStyle = {
      position:'absolute',
      left:`${this.state.value}`,
      transform:`translateX(-16px)`,
      top:'0',
      width: '0px',
      height: '0px',
      borderTop: '8px solid black',
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent'
  }



  return (
    <div style={{overflow:'hidden'}}>
      {console.log(this.state.moodSlect,this.props.name,this.state.value)}
    {this.props.moods.map((mood,id)=>{
      return (
      <div key={id} style={id===1?Object.assign(largeWidth,progressArticleStyle):Object.assign(smallWidth,progressArticleStyle)}>
      {this.state.moodSlect===mood?<div style={indicateStyle}></div>:null}
      <h5 style={moodStyle}>{mood}</h5>
      </div>
      )
    })}
    </div>
  )
}
}