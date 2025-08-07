import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"
import { TbBrandMeta } from "react-icons/tb"
import { Link } from "react-router-dom"
import { FiPhoneCall } from "react-icons/fi"

const Footer = () => {
    return (
        <footer className="border-t-2 border-stone-300 py-16 bg-amber-50 font-serif">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-4 lg:px-0">
                <div>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">Stay Connected</h3>
                    <p className="text-stone-600 mb-4">
                        Be the first to hear about new products, exclusive events, and online offers.
                    </p>
                    <p className='font-semibold text-sm text-stone-700 mb-6'>Sign up and get 10% off your first order.</p>
                    {/* Newsletter form */}
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-3 w-full text-sm border-t border-l border-b border-stone-300 rounded-l-lg focus: outline-none focus: ring-2 focus: ring-emerald-500 transition-all bg-white"
                            required
                        />
                        <button
                            type='submit'
                            className='bg-emerald-800 text-white px-6 py-3 text-sm font-bold rounded-r-lg hover:bg-emerald-700 transition-colors'>
                            Subscribe
                        </button>
                    </form>
                </div>
                {/* Shop links  */}
                <div>
                    <h3 className='text-2xl font-bold text-emerald-800 mb-4'>Shop</h3>
                    <ul className='space-y-3 text-stone-600'>
                        <li>
                            <Link to="#" className="hover:text-emerald-800 transition-colors">
                                Men's top Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-emerald-800 transition-colors">
                                Women's top Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-emerald-800 transition-colors">
                                Men's bottm Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-emerald-800 transition-colors">
                                Women's bottm Wear
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Support Links  */}
                <div>
                    <h3 className='text-2xl font-bold text-emerald-800 mb-4'>Support</h3>
                    <ul className='space-y-3 text-stone-600'>
                        <li>
                            <Link to="#" className="hover:text-emerald-800 transition-colors">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-emerald-800 transition-colors">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-emerald-800 transition-colors">
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-emerald-800 transition-colors">
                                Features
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Follow Us  */}
                <div>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">Follow Us</h3>
                    <div className="flex items-center mb-6 space-x-4 text-stone-600">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-800 transition-colors">
                            <TbBrandMeta className="h-6 w-6" />
                        </a>
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-800 transition-colors">
                            <IoLogoInstagram className="h-6 w-6" />
                        </a>
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-800 transition-colors">
                            <RiTwitterXLine className="h-5 w-5" />
                        </a>

                    </div>
                    <p className="text-stone-600 mb-2">Call Us</p>
                    <p className="text-xl font-bold text-stone-800">
                        <FiPhoneCall className="inline-block mr-2" />
                        0123-456-789
                    </p>
                </div>

            </div>
            {/* Footer Bottom */}
            <div className="container mx-auto mt-16 px-4 lg:px-0 border-t-2 border-stone-300 pt-8">
                <p className="text-stone-600 text-sm tracking-tighter text-center">
                   © 2025, CompileTab. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer