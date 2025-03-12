import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonFooter from "../../components/common/commonFooter";
import CommonNavBar from "../../components/common/commonNavbar";
import { RouteName } from "../../routes";
import { getAssetPath } from "../../utils/assetsUtil";
import { useEffect } from "react";

// Validation Schema using Yup
const schema = yup.object({
    otp: yup.string().required("OTP is required")
});

const OTPVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmit = (data: any) => {
        console.log('Submited OTP:', data)
    };
    
//   const handleSubmit = (otp: string) => {
//     AuthService.emailOTPVerification({ email: location.state?.email, otpCode: otp })
//       .then(async res => {
//         if (res.success) {
//           AuthService.setToken(res.data);
//           const data: any = await jwt_decode(res.data);
//           navigate(`/${data?.user_role}/place-orders`, { replace: true });
//         } else {
//           toast.error(res.error, {
//             position: toast.POSITION.BOTTOM_RIGHT,
//             className: "foo-bar",
//             style: {marginBottom: "4rem"},
//           });
//         }
//       })
//       .catch(error => {
//         toast.error("Something went wrong. Please try again later.", {
//           position: toast.POSITION.BOTTOM_RIGHT,
//           className: "foo-bar",
//           style: {marginBottom: "4rem"},
//         });
//       });
//   };

//   const resendOtp = () => {
//     AuthService.resendOtp({ email: location.state?.email, otpType: OtpType.SIGNUP_OTP})
//       .then(res => {
//         if (res.success) {
//           toast.success(res.message, {
//             position: toast.POSITION.BOTTOM_RIGHT,
//             className: "foo-bar",
//             style: {marginBottom: "4rem"},
//           });
//         } else {
//           toast.error(res.error, {
//             position: toast.POSITION.BOTTOM_RIGHT,
//             className: "foo-bar",
//             style: {marginBottom: "4rem"},
//           });
//         }
//       })
//       .catch(error => {
//         toast.error("Something went wrong. Please try again later.", {
//           position: toast.POSITION.BOTTOM_RIGHT,
//           className: "foo-bar",
//           style: {marginBottom: "4rem"},
//         });
//       });
//   };

    useEffect(() => {
        console.log(location.state?.email);
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
                                        <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">Verify Your Account</h3>
                                        <p className="mb-0">Check <span className="relative text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">{location.state?.email}</span> and enter OTP below.</p>
                                    </div>

                                    <div className="flex-auto p-6">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">OTP Verification</label>
                                            <div className="mb-4">
                                                <input {...register("otp")} type="text" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-600 focus:outline-none focus:transition-shadow" placeholder="OTP Verification" aria-label="OTP" aria-describedby="otp-addon" />
                                                <small className="error">{errors.otp?.message}</small>
                                            </div>

                                            <div className="text-center">
                                                <button type="button" className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85">Verify Account</button>
                                            </div>
                                        </form>
                                    </div>



                                    <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                                        <p className="mx-auto mb-6 leading-normal text-sm">
                                        Don't you have OTP 
                                        <button onClick={() => {}} className="relative font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text"> Resend</button>
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