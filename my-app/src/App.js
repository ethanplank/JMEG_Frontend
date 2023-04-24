import Navbar from "./Components/Navbar";
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Search from './Components/Searchbar';


import Home from './Pages/Home';
import Calendar from './Pages/Calendar';
import Login from './Pages/Login';

function App() { 
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
          <Search />
        </div>
       
      </>
    )


}

export default App;
