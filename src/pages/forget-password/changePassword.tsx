import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonFooter from "../../components/common/commonFooter";
import CommonNavBar from "../../components/common/commonNavbar";
import CustomButton from "../../components/CustomButton";
import { RouteName } from "../../routes";
import { getAssetPath } from "../../utils/assetsUtil";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthService } from "../../services/authService";
import { toast } from "react-toastify";

// Validation Schema
const schema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  otp: yup.string(),
  email: yup.string(),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { otp: "", email: "" },
  });

  useEffect(() => {
    if (state?.email || state?.otp) {
      setValue("email", state.email || "");
      setValue("otp", state.otp || "");
      trigger(["email", "otp"]);
    }
  }, [state, setValue, trigger]);

  const onSubmit = useCallback(async (data: any) => {
    setLoading(true);
    const { confirmPassword, ...payload } = data; // to remove confirmPassowrd...
    try {
      console.log(payload);
      AuthService.ChangePassword(data).then(res => {
        if (res.success) {
            navigate(RouteName.SIGNIN, { replace: true });
        } else {
            toast.error('Something went wrong.');
        }
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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
                        Change Password
                      </h3>
                      <p className="mb-0">Enter old password and new password</p>
                    </div>

                    {/* Form */}
                    <div className="flex-auto p-6">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                          <input
                            {...register("password")}
                            type="password"
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-600 focus:outline-none focus:transition-shadow"
                            placeholder="Password"
                            aria-label="Password"
                          />
                          <small className="error">{errors.password?.message}</small>
                        </div>

                        <div className="mb-4">
                          <input
                            {...register("confirmPassword")}
                            type="password"
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-600 focus:outline-none focus:transition-shadow"
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
                          />
                          <small className="error">{errors.confirmPassword?.message}</small>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                          <CustomButton type="submit" loading={loading} disabled={loading}>
                            Change Password
                          </CustomButton>
                        </div>
                      </form>
                    </div>

                    {/* Signup Link */}
                    <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                      <p className="mx-auto mb-6 leading-normal text-sm">
                        Back to{" "}
                        <Link
                          to={RouteName.SIGNIN}
                          className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text"
                        >
                          Sign in
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
                      style={{ backgroundImage: `url(${getAssetPath("img/curved-images/curved6.jpg")})` }}
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

export default ChangePassword;
