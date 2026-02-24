import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff,Mail,User,Lock } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const SignUp = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [error,setError]=useState("")

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data = await response.json()

            if (response.ok) {
                alert("Account ceated succesfully! Now please login.")
                navigate("/login")
            } else {
                setError(data.detail || "Signup failed.Try agoin.")
            }

        } catch (err) {
            console.log("Connection Error:", err);
            setError("Network error. Please check tour connection.")
        }finally{
            setIsSubmitting(false)
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
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <User size={18}/>
                            </span>
                            <input
                                type='text'
                                required
                                className="w-full px-5 py-4 pl-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:border-orange-500 focus:ring-orange-100 outline-none transition-all"
                                placeholder="Enter your name"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Adress</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Mail size={18}/>
                            </span>
                            <input
                             type="email"
                             required
                             className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                             placeholder="example@gmail.com"
                             value={formData.email}
                             onChange={(e)=>setFormData({...formData,email:e.target.value})}      
                            />
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-bold text-slate-700 mg-2 ml-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-600 transition-colors "
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <div className="bg-red-50 border-red-200 text-red-600 px-4 py-3 rounded-2xl text-2xl font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                            <span className="bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">!</span>
                            {error}
                        </div>
                    )}
                    <button 
                     disabled={isSubmitting}
                     className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2
                        ${isSubmitting
                            ?"bg-slate-300 cursor-not-allowed text-slate-500"
                            :"bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-100 cursor-pointer"

                        }`}
                    >
                        {
                            isSubmitting?(
                                <>
                                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"/>
                                Creating Account
                                </>
                            ):(
                                "Sign Up"
                            )
                        }
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