import React from "react";
import ReactDOM from "react-dom";

import "./bootstrap.min.css";
import "./App.css";

class ListUsername extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.number}</td>
        <td>{this.props.username}</td>
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
        />
        <button className="buttonDef" onClick={() => this.props.onClick()}>
          Post
        </button>
        <button className="buttonDef">Get</button>
        <button className="buttonDef">Change</button>
        <button className="buttonDef">Delete</button>
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
      number: 1
    };
    this.getUsernames();
    this.handleChange = this.handleChange.bind(this);
    //this.restApi      = this.restApi.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }









   restApi(requestType, URL,callBack){
    var data;
    this.request.open(requestType, URL, true);
    this.request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    this.request.send();
     this.request.onreadystatechange =   function() {
      if (this.request.readyState === XMLHttpRequest.DONE) {
        //console.log(JSON.parse(request.response));
        data =   JSON.parse(this.request.response) ; 
        callBack(data);
      }
    }.bind(this);

  
   console.log(data);

  }
  getUsernames() {
    this.restApi("GET","/user",username => {
      username.forEach(username => {
        this.setState({
          html: this.state.html.concat(
            this.usernameRow(username.username, this.state.number)
          )
        });
    })
  
  })
  }

  

  postClick() {
    this.restApi("POST","/user?username=" + this.state.username,result => {
      console.log(result);
      var username = this.state.username;
        this.setState({
          html: this.state.html.concat(
            this.usernameRow(username, this.state.number)
          )
        });
  
  })





  }

  usernameRow(username, number) {
    this.setState({ number: number + 1 });

    return <ListUsername key={number} username={username} number={number} />;
  }

  render() {
    return (
      <div>
        <Base
          onClick={() => this.postClick()}
          handleChange={this.handleChange}
        />
        <ListUser html={this.state.html} />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));

