import { useState } from "react";
import {useNavigate,Link} from 'react-router-dom'
import {Eye,EyeOff} from 'lucide-react'

const SignUp = () => {
  const [formData,setFormData]=useState({
    full_name:"",
    email:"",
    password:""
  })

  const [showPassword,setShowPassword]=useState(false)

  const navigate=useNavigate()

  const handleSignup=async (e)=>{
    e.preventDefault()
    try{
        const response=await fetch('/api/auth/signup',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        })
      const data=await response.json()

      if(response.ok){
        alert("Account ceated succesfully! Now please login.")
        navigate("/login")
      }else{
        alert(data.detail|| "Signup fialed. Try again.")
      }

    }catch(err){
        console.log("Connection Error:",err);
    }
  }


    return ( 
       <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-50">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-slate-900">Create Account</h1>
                <p>Join the Desiplates community!</p>
            </div>
            <form onSubmit={handleSignup} className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
                    <input
                     type='text'
                     required
                     className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:border-orange-500 focus:ring-orange-100 outline-none transition-all"
                     placeholder="Enter your name"
                     onChange={(e)=>setFormData({...formData,full_name:e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mg-2 ml-1">Password</label>
                    <div className="relative">
                        <input
                        type={showPassword?"text":"password"}
                        required
                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                        placeholder="Create a password"
                        onChange={(e)=>setFormData({...formData,password:e.target.value})}          
                        />
                        <button
                          type="button"
                          onClick={()=>setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-1/2 text-slate-400 hover:text-orange-600 transition-colors "
                        >
                            {showPassword? <EyeOff size={20}/>:<Eye size={20}/>}
                        </button>                      
                    </div>
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-orange-100 transition-all active:scale-95">
                    Sign Up
                </button>
            </form>
            <p className="mt-8 text-center text-slate-500 font-medium">
                Already have an account? <Link to="/login" className="text-orange-600 font-bold hover:underline">Login in</Link>
            </p>
        </div>        
       </div>
     );
}
 
export default SignUp;