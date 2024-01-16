export const useGetUserInfo=()=>{
    const {uname,profilePhoto ,userId,isAuth} = JSON.parse(localStorage.getItem("auth"));

    return {uname,profilePhoto,userId,isAuth}
}