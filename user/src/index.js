import React from "react";
import ReactDOM from "react-dom";

import ListUser from './components/listUser';
import UserInterface from './components/userInterface';

import "./stylesheets/bootstrap.min.css";
import "./stylesheets/App.css";



function  restApi(requestType, URL, callBack) {
  var data;
  var request = new XMLHttpRequest();

  request.open(requestType, URL, true);
  request.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  request.send();
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      data = JSON.parse(request.response);
      callBack(data);
    }
  }
}



class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: [],
      username: "",
      users: {},
      number: 1,
      classBool: false,
      chosenitem: false,
      copyHtml : []
    };
    this.getUsers();
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

 
  getUsers() {
    
    restApi("GET", "/user", users => {
        var obj = {};
        users.forEach(user => obj[user.ID] = user.username);


        this.setState({
          users : obj
        });

        console.log(this.state.users)
     
      
    });
  }
  postClick() {
   
    restApi("POST", "/user?username=" + this.state.username, result => {
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
    restApi(
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

    restApi(
      "DELETE",
      "/user?ID=" +
        this.state.chosenitem.props.id,
      result => {
      
      this.setState(prevstate => {
          
        let objCopy = prevstate.users;
        delete objCopy[this.state.chosenitem.props.id];

        return objCopy;
       
      });
   this.setState({
     chosenitem: false
   });
   
      }
    );
  }

 



  render() {
    return (
      <div>
        <UserInterface
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
