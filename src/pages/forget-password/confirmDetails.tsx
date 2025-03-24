import { Link, useNavigate } from "react-router-dom";
import CommonFooter from "../../components/common/commonFooter";
import CommonNavBar from "../../components/common/commonNavbar";
import { RouteName } from "../../routes";
import { getAssetPath } from "../../utils/assetsUtil";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Mode } from "../../enum/modes";
import { AuthService } from "../../services/authService";
import { toast } from "react-toastify";
import { OtpType } from "../../enum/OTPType";

// Validation Schema
const schema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
});

const ConfirmDetails = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Form Hook
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // Form Submission
    const onSubmit = async (data: any) => {
        const email = data.email;
        setLoading(true);
        try {
            AuthService.resendOtp({email: email, otpType: OtpType.FORGET_PASSWORD_OTP}).then(res => {
                if (res.success) {
                    navigate(RouteName.OTP, { state: { email: email, mode: Mode.FORGET_PASSWORD } });
                } else {
                    toast.error(res.error);
                }
            });
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <CommonNavBar />
            <main className="mt-0 transition-all duration-200 ease-soft-in-out">
                <section>
                    <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen">
                        <div className="container z-10">
                            <div className="flex flex-wrap mt-0 -mx-3">
                                {/* Left Form Section */}
                                <div className="flex flex-col w-full max-w-full px-3 mx-auto md:w-6/12 lg:w-5/12 xl:w-4/12">
                                    <div className="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl">
                                        <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                                            <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">
                                                Forget Password
                                            </h3>
                                            <p className="mb-0">Enter your email to send OTP code.</p>
                                        </div>

                                        {/* Form */}
                                        <div className="flex-auto p-6">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                {/* Email Field */}
                                                <div className="mb-4">
                                                    <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                                                        Email
                                                    </label>
                                                    <input 
                                                        type="email" 
                                                        {...register("email")} 
                                                        className={`focus:shadow-soft-primary-outline text-sm leading-5.6 block w-full appearance-none rounded-lg border bg-white px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow 
                                                            ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                                        placeholder="Enter your email"
                                                        aria-invalid={errors.email ? "true" : "false"}
                                                    />
                                                    {errors.email && (
                                                        <small className="text-red-500">{errors.email.message}</small>
                                                    )}
                                                </div>

                                                {/* Submit Button */}
                                                <div className="text-center">
                                                <CustomButton type="submit" loading={loading} disabled={loading}>
                                                    Send OTP
                                                </CustomButton>
                                                </div>
                                            </form>
                                        </div>

                                        {/* Signup Link */}
                                        <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                                            <p className="mx-auto mb-6 leading-normal text-sm">
                                                Back to 
                                                <Link to={RouteName.SIGNIN} className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">
                                                    {" "} Sign in
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Image Section */}
                                <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                                    <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                                        <div 
                                            className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10" 
                                            style={{ backgroundImage: `url(${getAssetPath('img/curved-images/curved6.jpg')})` }}
                                        ></div>
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
};

export default ConfirmDetails;
