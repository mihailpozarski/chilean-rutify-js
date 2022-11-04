"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRut = exports.validRut = exports.validRutVerifier = exports.translateVerifierResult = exports.getRutVerifier = exports.normalizeRut = exports.validRutValues = exports.stringifyValue = exports.validRutValue = void 0;
// validates that value can be used in a rut
var validRutValue = function (value) {
    value = (0, exports.stringifyValue)(value);
    var validValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "k", "K", ".", "-"];
    return validValues.includes(value);
};
exports.validRutValue = validRutValue;
//returns a string if posible
var stringifyValue = function (value) {
    if (typeof value === "string" || typeof value === "number") {
        return value.toString();
    }
    return;
};
exports.stringifyValue = stringifyValue;
// validates if rut values are valid
var validRutValues = function (rut) {
    rut = (0, exports.stringifyValue)(rut);
    if (!rut) {
        return false;
    }
    for (var _i = 0, rut_1 = rut; _i < rut_1.length; _i++) {
        var element = rut_1[_i];
        if (!(0, exports.validRutValue)(element)) {
            return false;
        }
    }
    return true;
};
exports.validRutValues = validRutValues;
// returns rut without dots or dashes
var normalizeRut = function (rut) {
    rut = (0, exports.stringifyValue)(rut);
    if (!rut || !(0, exports.validRutValues)(rut)) {
        return;
    }
    rut = rut.replace(/[.-]/g, "");
    return rut.toUpperCase();
};
exports.normalizeRut = normalizeRut;
// get the rut verifier digit
var getRutVerifier = function (rut) {
    rut = (0, exports.normalizeRut)(rut);
    if (!rut) {
        return;
    }
    var sum = 0;
    var mul = 2;
    for (var i = rut.length - 1; i >= 0; i--) {
        sum += parseInt(rut[i]) * mul;
        mul === 7 ? mul = 2 : mul++;
    }
    var res = sum % 11;
    return (0, exports.translateVerifierResult)(res);
};
exports.getRutVerifier = getRutVerifier;
// translate rut verifier digit
var translateVerifierResult = function (result) {
    if (result === 0) {
        return "0";
    }
    if (result === 1) {
        return "K";
    }
    return (11 - result).toString();
};
exports.translateVerifierResult = translateVerifierResult;
// validates rut verifier digit
var validRutVerifier = function (rut) {
    rut = (0, exports.normalizeRut)(rut);
    if (!rut) {
        return;
    }
    var verifier = rut.slice(-1);
    var rutValue = rut.slice(0, -1);
    return verifier === (0, exports.getRutVerifier)(rutValue);
};
exports.validRutVerifier = validRutVerifier;
// validates rut
var validRut = function (rut) {
    rut = (0, exports.normalizeRut)(rut);
    if (!rut) {
        return;
    }
    return (0, exports.validRutValues)(rut) && (0, exports.validRutVerifier)(rut);
};
exports.validRut = validRut;
// formats rut
var formatRut = function (rut) {
    rut = (0, exports.normalizeRut)(rut);
    if (!rut) {
        return;
    }
    var verifier = rut.slice(-1);
    var rutValue = rut.slice(0, -1);
    var rutFormated = "";
    for (var i = rutValue.length - 1; i >= 0; i--) {
        rutFormated = rutValue[i] + rutFormated;
        if ((rutValue.length - i) % 3 === 0 && i !== 0) {
            rutFormated = "." + rutFormated;
        }
    }
    return rutFormated + "-" + verifier;
};
exports.formatRut = formatRut;
exports.default = {
    validRutValue: exports.validRutValue,
    stringifyValue: exports.stringifyValue,
    validRutValues: exports.validRutValues,
    normalizeRut: exports.normalizeRut,
    getRutVerifier: exports.getRutVerifier,
    translateVerifierResult: exports.translateVerifierResult,
    validRutVerifier: exports.validRutVerifier,
    validRut: exports.validRut,
    formatRut: exports.formatRut
};
