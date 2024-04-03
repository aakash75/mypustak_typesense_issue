import axios from "axios";

// export const url = "http://127.0.0.1:8000";
// export const url = "http://192.168.29.15:8000";
// export const url = "http://192.168.1.121:8000";
// export const url = "http://192.168.155.1:8000";
// export const url2 = "http://127.0.0.1:8000/"; // clone backend
// export const url2 = "http://3.110.47.125/"; // new clone 
export const url2 = "https://data.mypustak.com/";
// export const url = "https://api.mypustak.com";
// export const url = "https://apistaging.mypustak.com";

export const url = "https://api.mypustak.com";
// const call_function_cookie = props => {
//   console.log(props, "============================server_cookie");
//   AuthI.defaults.headers.common["Authorization"] = `JWT ${props.server_cookie}`;
// };
const AuthI = axios.create({
  baseURL: url,
});
// console.log("AuthInstance", "====================apiurl");
// alert("Apiurl");

if (typeof window !== "undefined") {
  const getCookieArr = document.cookie.split("; ");
  let Cookie_details = getCookieArr.filter(e => e.startsWith("I="));
  if (Cookie_details.length) {
    let details = Cookie_details[0].replace("I=", "");

    let json_details = JSON.parse(details);
    const token = json_details.access;
    console.log(token, "====================apiurl");
    AuthI.defaults.headers.common["Authorization"] = `JWT ${token}`;
  }
}

// export function getServerSideProps({ req, res }) {
//   console.log(req.cookies.I, "servercookie");
//   server_cookie = req.cookies.I;

//   return { props: { server_cookie } };
// }
export const AuthInstance = AuthI;

// export default { AuthInstance, url };
