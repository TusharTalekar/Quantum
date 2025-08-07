import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import register from "../assets/register.png";
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId, loading } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    // get redirect parameter and check if it's checkout or else
    const redirect = new URLSearchParams(location.search).get('redirect') || '/';
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                });
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password }));
    }

    return (
        <div className="flex bg-amber-50 min-h-screen font-serif">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-10 rounded-xl border border-stone-300 shadow-xl">
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-bold text-emerald-800">Quantum</h2>
                    </div>
                    <h2 className="text-3xl font-black italic text-center mb-4 text-stone-800">Join Us &#128075;</h2>
                    <p className="text-center mb-6 text-stone-600">
                        Create an account to start shopping!
                    </p>
                    <div className="mb-4 ">
                        <label className='block text-sm font-semibold mb-2 text-stone-800'>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow'
                            placeholder='Enter your name' />
                    </div>
                    <div className="mb-4 ">
                        <label className='block text-sm font-semibold mb-2 text-stone-800'>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow'
                            placeholder='Enter your email address' />
                    </div>
                    <div className="mb-6 ">
                        <label className='block text-sm font-semibold mb-2 text-stone-800'>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow'
                            placeholder='Enter your password' />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-emerald-800 text-white p-3 rounded-full font-bold hover:bg-emerald-700 transition'
                    >
                        {loading ? "loading..." : "Sign Up"}
                    </button>
                    <p className='mt-8 text-center text-sm text-stone-600'>
                        Already have an account?{" "}
                        <Link
                            to={`/login?redirect=${encodeURIComponent(redirect)}`}
                            className='text-emerald-800 font-bold hover:underline'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
            <div className='hidden md:block w-1/2 bg-stone-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img
                        src={register}
                        alt="Login to account"
                        className='h-[750px] w-full object-cover' />
                </div>
            </div>
        </div>
    )

}

export default Register