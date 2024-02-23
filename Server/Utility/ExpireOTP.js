const expireOTP = (storedOtp, email, expirationTime) => {
    
    const interval = setInterval(() => {
        const remainingTime = expirationTime - Date.now();
        if (remainingTime <= 0) {
            clearInterval(interval);
            storedOtp.delete(email);
            console.log('OTP expired:', email);
        }
    }, 1000);
}

module.exports = expireOTP