import React, { Component } from 'react';

export default class StarRateBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: '#D3D3D3',
      progressColor: '#aaa',
      background:this.props.reviews.length===0? '#666666' : 'black',
      click:true,
      index:null,
      rate:this.props.ratings === undefined ? 0: Number(((this.props.ratings/this.props.ratingSum)*100).toFixed(2)),
      underline:this.props.reviews.length===0? 'line-through' : 'underline'
    };
  }


  renderProgress() {
    const progressItemStyle = {
      width: `${this.state.rate}%`,
      height: '100%',
      lineHeight: '100%',
      padding: '0px 4px',
      background:`${this.state.background}`
    };

    return (
      <div
      style={Object.assign(progressItemStyle, {
        color: `rgb(${this.props.progressColor}`,
      })}>
    </div>
    )
  }

  render() {
    const progressStyle = {
      display: 'flex',
      color: this.state.progressColor,
      marginTop:'10px'
    };

    const progressArticleStyle = {
      position:'relative',
      height: '10px',
      width: '77%',
      display: 'flex',
      overflow: 'hidden',
      marginTop: '5px',
      color: this.state.progressColor,
      background: this.state.bgColor,
    };

    const defaultStyle ={
        display: 'flex',
        alignItems: 'center',
        justifycontent: 'center',
        width: '45px',
        marginRight:'5px',
        background: '#ffffff',
        textDecoration:`${this.state.underline}`,
        outline: 'none',
        cursor: 'pointer',
    }

    const active = {
      borderRadius: '10%',
      boxShadow: `inset 0px -2px 6px rgba(255, 252, 252, 0.1),
                  inset 4px 5px 10px rgba(0, 0, 0, 0.1)`,
    }
    const onClick = (e) =>{
      if(this.props.reviews.length===0){
        return;
      }
      if(this.state.click){
        this.props.setSortByStar(this.props.star,this.state.click)
        this.state.click = false;
        return
      }
      if(!this.state.click){
        this.props.setSortByStar(this.props.star,this.state.click)
        this.state.click = true;
        return
      }
    }

    return (
      <>
      <div style={progressStyle}>
      <h5
      style={this.state.click?defaultStyle:Object.assign(defaultStyle,active)}
      onClick={onClick}
      >
      {this.props.star} Star
        </h5>
        <div style={progressArticleStyle}>{this.state.rate>0?this.renderProgress():null}</div>
      </div>
      </>
    );
  }
}
