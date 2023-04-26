import Navbar from "./Components/Navbar";
import { Routes, Route } from 'react-router-dom';
import "./App.css";
// import Searchbar from './Components/Searchbar';


import Search from './Pages/Search';
import Calendar from './Pages/Calendar';
import Login from './Pages/Login';
import Courses from './Pages/Courses';
import Home from './Pages/Home';



function App() { 
    return (
      <>
        <Navbar />
        <div className="container">
          {/* <Component /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
          {/* <Searchbar /> */}
        </div>
       
      </>
    )


}

export default App;
