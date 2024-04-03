export const validateName = (name) => {
    if (!name) return true;
    const re = /^[a-zA-Z ]+(([',.-][a-zA-Z])?[a-zA-Z]*)*$/g;
    return re.test(name);
};

export const EmailValidation = (email) => {
    if (email) {
        if (email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)) {
            return false
        }
        else {
            return true
        }

    }
    else {
        return true
    }
}

export const PhoneValidation = (phone) => {
    if (phone) {
        const re = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[0123456789]\d{9}|(\d[ -]?){10}\d$/g;
        if (phone.match(re)) {
            return false
        }
        else {
            return true
        }
    }
    else {
        return true
    }
}



export const validateMobile = (mobile) => {
    if (!mobile) return true;
    if (mobile.length < 10) {
        return true;
    } else {
        const re =
            /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[0123456789]\d{9}|(\d[ -]?){10}\d$/g;
        return re.test(mobile);
    }
};

export const PasswordValidation = (password) => {
    if (password) {
        if (password.length >= 6) {
            return false
        }
        else {
            return true
        }
    }
    else {
        return true
    }
}

export const validatePincode = (pincode) => {
    if (!pincode) return true;
    const re = /^[0-9]/;
    return re.test(pincode);
};