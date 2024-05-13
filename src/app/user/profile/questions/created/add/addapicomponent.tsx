
"use server";

import { addNewQuestionByUser } from "@/features/apiQueries/questionapi";


export const handleAddQuestionResponse = async (questionDetails:any,token:string) => {
  
    let response = await addNewQuestionByUser(questionDetails || {},token);

    return response;
}