import { useContext, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {Eye,EyeOff,LogIn,Mail} from 'lucide-react'
import { CartContext } from "../context/CartContext";


const Login = () => {
    const {fetchCart}=useContext(CartContext)
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false)
    const [isLoggingIn,setIsLoggingIn]=useState(false)
    const navigate=useNavigate();

    const handleLogin=async (e)=>{
        e.preventDefault();
        setIsLoggingIn(true)
        //fastapi OAuth2 excepts 'from-data'(username/password) in backend not a JSON object fro the login route specifically
        const formData=new URLSearchParams();
        formData.append('username',email);
       formData.append('password',password)

        try{
            const response=await fetch("/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                body:formData
            })
            const data=await response.json()

            if(response.ok){
                localStorage.setItem("token",data.access_token)
                localStorage.setItem("userEmail",email);
                //this will wake up the cart and fetches items for thw new token
              await fetchCart()
                alert("welcome back!");
                navigate('/')
            }else{
                alert(data.detail || "Invalid email or password")
            }

        }catch(err){
            console.log(err.message)
        }finally{
            setIsLoggingIn(false)
        }
    }

    return ( 
        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="max-w-md w-full bg-white p-10 rounded-[40px]  shadow-2xl shadow-slate-200 border border-slate-50 ">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-full mb-4 text-orange-600">
                    <LogIn size={32}/>
                </div>
                <h1 className="text-slate-500 mt-2 font-medium">Welcome Back</h1>
                <p className="text-slate-500 mt-2 font-medium">Log into order your favorites!</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Mail size={18}/>
                            </span>
                    <input
                     type="email"
                     required
                     className="w-full px-5 py-4 pl-12 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                     placeholder="name@example.com"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
                    <div className="relative">
                        <input
                         type={showPassword?"text":"password"}
                         required
                         className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-ornage-500 focus:ring-4 focus:ring-orange-100 otline-none transition-all"
                         placeholder="Enter password"
                         value={password}
                         onChange={(e)=>setPassword(e.target.value)}                      
                        />
                        <button
                          type="button"
                          onClick={()=>setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orande-600 transition-colors"
                        >
                            {showPassword?<EyeOff size={20}/>:<Eye size={20}/>}
                        </button>
                    </div>
                </div>

                <button
                 disabled={isLoggingIn}
                 className={`w-full py-4 rounded-2xl font-bold shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-3
                    ${isLoggingIn
                        ?"bg-slate-300 cursor-not-allowed text-slate-500 shadow-none"
                        :"bg-orange-600 hover:bg-orange-700 text-white shadow-orange-100"

                    }`}
                >
                    {isLoggingIn?(
                        <>
                        <div className="w-5 h-5 border-2 border-salte-400 border-t-transparent rounded-full animate-spin"/>
                        Checking credentials...
                        </>
                    ):(
                        "Login"
                    )
                     
                }

                </button>

            </form>

            <p className="mt-8 text-center text-slate-500 font-medium">
                New to DesiPlates?
                <Link to="/signup" className="ml-2 text-orange-600 font-bold hover:underline">Create Account</Link>
            </p>

            </div>

        </div>
        
     );
}
 
export default Login;