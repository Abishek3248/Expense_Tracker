import { auth,provider } from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import "./styles.css"

export const Auth = () =>{
const navigate = useNavigate();

    const signin = async()=>{
        const results=await signInWithPopup(auth,provider);
// console.log(results);
            const authInfo = {
                userId : results.user.uid,
                uname : results.user.displayName,
                profilePhoto : results.user.photoURL,
                isAuth: true
            }
localStorage.setItem("auth",JSON.stringify(authInfo));
navigate("\expense-tracker")
    }

    return <div className="login-page">
        <p>Sign In with Google to continue</p>
        <button onClick={signin}>Sign in with Google</button>
    </div>
}