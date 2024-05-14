import auth from "../authentication/auth";

export const addNewMockByUser = async (mockDetails:any) => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.isAuthenticated()
            },
            body: JSON.stringify(mockDetails)
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllMocks = async ({token}:{token:string}) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/all`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth?.isAuthenticated() || token

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}


export const getAllMocksByUser = async () => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/user`, {
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

export const getAllAttemptedMocksByUser = async () => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/attempted/user`, {
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

export const getMockByID = async (id: string) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/` + id, {
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

export const updateMockByID = async (mockDetails: any,mockId:string) => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/update/`+mockId, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.isAuthenticated()
            },
            body: JSON.stringify(mockDetails)
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getPendingMockByUser = async () => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/pending`, {
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

export const getMockAccessByUser = async (mockId: string,token?:string) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/access/new/` + mockId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + ( auth?.isAuthenticated() || token )

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllDetailsAboutMock = async ({mockId,token}:{mockId?:any,token?:any}) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/details/all/` + mockId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + (auth?.isAuthenticated() || token)

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllDetailsAboutMockResultPage = async ({ mockId, token }: { mockId?: any, token?: any }) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/details/result/` + mockId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + (auth?.isAuthenticated() || token)

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const updateMockBundleSubmit = async (bundleId: string,token:string) => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/bundle/${bundleId}/submit` , {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth?.isAuthenticated() || token
            }
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const updateMockBundleNextStatus = async (bundleId: string, token: string) => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/bundle/${bundleId}/next`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth?.isAuthenticated() || token
            }
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllMocksByPageAndFilter = async ({pageSize=5,pageNumber=1}:{pageSize?:number,pageNumber?:number}) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/pagination/all?pageSize=${pageSize}&pageNumber=${pageNumber}` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + (auth?.isAuthenticated())

            }

        })

        return response.json()

    } catch (error: any) {
        return console.error(error.message)
    }
}


export const deleteAttemptedMockByUser = async (mockId: string) => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/mock/details/delete/${mockId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.isAuthenticated()
            }
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}