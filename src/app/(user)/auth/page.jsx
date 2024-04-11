"use client";
import { useEffect, useState } from "react";
import SendOTPFrom from "./SendOTPFrom";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getOtp, checkOtp } from "@/services/authServices";
import CheckOTPForm from "./CheckOTPForm";
import { useRouter } from "next/navigation";

const RESEND_TIME = 90;
function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("09181234567");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(2);
  const [time, setTime] = useState(RESEND_TIME);
  const router=useRouter();
  const { data: otpResponse, error, isLoading, mutateAsync: mutateGetOtp } = useMutation({ mutationFn: getOtp });
  console.log(phoneNumber);
  const { mutateAsync: mutateCheckOtp ,isLoading:isCheckingOtp} = useMutation({ mutationFn: checkOtp });
  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  }; 
  const sendOtpHandler = async (e) => { 
    e.preventDefault();
    try {
      const data = await mutateGetOtp({ phoneNumber });
      toast.success(data.message);
      console.log(data.data);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message);
      if (user.isActive) {
        router.push("/");
      } else {
        router.push("/complete-profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);


  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPFrom
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            onSubmit={sendOtpHandler}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onBack={() => setStep((s) => s - 1)}
            otp={otp}
            setOtp={setOtp}
            onSubmit={checkOtpHandler}
            time={time}
            onResendOtp={sendOtpHandler}
            otpResponse={otpResponse}
            isCheckingOtp={isCheckingOtp}
          />
        );
      default:
        return null;
    }};

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        {renderSteps()}
      </div>
    </div>
  );
}

export default AuthPage;