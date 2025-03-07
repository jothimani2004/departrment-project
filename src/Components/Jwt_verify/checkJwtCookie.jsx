import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import UseApiPost from '../../Custom_hook/apiPostCall';




export const checkJwtCookie = ({returnme}) => {
  const jwtCookie = Cookies.get('jwtToken');

  // Get the JWT from cookies

  async function Checker(){

    console.log(jwtCookie,"i am funciton");
    const result = await UseApiPost({path:"/Token",body:{token:jwtCookie}})

    console.log(result.data)
  }



  if (jwtCookie) {
    console.log('JWT Cookie found:', jwtCookie);

    try {
      // Decode the JWT (if needed)
      const decodedToken = jwtDecode(jwtCookie);
      console.log('Decoded Token:', decodedToken);

      // Optionally, you can check if the token is expired
      const currentTime = Date.now() / 1000; // current time in seconds
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.error('JWT token has expired');
        return null; // return null or handle the expired token case
      }
      if(returnme == "role"){
        Checker()
        console.log("this is admin account ")
        return decodedToken.jwtPayload.role; // Return the decoded token if it's valid
      }
      console.log("this is student page")
      return decodedToken; // Return the decoded token if it's valid

    } catch (error) {
      console.error('Invalid JWT:', error.message);
      return null; // Return null in case of an error
    }
  } else {
    console.log('JWT Cookie not found');
    return null; // Return null if JWT is not found
  }
}
 