import auth from "../authentication/auth";

export const getAllCategories = async () => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/category/all`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":"Bearer " + auth.isAuthenticated()
            }
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}


export const getAllParentCategories = async () => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/category/parent/all`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + auth.isAuthenticated()
            }
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}

export const getAllSubCategories = async (parentId:String) => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/category/parent/${parentId}/subcategory`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + auth.isAuthenticated()
            }
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}


export const addNewCategoryByUser = async (categoryDetails:any) => {
    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/category/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + auth.isAuthenticated()
            },
            body:JSON.stringify(categoryDetails)
        })

        return await response.json();

    } catch (error: any) {
        return console.error(error.message)
    }
}