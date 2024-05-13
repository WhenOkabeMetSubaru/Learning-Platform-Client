
export const signUpUser = async (userDetails:UserSignupProps) => {
    try {

  
        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/user/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })

        return await response.json();

    } catch (error:any) {
        return console.error(error.message)
    }
}

export const loginUser = async ( userDetails:UserLoginProps) => {

    try {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/user/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(userDetails)

        })

        return response.json()

    } catch (error:any) {
        return console.error(error.message)
    }
}