import React from "react";


export default class UserInterface extends React.Component {
   
    render() {
      return (
        <div className="userContainer">
          <input
            className="inputDef"
            type="text"
            name="firstname"
            value={this.props.value}
            onChange={this.props.handleChange}
            spellCheck={false}
  
          />
          <button className="buttonDef" onClick={() => this.props.onClick()}>
            Post
          </button>
          <button className="buttonDef">Get</button>
          <button className="buttonDef"  onClick={() => this.props.onChange()}>Change</button>
          <button className="buttonDef" onClick={() => this.props.onDelete()}>Delete</button>
        </div>
      );
    }
  }