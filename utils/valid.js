const valid = (name, email, password, cf_password) => {
    if(!name || !email || !password)
    return 'Vui lòng nhập đầy đủ thông tin.'

    if(!validateEmail(email))
    return 'Email không đúng.'

    if(password.length < 6)
    return 'Mật khẩu phải lớn hơn hoặc bằng 6 kí tự.'

    if(password !== cf_password)
    return 'Mật khẩu không khớp.'
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid