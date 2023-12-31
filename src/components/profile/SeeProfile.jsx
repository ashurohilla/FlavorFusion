import { useState, useEffect } from "react";
import DashApi from "../../dashboardapis/api";
import ProfileImage from "./ProfileImage";
function Profiledetail() {
  const [error, setError] = useState(undefined);
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
  }, []); // Empty dependency array for the initial effect

  return (
    <div className=" bg-lightPrimary  dark:bg-navy-900 h-full w-full py-[100px]">
      <ProfileImage />

      <div className="">
        {profiles && (
          <div key={profiles.id}>
            {/* Background and profile */}

            {/* Name and position */}
            <div className="mt-16 flex flex-col items-center">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                {profiles.name}
              </h4>
            </div>

            {/* Post followers */}
            <div className="mt-6 mb-3 flex gap-4 md:!gap-14 justify-center">
            </div>
            <div className="mb-6  grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 justify-between ">
              <h1 className="text-navy-700 dark:text-white text-sm sm:text-lg md:text-lg xl:text-xl flex justify-center">
                <span className="font-bold text-navy-800 dark:text-white">
                  <h1 className="text-black dark:text-cyan-900">Website:</h1>{" "}
                </span>
                {profiles.website}
              </h1>
              <h1 className="text-navy-700 dark:text-white text-sm sm:text-lg md:text-lg xl:text-xl flex justify-center">
                <span className="font-bold text-navy-800 dark:text-white">
                  <h1 className="text-black dark:text-cyan-900">Location:</h1>{" "}
                </span>{" "}
                {profiles.location}
              </h1>
              <h1 className="text-navy-700 dark:text-white text-sm sm:text-lg md:text-lg xl:text-xl flex justify-center">
                <span className="font-bold text-navy-800 dark:text-white">
                  <h1 className="text-black dark:text-cyan-900">Contact:</h1>{" "}
                </span>{" "}
                {profiles.contact}
              </h1>
              <h1 className="text-navy-700 dark:text-white text-sm sm:text-lg md:text-lg xl:text-xl flex justify-center">
                <span className="font-bold text-navy-800 dark:text-white">
                  <h1 className="text-black dark:text-cyan-900">Address:</h1>{" "}
                </span>{" "}
                {profiles.address}
              </h1>
              <h1 className="text-navy-700 dark:text-white text-sm sm:text-lg md:text-lg xl:text-xl flex justify-center ">
                <span className="font-bold text-navy-800 dark:text-white">
                  <h1 className="text-black dark:text-cyan-900">Gender:</h1>{" "}
                </span>
                {profiles.Gender}
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profiledetail;
