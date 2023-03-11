export default class Helper {
	static objectToString(o) {
		return Object.prototype.toString.call(o);
	}

	static hasOwn(obj, key) {
		return Object.prototype.hasOwnProperty.call(obj, key);
	}

	static isArray(arg) {
		if (Array.isArray) {
			return Array.isArray(arg);
		}
		return Helper.objectToString(arg) === '[object Array]';
	}

	static isBoolean(arg) {
		return typeof arg === 'boolean';
	}

	static isNull(arg) {
		return arg === null;
	}

	static isNullOrUndefined(arg) {
		// eslint-disable-next-line
		return arg == null || arg == undefined;
	}

	static isNumber(arg) {
		return typeof arg === 'number';
	}

	static isInt(value) {
		if (isNaN(value) || Helper.isString(value)) {
			return false;
		}
		let x = parseFloat(value);
		return (x | 0) === x;
	}

	static isString(arg) {
		return typeof arg === 'string';
	}

	static isSymbol(arg) {
		return typeof arg === 'symbol';
	}

	static isUndefined(arg) {
		// eslint-disable-next-line no-void
		return arg === void 0;
	}

	static isRegExp(re) {
		return Helper.objectToString(re) === '[object RegExp]';
	}

	static isObject(arg) {
		return typeof arg === 'object' && arg !== null;
	}

	static isTrueObject(obj) {
		return toString.call(obj) === '[object Object]';
	}

	static isDate(d) {
		return Helper.objectToString(d) === '[object Date]';
	}

	static isError(e) {
		return Helper.objectToString(e) === '[object Error]' || e instanceof Error;
	}

	static isFunction(arg) {
		return typeof arg === 'function';
	}

	static isAsyncFcuntion(fn) {
		const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
		return fn instanceof AsyncFunction;
	}

	static isPrimitive(arg) {
		return (
			arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || typeof arg === 'undefined'
		);
	}

	static isBuffer(arg) {
		return Buffer.isBuffer(arg);
	}

	static promisify(fn, receiver) {
		return (...args) => {
			return new Promise((resolve, reject) => {
				fn.apply(receiver, [
					...args,
					(err, res) => {
						return err ? reject(err) : resolve(res);
					},
				]);
			});
		};
	}

	static extend(target = {}, ...args) {
		let i = 0;
		const length = args.length;
		let options;
		let name;
		let src;
		let copy;
		if (!target) {
			target = Helper.isArray(args[0]) ? [] : {};
		}
		for (; i < length; i++) {
			options = args[i];
			if (!options) {
				continue;
			}
			for (name in options) {
				src = target[name];
				copy = options[name];
				if (src && src === copy) {
					continue;
				}
				if (Helper.isArray(copy)) {
					target[name] = Helper.extend([], copy);
				} else if (Helper.isTrueObject(copy)) {
					target[name] = Helper.extend(src && Helper.isTrueObject(src) ? src : {}, copy);
				} else {
					target[name] = copy;
				}
			}
		}
		return target;
	}

	static isTrueEmpty(obj) {
		if (obj === undefined || obj === null || obj === '') return true;
		if (Helper.isNumber(obj) && isNaN(obj)) return true;
		return false;
	}

	static isEmpty(obj) {
		if (Helper.isTrueEmpty(obj)) return true;
		if (Helper.isRegExp(obj)) {
			return false;
		} else if (Helper.isDate(obj)) {
			return false;
		} else if (Helper.isError(obj)) {
			return false;
		} else if (Helper.isArray(obj)) {
			return obj.length === 0;
		} else if (Helper.isString(obj)) {
			return obj.length === 0;
		} else if (Helper.isNumber(obj)) {
			return obj === 0;
		} else if (Helper.isBoolean(obj)) {
			return !obj;
		} else if (Helper.isObject(obj)) {
			for (const key in obj) {
				return false;
			}
			return true;
		}
		return false;
	}

	static defer() {
		const deferred = {};
		deferred.promise = new Promise((resolve, reject) => {
			deferred.resolve = resolve;
			deferred.reject = reject;
		});
		return deferred;
	}

	static omit(obj, props) {
		if (Helper.isString(props)) {
			props = props.split(',');
		}
		const keys = Object.keys(obj);
		const result = {};
		keys.forEach((item) => {
			if (props.indexOf(item) === -1) {
				result[item] = obj[item];
			}
		});
		return result;
	}

	static numbers = '0123456789';
	static letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	static specials = '~!@#$%^*()_+-=[]{}|;:,./<>?';
	static randomString(length, options) {
		length || (length = 8);
		options || (options = {});

		let chars = '';
		let result = '';

		if (options === true) {
			chars = Helper.numbers + Helper.letters + Helper.specials;
		} else if (typeof options === 'string') {
			chars = options;
		} else {
			if (options.numbers !== false) {
				chars += typeof options.numbers === 'string' ? options.numbers : Helper.numbers;
			}

			if (options.letters !== false) {
				chars += typeof options.letters === 'string' ? options.letters : Helper.letters;
			}

			if (options.specials) {
				chars += typeof options.specials === 'string' ? options.specials : Helper.specials;
			}
		}

		while (length > 0) {
			length--;
			result += chars[Math.floor(Math.random() * chars.length)];
		}
		return result;
	}

	static fill(num, bit) {
		let numStr = num.toString();
		while (numStr.length < bit) numStr = '0' + numStr;
		return numStr;
	}

	static toDateStr(ts, formatter) {
		const d = new Date(ts);
		const year = d.getFullYear();
		const month = Helper.fill(d.getMonth() + 1, 2);
		const date = Helper.fill(d.getDate(), 2);
		const hour = Helper.fill(d.getHours(), 2);
		const minute = Helper.fill(d.getMinutes(), 2);
		const second = Helper.fill(d.getSeconds(), 2);
		if (formatter) return formatter(d, year, month, date, hour, minute, second);
		return `${year}/${month}/${date} ${hour}:${minute}:${second}`;
	}
}
