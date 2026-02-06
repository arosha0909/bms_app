import { Link } from "react-router-dom";
import { RouteName } from "../../routes";

const CommonNavBar = () => {
    return (
        <div className="container sticky top-0 z-sticky">
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">

                <nav className="absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center px-4 py-2 mx-6 my-4 shadow-soft-2xl rounded-blur bg-white/80 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start">
                    <div className="flex items-center justify-between w-full p-0 pl-6 mx-auto flex-wrap-inherit">
                    <Link className="py-2.375 text-sm mr-4 ml-4 whitespace-nowrap font-bold text-slate-700 lg:ml-0" to="/home/index.html"> Ceylon Transport</Link>
                    <button navbar-trigger className="px-3 py-1 ml-2 leading-none transition-all bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg ease-soft-in-out lg:hidden" type="button" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none">
                        <span  className="w-5.5 rounded-xs relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
                        <span  className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
                        <span  className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
                        </span>
                    </button>
                    <div navbar-menu className="items-center flex-grow overflow-hidden transition-all duration-500 ease-soft lg-max:max-h-0 basis-full lg:flex lg:basis-auto">
                        <ul className="flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto">
                        <li>
                            <Link className="flex items-center px-4 py-2 mr-2 font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-sm text-slate-700 lg:px-2" aria-current="page" to="../pages/dashboard.html">
                            <i className="mr-1 fa fa-chart-pie opacity-60"></i>
                            Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link className="block px-4 py-2 mr-2 font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-sm text-slate-700 lg:px-2" to="../pages/profile.html">
                            <i className="mr-1 fa fa-user opacity-60"></i>
                            Profile
                            </Link>
                        </li>
                        </ul>
                        <ul className="hidden pl-0 mb-0 list-none lg:block lg:flex-row">
                            <li>
                                <Link to="#" target="_blank" className="leading-pro hover:scale-102 hover:shadow-soft-xs active:opacity-85 ease-soft-in text-xs tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 rounded-3.5xl mb-0 mr-1 inline-block cursor-pointer border-0 bg-transparent px-8 py-2 text-center align-middle font-bold uppercase text-white transition-all">Download App</Link>
                            </li>
                        </ul>

                        <li className="flex items-center">
                            <Link
                                className="leading-pro ease-soft-in text-fuchsia-500 border-fuchsia-500 text-xs tracking-tight-soft bg-150 bg-x-25 rounded-3.5xl hover:border-fuchsia-500 hover:scale-102 hover:text-fuchsia-500 active:hover:border-fuchsia-500 active:hover:scale-102 active:hover:text-fuchsia-500 active:opacity-85 active:shadow-soft-xs active:bg-fuchsia-500 active:border-fuchsia-500 mr-2 mb-0 inline-block cursor-pointer border border-solid bg-transparent py-2 px-8 text-center align-middle font-bold uppercase shadow-none transition-all hover:bg-transparent hover:opacity-75 hover:shadow-none active:scale-100 active:text-white active:hover:bg-transparent active:hover:opacity-75 active:hover:shadow-none"
                                to={RouteName.SIGNIN}
                            >Sign In</Link>
                        </li>
                    </div>
                    </div>
                </nav>
                
                </div>
            </div>
        </div>
    )
}

export default CommonNavBar;