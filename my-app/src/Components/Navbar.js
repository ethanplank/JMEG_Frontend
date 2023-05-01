import {Link, useMatch, useResolvedPath} from "react-router-dom"

export default function Navbar() {
  
    return (
      <nav className="navigation">
        <Link to="/" className="logo">
          <img src="https://s3.amazonaws.com/file.imleagues/Images/Schools/Uploaded/201809/201896104357586f1f749d9908dfbd634e1f4c9fd1376c5.jpg" width={40} height={40} />
        </Link>
        <Link to="/" className="brand-name">
          Schedulr
        </Link>
        <div
          className="navigation-menu">
          <ul>
            <CustomLink to="/search">Search</CustomLink>
            <CustomLink to="/calendar">Calendar</CustomLink>
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
      <li className={isActive === to ? "active" : ""}>
        <Link to={to} {... props}>{children}</Link>
      </li>
    )
  }