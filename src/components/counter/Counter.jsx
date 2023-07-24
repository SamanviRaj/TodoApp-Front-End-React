import React, { useState } from 'react'
import "./Counter.css"

export default function Counter() {

const state = useState(1);

const [count, setCount] = useState(0);

function incrementFunction(){
    setCount(count+1);
    console.log(state);
    console.log('counter incremented');
}

  return (
    <div className="counter">
        <span className="count">{count}</span>
        <div>
            <button className="counterButton"
                    onClick={incrementFunction}
            >+1              
            </button>
        </div>
    </div>
  )
}
