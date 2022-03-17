
import {Link} from "react-router-dom";
import "../App.css";



const Home = () => {
    
    return (
      <div>
        <h2>Du är inloggad </h2>
        <Link className="homelink" to="/"> Logout</Link>
      </div>
    );
  };
  export default Home;