import React, { useState } from "react";
import ReactDOM from "react-dom";

function ListUser(props){
  
  return (
    
      <tr >
        <td onClick={props.onClick}>{props.number}</td>
      </tr>
    
  )
}


function Example() {
    // Declare a new state variable, which we'll call "count" [90,90,231,123123,13,123,123,2,312,312,3,2,34]
    var arr = [90909,900909,9870809,123,123,123123,213123,123123,12321,312312321,12312,123,123123,123,123123,123,123,123,213,123,21,3123,23123,213,123,213,213,213,213,123,123,123,123123434,342343235,43532423,43253245,32432532,412312,43325,325345,4324,2353,24324];
    for (var i = 0; i < 10000; i++) {
      arr.push(i);
    }
    const [numbers,setNumbers] = useState(arr);

    const Line = React.memo(({  number, onClick }) => {
      return (
        <li onClick={() => onClick(number)}>
          {number}
        </li>
      );
    });

    const handl = React.useCallback(num => {
      setNumbers(numbers => numbers.filter(numbero => numbero !== num));
    }, []);

    return (
      <div>
      
            {numbers.map((numbero) => (
  <ListUser
  number={numbero}
  onClick={() => setNumbers(  numbers.filter(number => number !== numbero))}
  
/>
            ))}
<ul>


        {/*numbers.map((number) => (
  <Line
  number={number}
  onClick={handl}
  
/>
        ))*/}
        </ul>
      </div>
    );
  }


ReactDOM.render(<Example />, document.getElementById("root"));
