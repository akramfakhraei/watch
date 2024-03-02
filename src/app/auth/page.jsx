"use client";
import { useState } from "react";
import SendOTPFrom from "./SendOTPFrom";
import http from "@/services/httpService";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getOtp } from "@/services/authServices";

function AuthPage() {
  const [phoneNumber, setPhoneNumber]=useState("");
  const {data , error, isLoading , mutateAsync}=useMutation({mutationFn:getOtp});
  console.log(phoneNumber);
  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };
  const sendOTPHandler= async(e)=>{
    e.preventDefault();
    try {
      const data =await mutateAsync({phoneNumber});
      console.log(data.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
     
    }
  };
  console.log({data, error,isLoading});
  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <SendOTPFrom
        phoneNumber={phoneNumber}
        onChange={phoneNumberHandler}
        onSubmit={sendOTPHandler}
        isLoading={isLoading}/>
      </div>
    </div>
  );
}

export default AuthPage