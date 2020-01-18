import React from "react";
/*
function ListUsername(props){
  const [color,setColorItem] = useState(0);
   const newHandle  = React.useCallback(itemUser => {
     setDeleteItem(items => items.filter(item => item.props.id !== itemUser.props.id));
   }, [setDeleteItem]);

   const newHandle  = React.useCallback(itemUser => {
     setColorItem(false);
   }, [setDeleteItem]);

   return (
    <tr   id={this.props.id} className={this.color  ? "tr" : "" } onClick={function(){ this.newHandle ; this.props.onClick(this)}.bind(this)} >
      <td>{this.props.number}</td>
      <td>{this.state.username}</td>
    </tr>
  );
}*/


export default class ListUsername extends React.Component {
    constructor(props) {
     super(props);


   
      this.state = {
        
        classBool : false,
        username   : this.props.username
      };
  
    }
    render() {
      return (
        <tr   id={this.props.id} className={this.state.classBool  ? "tr" : "" } onClick={function(){  this.props.onClick(this)}.bind(this)} >
          <td>{this.props.number}</td>
          <td>{this.state.username}</td>
        </tr>
      );
    }
  }