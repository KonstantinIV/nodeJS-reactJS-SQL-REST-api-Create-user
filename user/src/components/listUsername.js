import React from "react";

export default class ListUsername extends React.Component {
    constructor(props) {
     super(props);
      this.state = {
        
        classBool : false,
        chosenitem : this.props.chosenitem,
        username   : this.props.username
      };
  
    }
    render() {
      return (
        <tr   id={this.props.id} className={this.state.classBool  ? "tr" : "" } onClick={function(){ /*this.changeColor(this) ;*/ this.props.onClick(this)}.bind(this)} >
          <td>{this.props.number}</td>
          <td>{this.state.username}</td>
        </tr>
      );
    }
  }