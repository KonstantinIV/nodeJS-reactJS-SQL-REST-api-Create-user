import React from "react";

import ListUsername from './listUsername';

export default class ListUser extends React.Component {
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