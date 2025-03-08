import { Link } from "react-router-dom";

const CommonFooter = () => {
    return (
        <footer className="py-12">
            <div className="container">
                <div className="flex flex-wrap -mx-3">
                <div className="flex-shrink-0 w-full max-w-full mx-auto mb-6 text-center lg:flex-0 lg:w-8/12">
                    <Link to="javascript:;" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"> Company </Link>
                    <Link to="javascript:;" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"> About Us </Link>
                    <Link to="javascript:;" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"> Team </Link>
                    <Link to="javascript:;" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"> Products </Link>
                    <Link to="javascript:;" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"> Blog </Link>
                    <Link to="javascript:;" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"> Pricing </Link>
                </div>
                <div className="flex-shrink-0 w-full max-w-full mx-auto mt-2 mb-6 text-center lg:flex-0 lg:w-8/12">
                    <Link to="javascript:;" target="_blank" className="mr-6 text-slate-400">
                    <span className="text-lg fab fa-dribbble"></span>
                    </Link>
                    <Link to="javascript:;" target="_blank" className="mr-6 text-slate-400">
                    <span className="text-lg fab fa-twitter"></span>
                    </Link>
                    <Link to="javascript:;" target="_blank" className="mr-6 text-slate-400">
                    <span className="text-lg fab fa-instagram"></span>
                    </Link>
                    <Link to="javascript:;" target="_blank" className="mr-6 text-slate-400">
                    <span className="text-lg fab fa-pinterest"></span>
                    </Link>
                    <Link to="javascript:;" target="_blank" className="mr-6 text-slate-400">
                    <span className="text-lg fab fa-github"></span>
                    </Link>
                </div>
                </div>
                <div className="flex flex-wrap -mx-3">
                <div className="w-8/12 max-w-full px-3 mx-auto mt-1 text-center flex-0">
                    <p className="mb-0 text-slate-400">
                        Copyright ©
                        {new Date().getFullYear()} &nbsp;
                        CT by BlinkGrow.
                    </p>
                </div>
                </div>
            </div>
        </footer>
    )
}

export default CommonFooter;