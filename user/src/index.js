import React from "react";
import ReactDOM from "react-dom";

import "./bootstrap.min.css";
import "./App.css";

class ListUsername extends React.Component {
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

class ListUser extends React.Component {
  render() {
    return (
      <table>
        <caption>Users</caption>

        <tbody>
          <tr>
            <th>Nr.</th>
            <th>Username</th>
          </tr>
          {Object.keys(this.props.users).map((id,index) => (
            <ListUsername
            id={id} 
            chosenitem={this.props.chosenitem} 
            onClick={this.props.saveChosenItem} 
            key={id}
            username={this.props.users[id]}
            number={index+1}
          />
      ))
          
          
          
          }
        </tbody>
      </table>
    );
  }
}

class Base extends React.Component {
   
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

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.request = new XMLHttpRequest();
    this.state = {
      html: [],
      username: "",
      users: {},
      number: 1,
      classBool: false,
      chosenitem: false,
      copyHtml : []
    };
    this.getUsernames();
    this.handleChange = this.handleChange.bind(this);
    this.saveChosenItem = this.saveChosenItem.bind(this);
    this.putClick = this.putClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    //this.componentDidMount = this.componentDidMount.bind(this);

  }
  saveChosenItem(item) {
    
    //If ther is already selected item, remove the color
    if (this.state.chosenitem !== false) {
      this.state.chosenitem.setState({
        classBool: false
      });
    }
    //Change selected items color
    item.setState({
      classBool: true
    });
    //Set selected item
    this.setState({
      chosenitem: item,
      username: item.props.username
    });
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  restApi(requestType, URL, callBack) {
    var data;
    this.request.open(requestType, URL, true);
    this.request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    this.request.send();
    console.log( this.request.statusText);  
    this.request.onreadystatechange = function() {
      if (this.request.readyState === XMLHttpRequest.DONE) {
        //console.log(JSON.parse(request.response));
        data = JSON.parse(this.request.response);
        callBack(data);
      }
    }.bind(this);
return false;
  }
  getUsernames() {
    
    this.restApi("GET", "/user", users => {
        var obj = {};

        users.forEach(user => obj[user.ID] = user.username);


        this.setState({
          users : obj
        });

        console.log(this.state.users)
     
      
    });
  }
  postClick() {
    //this.preventDefault();
   
    this.restApi("POST", "/user?username=" + this.state.username, result => {
      console.log(result);
      this.setState(prevstate => {
        let objCopy = prevstate.users;
        objCopy[result] = this.state.username;
        return objCopy;
       /* users: this.state.users.concat(
          {username:username, ID : result}
        )*/
      });
    });
  }
  
  putClick() {
    console.log(this.state.chosenitem);
    this.restApi(
      "PUT",
      "/user?usernameNew=" +
        this.state.username +
        "&ID=" +
        this.state.chosenitem.props.id,
      result => {
        
          this.state.chosenitem.setState({
            username: this.state.username
          });
         
       
      }
    );
  }
  deleteClick(){

    this.restApi(
      "DELETE",
      "/user?ID=" +
        this.state.chosenitem.props.id,
      result => {
      
      this.setState(prevstate => {
          
        let objCopy = prevstate.users;
        delete objCopy[this.state.chosenitem.props.id];

        return objCopy;
       
      });
   this.setState( {
          
     chosenitem : false
       
      });
   
      }
    );
  }

  usernameRow(username, number, ID) {

    return (
      <ListUsername
        id={ID}
        chosenitem={this.state.chosenitem}
        onClick={this.saveChosenItem}
        key={number}
        username={username}
        number={number}
      />
    );
  }



  render() {
    return (
      <div>
        <Base
          onClick={() => this.postClick()}
          onChange={this.putClick}
          onDelete={this.deleteClick}
          handleChange={this.handleChange}
          value={this.state.username}
        />
        <ListUser html={this.state.html} users={this.state.users} saveChosenItem={this.saveChosenItem} number={this.state.number}/>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
