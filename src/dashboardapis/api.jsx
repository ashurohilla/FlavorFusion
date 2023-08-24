import axios from "./index";


class DashApi {
  static Employelist = () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    return axios.get(`${base}/employelist/${id}/`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };


}

let base = "dashboard";

export default DashApi;