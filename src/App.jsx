import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "../style";
import Home from "./components/Home";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import Loginpage from "./components/authentication/Loginpage";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/authentication/Register";
import NotFound from "./components/NotFound";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/Profilepage";
import Profiledetail from "./components/profile/SeeProfile";


function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
        <Route element={<Home />} path="/" exact />
          <Route element={<Register />} path="register" exact />
          <Route path="/login" element={<Loginpage />} />

          <Route element={<PrivateRoutes />}>


            <Route element={<Dashboard />} path="/dashboard" />
           
            <Route path="/Profile" element={<Profile />}>
                <Route index element={<Profiledetail />} />
                <Route path="profilepage" element={<Profiledetail />} />
                <Route path="createprofile" element={<CreateProfile />}></Route>
              </Route>



          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <div className=" w-full overflow-hidden " id="Home">
        <div className={`${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}></div>

          <div className="bg-black-gradient"></div>
        </div>
      </div>
      <div className={`${styles.boxWidth}`}></div>
    </div>
  );
}

export default App;
