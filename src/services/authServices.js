import http from "./httpService";
export function getOtp(phoneNumber){
    return http.post("/user/get-otp",{ phoneNumber });

}
export function checkOtp(phoneNumber , otp){
    return http.post("/user/check-otp",{ phoneNumber ,otp });

}