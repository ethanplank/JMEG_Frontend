import Navbar from "./Components/Navbar";
import { Routes, Route } from 'react-router-dom';
import "./App.css";


import Home from './Pages/Home';
import Calendar from './Pages/Calendar';
import Login from './Pages/Login';

function App() {
    // let Component
    // switch(window.location.pathname) {
    //   case "/":
    //     Component = Home
    //     break
    //   case "/home":
    //     Component = Home
    //     break
    //   case "/calendar":
    //     Component = Calendar
    //     break
    //   case "/login":
    //     Component = Login
    //     break
    // }

   
    return (
      <>
        <Navbar />
        <div className="container">
          {/* <Component /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
       
      </>
    )


}

export default App;
