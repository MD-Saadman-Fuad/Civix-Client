import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import toast, { Toaster } from 'react-hot-toast';


const Register = () => {
    const navigate = useNavigate();
    const { createUser, updateUser, signInWithGoogle } = use(AuthContext);
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    // Password validation function
    const validatePassword = (password) => {
        const errors = [];

        if (password.length < 6) {
            errors.push("Password must be at least 6 characters long");
        }

        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter");
        }

        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter");
        }

        return errors;
    };

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const photoURL = form.photo.value;


        setPasswordError('');


        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            setPasswordError(passwordErrors.join('. '));
            return;
        }

        setIsLoading(true);

        createUser(email, password)
            .then(result => {
                const createdUser = result.user;
                // console.log("User created:", createdUser);

                // Update user profile with name and photoURL
                updateUser({ displayName: name, photoURL: photoURL })
                    .then(() => {
                        // console.log("User profile updated successfully");
                        form.reset();
                        setIsLoading(false);
                        // Small delay to ensure state is updated before navigation
                        setTimeout(() => {
                            navigate('/');
                        }, 200); // Slightly longer delay for profile update
                    })
                    .catch(error => {
                        console.log("Profile update error: ", error.message);
                        setIsLoading(false);
                        toast.error("Profile update failed. Please try updating your profile later.");
                    });
            })
            .catch(error => {
                console.log("Registration error:", error.message);
                setIsLoading(false);

                // Show specific error messages based on Firebase error codes //generated
                let errorMessage = 'Registration failed. Please try again.';
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = 'An account with this email already exists. Please use a different email or try logging in.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Invalid email address format.';
                } else if (error.code === 'auth/operation-not-allowed') {
                    errorMessage = 'Email/password accounts are not enabled. Please contact support.';
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = 'Password is too weak. Please choose a stronger password.';
                } else if (error.code === 'auth/network-request-failed') {
                    errorMessage = 'Network error. Please check your connection and try again.';
                }

                setPasswordError(errorMessage);
                toast.error(errorMessage);
            })
    }

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        signInWithGoogle()
            .then(result => {
                console.log('Google registration successful:', result.user);
                setIsLoading(false);
                // Small delay to ensure state is updated
                setTimeout(() => {
                    navigate('/');
                }, 100);
            })
            .catch(error => {
                console.log('Google registration error:', error);
                setIsLoading(false);

                // Show specific error messages for Google sign-in
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
            <div className='flex justify-center min-h-screen items-center'>
                <div
                    className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
                    data-aos="zoom-in"
                    data-aos-duration="800"
                >
                    <h1 className='font-semibold text-2xl text-center mt-4'>Register Your account</h1>
                    <form className="card-body" onSubmit={handleRegister}>
                        {/* onSubmit={handleRegister} */}
                        <fieldset className="fieldset">
                            {/* Name */}
                            <label className="label">Name</label>
                            <input type="text" name='name' className="input" placeholder="Name" required />


                            {/*Photo Url */}
                            <label className="label">Photo Url</label>
                            <input type="text" name='photo' className="input" placeholder="Proto Url" required />

                            {/* email */}
                            <label className="label">Email</label>
                            <input type="text" name='email' className="input" placeholder="Email" required />
                            {/* password */}
                            <label className="label">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    className="input pr-12"
                                    placeholder="Password"
                                    required
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


                            <div className="text-sm text-gray-600 mt-2">
                                <p>Password must contain:</p>
                                <ul className="list-disc list-inside ml-2">
                                    <li>At least 6 characters</li>
                                    <li>One uppercase letter (A-Z)</li>
                                    <li>One lowercase letter (a-z)</li>
                                </ul>
                            </div>


                            {passwordError && (
                                <div className="alert alert-error mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm">{passwordError}</span>
                                </div>
                            )}

                            <button
                                type='submit'
                                className={`btn btn-neutral mt-4 bg-orange-500 hover:bg-orange-800 ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Registering...' : 'Register'}
                            </button>
                        </fieldset>
                    </form>

                    {/* Google Sign-in Button */}
                    <div className="px-8 pb-8">
                        <button
                            onClick={handleGoogleSignIn}
                            className={`btn bg-white text-black border-[#e5e5e5] hover:bg-gray-300 w-full ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Register with Google
                        </button>

                        <h1 className='pt-5 text-center'>Already Have an account? <Link className=" text-orange-500 hover:text-orange-800" to="/login">login?</Link></h1>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        style: {
                            background: '#10b981',
                            color: '#fff',
                        },
                    },
                    error: {
                        duration: 4000,
                        style: {
                            background: '#ef4444',
                            color: '#fff',
                        },
                    },
                }}
            />
        </>
    );
};

export default Register;