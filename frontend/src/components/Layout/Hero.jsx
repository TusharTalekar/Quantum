import { Link } from "react-router-dom";
import heroImg from "../../assets/Hero.jpg";

const Hero = () => {
    return (
        <section className="relative">
            <img
                src={heroImg}
                alt="Rabbit"
                className="w-full h-[600px] md:h-[750px] lg:h-[900px] object-cover object-center" />
            <div className="absolute inset-0 bg-stone-800/60 flex items-center justify-center p-8">
                <div className="text-center text-white max-w-3xl">
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-wide uppercase leading-tight mb-4 drop-shadow-md">
                        Project <br /> Showcase
                    </h1>
                    <p className="text-xl md:text-2xl font-light mb-10 drop-shadow-sm">
                        Explore our e-commerce demo with modern features and design.
                    </p>
                    <Link
                        to="#"
                        className="bg-amber-200 text-stone-800 px-10 py-4 font-bold text-xl rounded-full shadow-lg transition-transform hover:scale-105 inline-block">
                        Explore Now
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero