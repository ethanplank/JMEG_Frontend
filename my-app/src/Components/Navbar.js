import {Link, useMatch, useResolvedPath} from "react-router-dom"
export default function Navbar() {
  
    return (
      <nav className="navigation">
        <Link to="/" className="brand-name">
          Schedulr
        </Link>
        <div
          className="navigation-menu">
          <ul>
            <CustomLink to="/home">Home</CustomLink>
            <CustomLink to="/calendar">Calendar</CustomLink>
            <CustomLink to="/courses">Courses</CustomLink>
            <CustomLink to="/login">Login</CustomLink>
          </ul>
        </div>
      </nav>
    );
  }

  function CustomLink({to , children, ...props}){
    //const path = window.location.pathname
    const resovledPath  = useResolvedPath(to)
    const isActive = useMatch({path: resovledPath.pathname, end: true})
    return (
      <li className={isActive == to ? "active" : ""}>
        <Link to={to} {... props}>{children}</Link>
      </li>
    )
  }