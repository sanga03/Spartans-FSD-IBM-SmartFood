var baseUrl:string = "http://b4ibm02.iiht.tech:8762"
export var fetchUrls = 
{
    customerTrack: baseUrl+"/track/customerTrack",
    physicalDetail: baseUrl+"/physical/physicalDetails",
    nearByRestaurant: "",
    restaurant:""
}
export var fetchPersonalUrl="http://b4ibm02.iiht.tech:9002/getPersonalFoods/";
export var registerUrl='http://b4ibm26.iiht.tech:1020/registerUser';
export var otpVerifyUrl='http://b4ibm26.iiht.tech:1020/userOtp?otpU=';
export var findEmailUrl="http://b4ibm02.iiht.tech:8762/account/findEmail?email=";
export var pushPrefUrl="http://localhost:8041/pushPref";
export let orderUrl="http://b4ibm08.iiht.tech:8099/push";
export let paypalUrl="http://b4ibm32.iiht.tech:8090/pay/"