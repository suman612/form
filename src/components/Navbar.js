import React from "react";
import { Link, useLocation  } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  let history = useHistory()
const handleLogout =()=>{

  localStorage.removeItem('token')
  history.push('/login')
}

  let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location])
  return (
    <div name="top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <li className="navbar-brand">
          A1 Nataraj Academy
        </li>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
           {!localStorage.getItem('token')?  <li className={`nav-item ${location.pathname==="/"?"active": ""}`}>
           <Link className="nav" to="#">
              <span className="sr-only"></span>
              </Link>   
            </li>:
            
            <li className="navbar-text " >
              
              <Link className="nav-link" to="/formList">
              Form List  <span className="sr-only">(current)</span>
              </Link>
            <Link className="nav-link " to="/">
              Registration<span className="sr-only">(current)</span>
              </Link>
            </li> }
           
          </ul>
          
         {!localStorage.getItem('token')? <form className="d-flex">
           <Link className="btn btn-primary mx-1" to="/login" role="button">login</Link>
           <Link className="btn btn-primary mx-1" to="/signup"  role="button">Signup</Link>
          </form>:  
          <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          }
        </div>
      </nav>
      
      {/* {localStorage.getItem('token').name} */}
    </div>
  );
};

export default Navbar;
