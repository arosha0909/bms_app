import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonFooter from "../../components/common/commonFooter";
import CommonNavBar from "../../components/common/commonNavbar";
import { RouteName } from "../../routes";
import { getAssetPath } from "../../utils/assetsUtil";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import SearchableDropdown from "../../components/searchableDropDown";
import { AuthService } from "../../services/authService";
import { Industry } from "../../models/industry";
import { IndustryService } from "../../services/businessService";

// Validation Schema using Yup
const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    industry: yup.string().required("Industry is required"),
    password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const SignUp = () => {
    const [industryList, setIndustryList] = useState<Industry[]>([]);
    const [openRegister, setOpenRegister] = useState<boolean>(false);

    
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmit = (data: any) => {
        AuthService.registerBusOwner(data).then(res => {
            if (res.success) {

            } else {
                toast.error(res.error);
            }
        })
    };

    const handleSelectIndustry = (value: any) => {
        setValue("industry", value._id);
        console.log("Selected option ID**:", value);
    };

    const openRegisterScreen = () => {
        if (watch("industry")) {
            setOpenRegister(true);
        } else {
            toast.error("Select your Industry type.");
        }
    }

    useEffect(() => {
        IndustryService.getAllIndustries().then(res => {
            if (res.success) {
                setIndustryList(res.data);
            }
        })
    }, []);

    return (
        <>
            <CommonNavBar />
            <main className="mt-0 transition-all duration-200 ease-soft-in-out">
                <section>
                    <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen">
                        <div className="container z-10">
                            <div className="flex flex-wrap mt-0 -mx-3">
                            <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
                                <div className="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                                <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                                    <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">Track Your Vehicle</h3>
                                    <p className="mb-0">Enter Your Details to Quick Register</p>
                                </div>
                                {
                                    openRegister ? (
                                        <div className="flex-auto p-6">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Name</label>
                                            <div className="mb-4">
                                                <input {...register("name")} type="text" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-600 focus:outline-none focus:transition-shadow" placeholder="Name" aria-label="Name" aria-describedby="email-addon" />
                                                <small className="error">{errors.name?.message}</small>
                                            </div>
                                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Email</label>
                                            <div className="mb-4">
                                                <input {...register("email")} type="email" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-600 focus:outline-none focus:transition-shadow" placeholder="Email" aria-label="Email" aria-describedby="email-addon" />
                                                <small className="error">{errors.email?.message}</small>
                                            </div>
                                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Password</label>
                                            <div className="mb-4">
                                                <input {...register("password")} type="password" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-600 focus:outline-none focus:transition-shadow" placeholder="Password" aria-label="Password" aria-describedby="password-addon" />
                                                <small className="error">{errors.password?.message}</small>
                                            </div>
                                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Confirm Password</label>
                                            <div className="mb-4">
                                                <input {...register("confirmPassword")} type="password" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-600 focus:outline-none focus:transition-shadow" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="password-addon" />
                                                <small className="error">{errors.confirmPassword?.message}</small>
                                            </div>
                                            <div className="min-h-6 pl-6.92 mb-0.5 block">
                                                <input {...register("terms")} id="terms" className="w-4.92 h-4.92 ease-soft -ml-6.92 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-200 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" value="" />
                                                <label className="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700" htmlFor="terms"> I agree the <a href="javascript:;" className="font-bold text-slate-700">Terms and Conditions</a> </label>
    
                                            </div>
                                            <small className="error">{errors.terms?.message}</small>
                                            <div className="text-center">
                                                <button type="submit" className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85">Register</button>
                                            </div>
                                        </form>
                                    </div>
                                    ) : (
                                        <div className="flex-auto p-6">
                                            <SearchableDropdown 
                                            label={"Select Your Industry Category"} 
                                            options={industryList} 
                                            placeholder="Select an option"
                                            onSelect={(data) => handleSelectIndustry(data)}
                                            />
                                            <div className="text-center">
                                                <button onClick={openRegisterScreen} className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85">Next</button>
                                            </div>
                                        </div>
                                    )
                                }


                                <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                                    <p className="mx-auto mb-6 leading-normal text-sm">
                                    Do You have an account? 
                                    <Link to={RouteName.SIGNIN} className="relative  font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text"> Sign In</Link>
                                    </p>
                                </div>
                                </div>
                            </div>
                            <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                                <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                                <div className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10 " style={{backgroundImage: `url(${getAssetPath('img/curved-images/curved6.jpg')})`}}></div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <CommonFooter />
        </>
    );
}

export default SignUp;