module.exports.signUpErrors= (err) => {
    let errors = { registerNumber: "", email: "", password: "" };
        
    if(err.message.includes('password'))
        errors.password = "The password must contain at least 6 characters";
        
    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("registerNumber"))
        errors.registerNumber = "this register number is already use ";

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "this email is already use ";

    return errors;
}
