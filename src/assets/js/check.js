const checkNull = (rule, value, callback) => {
    if (/^ [\s]*$/.test(value)) {
        callback(new Error("输入不能为空"))
    }else {
        callback()
    }
};
const checkPass = (rule, value, callback) => {
    if (/\s/.test(value)) {
        callback(new Error("不能包含空格"))
    }else if (value.length < 6 || value.length > 16) {
        callback(new Error("长度为6-16"))
    }else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/.test(value)){
        callback(new Error("密码由数字和字母组成"))
    }else{
        callback()
    }
};

export {
    checkNull,
    checkPass,
}