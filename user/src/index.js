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
          {this.props.html}
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
      number: 1,
      classBool: false,
      chosenitem: false
    };
    this.getUsernames();
    this.handleChange = this.handleChange.bind(this);
    this.saveChosenItem = this.saveChosenItem.bind(this);
    this.putClick = this.putClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);

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
    this.request.onreadystatechange = function() {
      if (this.request.readyState === XMLHttpRequest.DONE) {
        //console.log(JSON.parse(request.response));
        data = JSON.parse(this.request.response);
        callBack(data);
      }
    }.bind(this);

  }
  getUsernames() {
    this.restApi("GET", "/user", username => {
      username.forEach(username => {
        this.setState({
          html: this.state.html.concat(
            this.usernameRow(username.username, this.state.number, username.ID)
          )
        });
      });
    });
  }

  postClick() {
    this.restApi("POST", "/user?username=" + this.state.username, result => {
      console.log(result);
      var username = this.state.username;
      this.setState({
        html: this.state.html.concat(
          this.usernameRow(username, this.state.number)
        )
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
    console.log(this.state.chosenitem);
    this.restApi(
      "DELETE",
      "/user?ID=" +
        this.state.chosenitem.props.id,
      result => {
        console.log(this.state.html[0]);
        /*this.state.chosenitem.setState({
          username: this.state.username
        });*/
      }
    );
  }



  usernameRow(username, number, ID) {
    this.setState({ number: number + 1 });

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
        <ListUser html={this.state.html} />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
