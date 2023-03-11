const validateCard = (rule, value, callback) => {
	const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	// const regIdCard = /^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/;
	if (!regIdCard.test(value)) {
		callback(new Error('请输入正确身份证号'));
	} else {
		callback();
	}
};

const validatePhone = (rule, value, callback) => {
	if (value.length > 11 || value.length < 11 || isNaN(value)) {
		callback(new Error('请输入正确手机格式'));
	} else {
		const r = /^(\+?0?86?)?1[3456789]\d{9}$/;
		if (!r.test(value)) {
			callback(new Error('请输入正确手机格式'));
		} else {
			callback();
		}
	}
};

const validateEmail = (rule, value, callback) => {
	const regIdCard = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
	if (!regIdCard.test(value)) {
		callback(new Error('请输入正确邮箱格式'));
	} else {
		callback();
	}
};

const validateVerifyCode = (rule, value, callback) => {
	const regIdCard = /\d{6}/g;
	if (!regIdCard.test(value)) {
		callback(new Error('请输入正确的手机验证码'));
	} else {
		callback();
	}
};

export { validateCard, validatePhone, validateEmail, validateVerifyCode };
