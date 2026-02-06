import { useLocation } from "react-router-dom";

const NavBar = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start">
            <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                <nav>
                    <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                        <li className="text-sm leading-normal">
                            <a className="opacity-50 text-slate-700" href="/">Home</a>
                        </li>
                        {pathSegments.map((segment, index) => {
                            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                            const isLast = index === pathSegments.length - 1;
                            return (
                                <li
                                    key={href}
                                    className={`text-sm pl-2 capitalize leading-normal ${
                                        isLast ? "text-slate-700" : "opacity-50 text-slate-700"
                                    } before:float-left before:pr-2 before:text-gray-600 before:content-['/']`}
                                    aria-current={isLast ? "page" : undefined}
                                >
                                    {isLast ? (
                                        segment
                                    ) : (
                                        <a href={href} className="hover:text-blue-500">{segment}</a>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                    <h6 className="mb-0 font-bold capitalize">{pathSegments[pathSegments.length - 1] || "Dashboard"}</h6>
                </nav>
            </div>
        </nav>
    );
};

export default NavBar;
