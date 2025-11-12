import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {

    const { signInUser, signInWithGoogle } = use(AuthContext);
    const [loginLoading, setLoginLoading] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location)

    const handleLogIn = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        // console.log(email, password);
        setLoginLoading(true);
        signInUser(email, password)
            .then(result => {
                // console.log('Login successful:', result.user);
                event.target.reset();
                setLoginLoading(false);
                // Small delay to ensure state is updated
                setTimeout(() => {
                    navigate(location.state || '/');
                }, 100);
            })
            .catch(error => {
                // console.log('Login error:', error);
                setLoginLoading(false);

                // Show specific error messages based on Firebase error codes //generated
                let errorMessage = 'Login failed. Please try again.';
                if (error.code === 'auth/user-not-found') {
                    errorMessage = 'No account found with this email address.';
                } else if (error.code === 'auth/wrong-password') {
                    errorMessage = 'Incorrect password. Please try again.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Invalid email address format.';
                } else if (error.code === 'auth/user-disabled') {
                    errorMessage = 'This account has been disabled.';
                } else if (error.code === 'auth/too-many-requests') {
                    errorMessage = 'Too many failed attempts. Please try again later.';
                } else if (error.code === 'auth/network-request-failed') {
                    errorMessage = 'Network error. Please check your connection.';
                }

                toast.error(errorMessage);
            })
    }

    const handleGoogleSignIn = () => {
        setLoginLoading(true);
        signInWithGoogle()
            .then(result => {
                // console.log('Google login successful:', result.user);
                setLoginLoading(false);
                navigate(location?.state || '/');
            })
            .catch(error => {
                // console.log('Google login error:', error);
                setLoginLoading(false);

                // Show specific error messages for Google sign-in //generated
                let errorMessage = 'Google sign-in failed. Please try again.';
                if (error.code === 'auth/popup-closed-by-user') {
                    errorMessage = 'Sign-in cancelled. Please try again.';
                } else if (error.code === 'auth/popup-blocked') {
                    errorMessage = 'Popup blocked. Please allow popups and try again.';
                } else if (error.code === 'auth/network-request-failed') {
                    errorMessage = 'Network error. Please check your connection.';
                } else if (error.code === 'auth/account-exists-with-different-credential') {
                    errorMessage = 'An account already exists with this email using a different sign-in method.';
                }

                toast.error(errorMessage);
            })
    }



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }



    return (
        <>
            <div
                className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl my-20"
                data-aos="fade-up"
                data-aos-duration="800"
            >
                <div className="card-body">
                    <h1 className="text-3xl font-bold">Please Login!</h1>
                    <form onSubmit={handleLogIn}>
                        {/* onSubmit={handleLogIn} */}
                        <fieldset className="fieldset">
                            {/* email field */}
                            <label className="label">Email</label>
                            <input
                                type="email"
                                name='email'
                                className="input"
                                placeholder="Email"
                                onChange={(e) => setCurrentEmail(e.target.value)}
                            />
                            {/* password field */}
                            <label className="label">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    className="input pr-12"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? (
                                        // Eye slash icon (hide password)
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        // Eye icon (show password)
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    
                                    className="link link-hover text-orange-500 hover:text-orange-800 text-sm"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <button
                                className={`btn btn-neutral mt-4 bg-orange-500 text-white hover:bg-orange-800 ${loginLoading ? 'loading' : ''}`}
                                disabled={loginLoading}
                            >
                                {loginLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </fieldset>
                    </form>
                    {/* Google */}
                    {/* onClick={handleGoogleSignIn} */}
                    <button
                        onClick={handleGoogleSignIn}
                        className={`btn bg-white text-black border-[#e5e5e5] hover:bg-gray-300 ${loginLoading ? 'loading' : ''}`}
                        disabled={loginLoading}
                    >
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <p>New to our website? Please <Link className='text-orange-500 hover:text-orange-800' to="/register">Register</Link> </p>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    className: '',
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                    error: {
                        duration: 4000,
                        style: {
                            background: '#ff4444',
                            color: '#fff',
                        },
                    },
                }}
            />
        </>
    );
};

export default Login;