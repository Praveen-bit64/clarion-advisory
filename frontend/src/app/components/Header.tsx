const Header = () => {
    return (
        <div className="w-full h-[90px] flex justify-between items-center border-b-1 border-b-white relative">
            <img src="/hero-banner-home.jpg" className="w-full h-full object-cover object-top hidden lg:block" alt="" />
            <div className="w-full h-full absolute bg-primary/20 top-0 left-0"></div>
            <div className="absolute w-full h-full flex justify-between items-center z-99">
                <div className="lg:w-[30%] w-full px-10">
                    <img src="/clarion-logo.png" className="w-[200px]" alt="" />
                </div>
                <div className="lg:w-[70%] lg:block hidden">
                    <ul className="w-full flex justify-center items-center gap-10 text-white text-lg" >
                        <li>Home</li>
                        <li>About us</li>
                        <li>Properties</li>
                        <li>contact</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;