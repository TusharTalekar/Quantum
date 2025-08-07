import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
    return (
        <div className='bg-amber-100 text-stone-800 font-serif'>
            <div className="container mx-auto flex justify-between items-center py-2 px-4 ">
                <div className="hidden md:flex items-center space-x-4">
                    <a href="#" className="hover:text-emerald-800 transition-colors">
                        <TbBrandMeta className="h-6 w-6" />
                    </a>
                    <a href="#" className="hover:text-emerald-800 transition-colors">
                        <IoLogoInstagram className="h-6 w-6" />
                    </a>
                    <a href="#" className="hover:text-emerald-800 transition-colors">
                        <RiTwitterXLine className="h-5 w-5" />
                    </a>
                </div>
                <div className="text-sm text-center flex-grow font-semibold">
                    <span>Built with React & Tailwind CSS. See the code on GitHub!</span>
                </div>
                <div className="hidden md:block text-sm">
                    <a href="tel:+1234567890" className="hover:text-emerald-800 transition-colors">
                        +1 (234) 567-890
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Topbar