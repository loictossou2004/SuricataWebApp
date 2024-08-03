import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [eye, setEye] = useState(true)
    

    function HandlePassword() {
        setEye(!eye);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(username, password)
        try {
            const response = await axios.post('http://172.20.10.3:3001/login', {
                username,
                password
            });
            if (response.data.success) {
                // setMessage('Login successful!');
                alert('Login successful !!!')
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Login failed: Invalid credentials');
            } else {
                setMessage('Login failed: Server error');
            }
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center font-Poppins'>
            <div className='max-w-md w-full mx-auto  flex justify-evenly items-center'>
                <button className={"bg-[#857E61] font-bold whitespace-nowrap px-4 py-2 rounded-full text-white text-center hover:scale-125 transition duration-500 hover:duration-500"}>
                    Login
                </button>
            </div>

            <div className='max-w-[500PX] w-full mx-auto mt-4 bg-white p-8 rounded-3xl shadow-lm'>
                <form action='' className='space-y-2' onSubmit={handleLogin}>
                    <div>
                        <label className='text-sm font-extrabold '>Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} type='text' id='text' placeholder='Enter your username' className='w-full p-2 py-sm-3 rounded-xl mt-1 outline-non border placeholder:font-extrabold' required/>
                    </div>
                    <div className='relative'>

                        <label className='text-sm font-extrabold '>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type={eye ? "password" : "text"} id='password' placeholder='Enter your password' className='border w-full p-2 py-sm-3 rounded-xl outline-none placeholder:font-extrabold' required/>
                        {
                            eye ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye absolute top-1/2 right-3 text-gray-400 cursor-pointer" viewBox="0 0 16 16" onClick={(e)=>HandlePassword()}>
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                            </svg>
                             :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye absolute top-1/2 right-3 text-gray-400 cursor-pointer" viewBox="0 0 16 16" onClick={(e)=>HandlePassword()}>
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                        }
                    </div>
                    <div className='flex justify-center font-bold'>
                        {message && <p className='text-red-500'>{message}</p>}
                    </div>
                    <div className='flex justify-center font-bold'>
                        <button className="bg-[#857E61] font-bold whitespace-nowrap px-4 py-2 rounded-full text-white text-center hover:scale-125 transition duration-500 hover:duration-500">Submit</button>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default LoginForm;