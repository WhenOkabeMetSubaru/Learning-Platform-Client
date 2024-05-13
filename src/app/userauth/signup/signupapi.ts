

"use server";
import {  signUpUser } from "../../../features/apiQueries/userapi";

export const handleSignupResponse = async (userDetails: UserSignupProps) => {
   
    let response = await signUpUser(userDetails);

    return response;
}