import auth from "../authentication/auth";

export const addNewBundleByUser = async (bundleDetails?:any) => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/bundle/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.isAuthenticated()
            },
            body: JSON.stringify(bundleDetails)
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllBundles = async () => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/bundle/all`, {
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


export const getAllBundlesByUser = async () => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/bundle/user`, {
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

export const getBundleByID = async (id: string) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/bundle/` + id, {
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

export const getPendingBundleByUser = async () => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/bundle/pending`, {
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

export const getAllBundlesByMock = async (mockId:string) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/bundle/mock/`+mockId, {
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

export const updateBundleByID = async (bundleDetails?: any,bundleId?:any,token?:any) => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/bundle/update/`+bundleId, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.isAuthenticated() || token
            },
            body: JSON.stringify(bundleDetails)
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}