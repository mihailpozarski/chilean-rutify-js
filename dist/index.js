// validates that value can be used in a rut
export const validRutValue = (value) => {
    value = stringifyValue(value);
    const validValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "k", "K", ".", "-"];
    return validValues.includes(value);
};
//returns a string if posible
export const stringifyValue = (value) => {
    if (typeof value === "string" || typeof value === "number") {
        return value.toString();
    }
    return;
};
// validates if rut values are valid
export const validRutValues = (rut) => {
    rut = stringifyValue(rut);
    if (!rut) {
        return false;
    }
    for (const element of rut) {
        if (!validRutValue(element)) {
            return false;
        }
    }
    return true;
};
// returns rut without dots or dashes
export const normalizeRut = (rut) => {
    rut = stringifyValue(rut);
    if (!rut || !validRutValues(rut)) {
        return;
    }
    rut = rut.replace(/[.-]/g, "");
    return rut.toUpperCase();
};
// get the rut verifier digit
export const getRutVerifier = (rut) => {
    rut = normalizeRut(rut);
    if (!rut) {
        return;
    }
    let sum = 0;
    let mul = 2;
    for (let i = rut.length - 1; i >= 0; i--) {
        sum += parseInt(rut[i]) * mul;
        mul === 7 ? mul = 2 : mul++;
    }
    const res = sum % 11;
    return translateVerifierResult(res);
};
// translate rut verifier digit
export const translateVerifierResult = (result) => {
    if (result === 0) {
        return "0";
    }
    if (result === 1) {
        return "K";
    }
    return (11 - result).toString();
};
// validates rut verifier digit
export const validRutVerifier = (rut) => {
    rut = normalizeRut(rut);
    if (!rut) {
        return;
    }
    const verifier = rut.slice(-1);
    const rutValue = rut.slice(0, -1);
    return verifier === getRutVerifier(rutValue);
};
// validates rut
export const validRut = (rut) => {
    rut = normalizeRut(rut);
    if (!rut) {
        return;
    }
    return validRutValues(rut) && validRutVerifier(rut);
};
// formats rut
export const formatRut = (rut) => {
    rut = normalizeRut(rut);
    if (!rut) {
        return;
    }
    const verifier = rut.slice(-1);
    const rutValue = rut.slice(0, -1);
    let rutFormated = "";
    for (let i = rutValue.length - 1; i >= 0; i--) {
        rutFormated = rutValue[i] + rutFormated;
        if ((rutValue.length - i) % 3 === 0 && i !== 0) {
            rutFormated = "." + rutFormated;
        }
    }
    return rutFormated + "-" + verifier;
};
export default {
    validRutValue,
    stringifyValue,
    validRutValues,
    normalizeRut,
    getRutVerifier,
    translateVerifierResult,
    validRutVerifier,
    validRut,
    formatRut
};
