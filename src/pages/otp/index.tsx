import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonFooter from "../../components/common/commonFooter";
import CommonNavBar from "../../components/common/commonNavbar";
import { getAssetPath } from "../../utils/assetsUtil";
import { useEffect, useState } from "react";
import OTPInput from "../../components/OTPInput";
import { AuthService } from "../../services/authService";
import { toast } from "react-toastify";
import { RouteName } from "../../routes";
import { Mode } from "../../enum/modes";
import { UserStatus } from "../../enum/userStatus";
import { OtpType } from "../../enum/OTPType";

const schema = yup.object({
    otp: yup.string()
        .required("OTP is required")
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
});


const OTPVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState(Array(6).fill(""));
    
    const {
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { otp: "" },
    });
    
    useEffect(() => {
        const otpString = otp.join("");
        setValue("otp", otpString);
        trigger("otp");
    }, [otp, setValue, trigger]);

    const onSubmit = (data: number | any) => {
        AuthService.OTPVerification({email: location.state?.email, otpCode: data.otp}).then(res => {
            if (res.success) {
                switch (location.state?.mode) {
                    case Mode.FORGET_PASSWORD:
                            navigate(RouteName.CHANGE_PASSWORD, { state: { email: location.state?.email, mode: Mode.FORGET_PASSWORD }, replace: true });
                        break;
                    case Mode.ACCOUNT_VERIFY:
                        AuthService.VerifyAccount({email: location.state?.email, status: UserStatus.ACTIVE}).then(res => {
                            console.log(res.data)
                            if (res.success) {
                                console.log(res.data)
                                AuthService.setToken(res.data);
                                navigate(RouteName.ANALYTICS, { replace: true });
                            } else {
                                toast.error('Something went wrong.');
                            }
                        });
                    break;
                
                    default:
                        break;
                }
            } else {
                toast.error(res.error);
            }
        }).catch(() => {
            toast.error("Something went wrong. Please try again later.");
        });
    };

    const sendOTP = () => {
        AuthService.resendOtp({email: location.state?.email, otpType: OtpType.FORGET_PASSWORD_OTP}).then(res => {
            if (res.success) {
                console.log('OTP send successfully');
            } else {
                console.log('OTP issues');
            }
        });
    }


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
                                        <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">Verify Your Account</h3>
                                        <p className="mb-0">Check <span className="relative text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">{location.state?.email}</span> and enter OTP below.</p>
                                    </div>

                                    <div className="flex-auto p-6">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">OTP Verification</label>
                                            <div className="mb-4">
                                            <OTPInput value={otp} onChange={setOtp}/>
                                            <small className="error">{errors.otp?.message}</small>
                                            </div>

                                            <div className="text-center">
                                                <button type="submit" className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85">Verify Account</button>
                                            </div>
                                        </form>
                                    </div>



                                    <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                                        <p className="mx-auto mb-6 leading-normal text-sm">
                                        Don't you have OTP 
                                        <button onClick={() => sendOTP()} className="relative font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text"> Resend</button>
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

export default OTPVerification;