import { Link } from "react-router-dom";
import AuthApi from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import InputField from "../fields/InputField";
import FixedPlugin from "../fixedPlugin/FixedPlugin";
import foodimage from "../../assets/foodimage.png";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  // const [agreement, setAgremment] = useState(true);
  const [firstName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const is_active = "true";

  const [error, setError] = useState(undefined);
  const [buttonText, setButtonText] = useState("Sign up");
  const register = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (firstName === "") {
      return setError("You must enter your username.");
    }
    if (email === "") {
      return setError("You must enter your email.");
    }
    if (password === "") {
      return setError("You must enter a password.");
    }
    try {
      setButtonText("Signing up");
      let response = await AuthApi.Register({
        username: firstName,
        email,
        password,
        is_active,
      });
      console.log(response);
      if (response.data && response.data.success === true) {
        setButtonText("Signing  up");
        setError(response.data.msg);
        return navigate("/login");
      }
    } catch (err) {
      setButtonText("Sign up");
      if (err.response) {
        return setError(err.response.data.msg);
      }
      console.log(err);
      return setError("There has been an error.");
    }
  };
  return (
    <div className=" px-16 h-screen  md:pt-8 ss:py-4 ss:px-6 bg-lightPrimary dark:!bg-navy-900 ">
      <div className="  grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-2 pt-8  grid-flow-col h-full gap-4 ">
       {/* Sign in section */}
       <div className=" flex flex-col md:px-14 lg:px-20  justify-center ">
          <h4 className="mb-2.5 text-xl md:text-4xl font-bold text-navy-700 dark:text-darktext">
            👋 Register here
          </h4>
          <p className="md:mb-9 md:ml-1 text-base text-navy-800">
            Enter your email and password to register
          </p>

          {/* Email */}
          <form method="submit">
            <InputField
              onChange={(event) => {
                setName(event.target.value);
                setError(undefined);
              }}
              variant="auth"
              name="password"
              extra="mb-3"
              label="Username*"
              placeholder="Min. 8 characters"
              id="usernmae"
              type="text"
              value={firstName}
              autoComplete="current-password"
            />
            <InputField
              onChange={(event) => {
                setEmail(event.target.value);
                setError(undefined);
              }}
              autoComplete="mail"
              name="email"
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="Email"
              type="email"
              value={email}
            />
            <InputField
              onChange={(event) => {
                setPassword(event.target.value);
                setError(undefined);
              }}
              autoComplete="passoword"
              name="password"
              variant="auth"
              extra="mb-3"
              label="password*"
              placeholder="mail@simmmple.com"
              id="password"
              type="password"
              value={password}
            />

            {/* Checkbox */}
            <button
              type="Submit"
              onClick={register}
              className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-lightPrimary transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              {buttonText}
            </button>
          </form>

          <h1 className="text-red-700">{error}</h1>

          <div className="mt-4">
            <span className=" text-sm font-medium text-navy-700 dark:text-darktext">
              Already have an account
            </span>

            <Link
              className=" flex float-right ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-darktext"
              to="/login"
            >
              Login Here
            </Link>
          </div>
        </div>
        
        <div className="flex  mr-10 absolute right-5 sm:hidden ss:hidden  w-full md:block lg:w-[49vw] 2xl:w-[44vw]">
  <img
  src={foodimage}
    className=" h-full w-full justify-center bg-cover bg-top "
  />
   <FixedPlugin />
</div>
      </div>
    </div>
  );
}

export default Register;
