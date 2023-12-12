import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Hola from "../auth/hola";
import { Sign } from "crypto";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome Admin</h2>
//         </div>
//         <p className="App-intro">Admin options</p>
//         <ul>
//           <li style={{ margin: "0.5em" }}>
//             <button>Create/modify user</button>
//           </li>
//           <li style={{ margin: "0.5em" }}>
//             <button>Create/modify product</button>
//           </li>
//           <li style={{ margin: "0.5em" }}>
//             <button>Create/modify category</button>
//           </li>
//           <li style={{ margin: "0.5em" }}>
//             <button>Create/modify review</button>
//           </li>
//           <li style={{ margin: "0.5em" }}>
//             <button>Create/modify purchase history</button>
//           </li>
//         </ul>
//         {/* <Hola /> */}
//       </div>
//     );
//   }
// }

const App = () => {
  return (
    <div>
      <Hola />
    </div>
  );
};
export default App;
