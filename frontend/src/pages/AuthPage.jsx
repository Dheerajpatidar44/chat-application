import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, Facebook, Globe, Linkedin } from "lucide-react";
import toast from "react-hot-toast";
import "./AuthPage.css";

const AuthPage = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Sign Up State
    const [signUpData, setSignUpData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const { signup, isSigningUp } = useAuthStore();

    // Login State
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const { login, isLoggingIn } = useAuthStore();

    const validateSignUp = () => {
        if (!signUpData.fullName.trim()) return toast.error("Full name is required");
        if (!signUpData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(signUpData.email)) return toast.error("Invalid email format");
        if (!signUpData.password) return toast.error("Password is required");
        if (signUpData.password.length < 6) return toast.error("Password must be at least 6 characters");
        return true;
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        if (validateSignUp() === true) signup(signUpData);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        login(loginData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className={`auth-container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">

                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUpSubmit} className="flex flex-col items-center justify-center h-full px-10 text-center bg-base-100">
                        <h1 className="text-3xl font-bold text-primary mb-4">Create Account</h1>
                        <div className="flex gap-4 mb-4">
                            <button type="button" className="btn btn-circle btn-outline btn-sm"><Facebook size={18} /></button>
                            <button type="button" className="btn btn-circle btn-outline btn-sm"><Globe size={18} /></button>
                            <button type="button" className="btn btn-circle btn-outline btn-sm"><Linkedin size={18} /></button>
                        </div>
                        <span className="text-sm text-base-content/60 mb-4">or use your email for registration:</span>

                        <div className="w-full space-y-3">
                            <div className="form-control">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="size-5 text-base-content/40" />
                                    </div>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full pl-10 bg-base-200/50"
                                        placeholder="Name"
                                        value={signUpData.fullName}
                                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="size-5 text-base-content/40" />
                                    </div>
                                    <input
                                        type="email"
                                        className="input input-bordered w-full pl-10 bg-base-200/50"
                                        placeholder="Email"
                                        value={signUpData.email}
                                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="size-5 text-base-content/40" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="input input-bordered w-full pl-10 bg-base-200/50"
                                        placeholder="Password"
                                        value={signUpData.password}
                                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary min-w-[150px] mt-6 rounded-full uppercase tracking-wider" disabled={isSigningUp}>
                            {isSigningUp ? <Loader2 className="size-5 animate-spin" /> : "Sign Up"}
                        </button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLoginSubmit} className="flex flex-col items-center justify-center h-full px-10 text-center bg-base-100">
                        <h1 className="text-3xl font-bold text-primary mb-4">Sign in to chatty</h1>
                        <div className="flex gap-4 mb-4">
                            <button type="button" className="btn btn-circle btn-outline btn-sm"><Facebook size={18} /></button>
                            <button type="button" className="btn btn-circle btn-outline btn-sm"><Globe size={18} /></button>
                            <button type="button" className="btn btn-circle btn-outline btn-sm"><Linkedin size={18} /></button>
                        </div>
                        <span className="text-sm text-base-content/60 mb-4">or use your email account:</span>

                        <div className="w-full space-y-3">
                            <div className="form-control">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="size-5 text-base-content/40" />
                                    </div>
                                    <input
                                        type="email"
                                        className="input input-bordered w-full pl-10 bg-base-200/50"
                                        placeholder="Email"
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="size-5 text-base-content/40" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="input input-bordered w-full pl-10 bg-base-200/50"
                                        placeholder="Password"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button type="button" className="link link-hover text-sm mt-4 text-base-content/60">Forgot your password?</button>
                        <button type="submit" className="btn btn-primary min-w-[150px] mt-6 rounded-full uppercase tracking-wider" disabled={isLoggingIn}>
                            {isLoggingIn ? <Loader2 className="size-5 animate-spin" /> : "Sign In"}
                        </button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div className="overlay-container hidden lg:block">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                            <p className="text-lg mb-8">To keep connected with us please login with your personal info</p>
                            <button
                                className="btn btn-outline btn-ghost border-white text-white rounded-full min-w-[150px] uppercase tracking-wider"
                                onClick={() => setIsRightPanelActive(false)}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="text-4xl font-bold mb-4">Hello, Friend!</h1>
                            <p className="text-lg mb-8">Enter your personal details and start journey with us</p>
                            <button
                                className="btn btn-outline btn-ghost border-white text-white rounded-full min-w-[150px] uppercase tracking-wider"
                                onClick={() => setIsRightPanelActive(true)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Toggle (only visible on small screens) */}
                <div className="lg:hidden absolute bottom-4 left-0 right-0 text-center z-[200]">
                    <p className="text-sm text-base-content/60">
                        {isRightPanelActive ? "Already have an account?" : "Don't have an account?"}
                        <button
                            className="ml-2 link link-primary font-bold"
                            onClick={() => setIsRightPanelActive(!isRightPanelActive)}
                        >
                            {isRightPanelActive ? "Sign In" : "Sign Up"}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AuthPage;
