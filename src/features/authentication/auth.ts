"use client"
const auth = {
    isAuthenticated() {
        if (typeof window == 'undefined') { return false };

        if (sessionStorage.getItem('jwt')) {
            return JSON.parse(sessionStorage.getItem('jwt')!)
        } else return false
    },
    authenticate(jwt:String, cb:Function) {
        if (typeof window !== 'undefined')
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        cb()
    },
    clearJWT(cb:Function) {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('jwt')
        }
        cb()
        // signout().then((data)=>{
        //     document.cookie = "t=' expires=Thu,01 Jan 2030 00:00:00 UTC; path=/;"
        // })
    }
}

export default auth