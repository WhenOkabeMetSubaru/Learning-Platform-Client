

"use server";
import { loginUser, signUpUser } from "../../../features/apiQueries/userapi";

export const handleLoginResponse = async (userDetails:UserLoginProps)=>{
    "use server"
    let response = await loginUser(userDetails || {});

    return response;
}



export const handleSignupResponse = async (userDetails: any) => {
    let response = await signUpUser(userDetails || {});

    return response;
}
