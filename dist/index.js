"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validRutVerifier = exports.validRutValues = exports.validRutValue = exports.validRut = exports.translateVerifierResult = exports.stringifyValue = exports.normalizeRut = exports.getRutVerifier = exports.formatRut = exports["default"] = void 0;

// validates that value can be used in a rut
var validRutValue = function validRutValue(value) {
  value = stringifyValue(value);
  var validValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "k", "K", ".", "-"];
  return validValues.includes(value);
}; //returns a string if posible


exports.validRutValue = validRutValue;

var stringifyValue = function stringifyValue(value) {
  if (typeof value === "string" || typeof value === "number") {
    return value.toString();
  }

  return;
}; // validates if rut values are valid


exports.stringifyValue = stringifyValue;

var validRutValues = function validRutValues(rut) {
  rut = stringifyValue(rut);

  if (!rut) {
    return false;
  }

  for (var i = 0; i < rut.length; i++) {
    if (!validRutValue(rut[i])) {
      return false;
    }
  }

  return true;
}; // returns rut without dots or dashes


exports.validRutValues = validRutValues;

var normalizeRut = function normalizeRut(rut) {
  rut = stringifyValue(rut);

  if (!rut || !validRutValues(rut)) {
    return;
  }

  rut = rut.replace(/[.-]/g, "");
  return rut.toUpperCase();
}; // get the rut verifier digit


exports.normalizeRut = normalizeRut;

var getRutVerifier = function getRutVerifier(rut) {
  rut = normalizeRut(rut);

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
  return translateVerifierResult(res);
}; // translate rut verifier digit


exports.getRutVerifier = getRutVerifier;

var translateVerifierResult = function translateVerifierResult(result) {
  if (result === 0) {
    return "0";
  }

  if (result === 1) {
    return "K";
  }

  return (11 - result).toString();
}; // validates rut verifier digit


exports.translateVerifierResult = translateVerifierResult;

var validRutVerifier = function validRutVerifier(rut) {
  rut = normalizeRut(rut);

  if (!rut) {
    return;
  }

  var verifier = rut.slice(-1);
  var rutValue = rut.slice(0, -1);
  return verifier === getRutVerifier(rutValue);
}; // validates rut


exports.validRutVerifier = validRutVerifier;

var validRut = function validRut(rut) {
  rut = normalizeRut(rut);

  if (!rut) {
    return;
  }

  return validRutValues(rut) && validRutVerifier(rut);
}; // formats rut


exports.validRut = validRut;

var formatRut = function formatRut(rut) {
  rut = normalizeRut(rut);

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
var _default = {
  validRutValue: validRutValue,
  stringifyValue: stringifyValue,
  validRutValues: validRutValues,
  normalizeRut: normalizeRut,
  getRutVerifier: getRutVerifier,
  translateVerifierResult: translateVerifierResult,
  validRutVerifier: validRutVerifier,
  validRut: validRut,
  formatRut: formatRut
};
exports["default"] = _default;