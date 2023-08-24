import Header from "./Dashboard/Header";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
    <Header/> 

    <Link  to ="/login"> Login</Link>
         
    </div>
  )
}

export default Home
