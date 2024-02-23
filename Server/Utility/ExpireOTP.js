// const expireOTP = (storedOtp, email, expirationTime) => {
    
//     const interval = setInterval(() => {
//         const remainingTime = expirationTime - Date.now();
//         if (remainingTime <= 0) {
//             clearInterval(interval);
//             storedOtp.delete(email);
//             console.log('OTP expired:', email);
//         }
//     }, 1000);
// }

// module.exports = expireOTP

const expireOTP = (storedOtp, email, expirationTime) => {
    const remainingTime = expirationTime - Date.now();

    if (remainingTime <= 0) {
        storedOtp.delete(email);
        console.log('OTP expired:', email);
        return;
    }

    setTimeout(() => {
        storedOtp.delete(email);
        console.log('OTP expired:', email);
    }, remainingTime);
}

module.exports = expireOTP;
