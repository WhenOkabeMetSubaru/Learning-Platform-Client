import auth from "../authentication/auth";

export const addNewQuestionByUser = async (questionDetails:any,token:string) => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/question/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer " + token
            },
            body: JSON.stringify(questionDetails)
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllQuestions = async () => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/question/all`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer " + auth.isAuthenticated()

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}


export const getAllQuestionsByUser = async () => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/question/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.isAuthenticated()

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllAttemptedQuestionsByUser = async () => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/question/user/attempt/all`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.isAuthenticated()

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getQuestionByID= async (id:string) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/question/` + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.isAuthenticated()

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllQuestionsByBundle = async (bundleId:string) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/question/bundle/` + bundleId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.isAuthenticated()

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllQuestionsByMock = async (mockId: string) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/question/mock/` + mockId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.isAuthenticated()

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const updateQuestionStatusForMock = async (question_status: any,user_answer:any, questionId:string, token: string) => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/question/update/mock/` + questionId, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth?.isAuthenticated() || token
            },
            body: JSON.stringify({question_status,user_answer})
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllQuestionsHomePage = async () => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/question/home/all`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.isAuthenticated()

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}


export const getQuestionDetails = async (questionId:string) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/question/view/home/user/` + questionId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth?.isAuthenticated()

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllQuestionsByPageAndFilter = async ({pageNumber,pageSize=5}:{pageNumber:number,pageSize:number}) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/question/pagination/all?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth?.isAuthenticated()

            }
        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}