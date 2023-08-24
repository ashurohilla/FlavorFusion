import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import DashApi from "../../dashboardapis/api";
import { IMAGE_API } from "../../config/constant";
import Dropdown from "../dropdown/Dropdown";
const Navbar = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const [error, setError] = useState(null);

  // const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U"; // 'U' stands for "User" if no name is available
  };
  const Logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    return navigate("/login");
  };
  const [profileImage, setProfileImage] = useState(undefined);
  const [profiles, setProfile] = useState([]);
  useEffect(() => {
    const SeeProfile = async (event) => {
      if (event) {
        event.preventDefault();
      }
      try {
        let response = await DashApi.SeeProfile();
        setProfile(response.data[0]);
        console.log(response);
        if (response.data && response.data.success === true) {
          return setError(response.data.msg);
        }
      } catch (err) {
        console.log(err);
        if (err.response) {
          return setError(err.response.data.msg);
        }
        return setError("There has been an error.");
      }
    };

    SeeProfile(); // Call the function here
  }, []);

  useEffect(() => {
    // Fetch the image URL or path from the API
    const fetchProfileImage = async () => {
      try {
        const response = await DashApi.Getimage();
        setProfileImage(response.data[0]);
        console.log(response); // Assuming `message` contains the image URL
        if (response.data && response.data.success === true) {
          return setError(response.data.msg);
        }
      } catch (err) {
        console.log(err);
        if (err.response) {
          return setError(err.response.data.msg);
        }
        return setError("There has been an error.");
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <nav className=" top-4 z-40 flex flex-row flex-wrap items-center bg-[#C2CAD0]] justify-between  bg-white/10 p-2 backdrop-blur-xl dark:bg-[#4f4f504d]">
      <div className="ml-[6px]">
        <div className=" w-[224px] pt-1">
          <Link
            to="/dashboard"
            className="text-lg font-normal text-white hover:underline dark:text-lightPrimary py-1 px-2 text-center  border border-white rounded-3xl "
          >
            Back
          </Link>

          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-lightPrimary dark:hover:text-white"
            to="/"
          ></Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-lightPrimary">
          <Link
            to="/Dashboard"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          ></Link>
        </p>
      </div>

      <div className="  relative mt-[3px] flex h-[61px] w-[355px] sm:w-[430px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none  md:flex-grow-0 md:gap-1  ">
        <div className="  flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-darktext dark:text-lightPrimary  ">
          <p className="lg:pl-3 lg:pr-2 text-xl">
            <FiSearch className="h-4 w-4  dark:text-navy-800" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className=" block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-white outline-none placeholder:!text-white dark:bg-lightPrimary dark:text-lightPrimary dark:placeholder:!text-white sm:w-fit"
          />
        </div>

        {/* start Notification */}

        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              setDarkmode(false);
              document.body.classList.remove("dark");
            } else {
              setDarkmode(true);
              document.body.classList.add("dark");
            }
          }}
        >
          {darkmode ? (
            <RiMoonFill className="h-4 w-4 text-lightPrimary dark:text-lightPrimary" />
          ) : (
            <RiSunFill className="h-4 w-4 text-lightPrimary dark:text-lightPrimary" />
          )}
        </div>
        <Dropdown
          classNames={"py-2 top-8 -left-[180px] w-max"}
          button={
            <div className="flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-lightPrimary dark:!border-navy-700">
              {profileImage ? (
                <img
                  className="rounded-full h-full w-full object-cover"
                  src={`${IMAGE_API}${profileImage.image}`}
                  alt="Profile"
                />
              ) : (
                <div className="initial">
                  <p className="text-[40px] font-poppins">
                    {" "}
                    {getInitial(name)}
                  </p>
                </div>
              )}
            </div>
          }
          children = {
            <div className="flex h-36 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-lightPrimary dark:shadow-none">
                {profiles ? (
                  <>👋 Hey, {profiles.name}</>
                  
                ) : (
                  <>👋 Hey, {name}</>
                )}
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 ">
                <div className="mt-3 ml-4 flex flex-col">
                  <h1
                    className="text-sm text-gray-800 dark:text-lightPrimary hover:dark:text-lightPrimary"
                  >
                    <Link to="/profile">Profile Settings</Link>
                  </h1>
                
                  <h1
                    className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                  >
                    <button onClick={Logout}>Logout</button>
                  </h1>
                </div>
              </div>
            </div>

          }
        />
      </div>
    </nav>
  )
};

export default Navbar;
