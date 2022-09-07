"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ChileanRutify = /*#__PURE__*/function () {
  function ChileanRutify() {
    _classCallCheck(this, ChileanRutify);
  }

  _createClass(ChileanRutify, [{
    key: "validRutValue",
    value: // validates that value can be used in a rut
    function validRutValue(value) {
      value = this.stringifyValue(value);
      var validValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "k", "K", ".", "-"];
      return validValues.includes(value);
    } //returns a string if posible

  }, {
    key: "stringifyValue",
    value: function stringifyValue(value) {
      if (typeof value === "string" || typeof value === "number") {
        return value.toString();
      }

      return;
    } // validates if rut values are valid

  }, {
    key: "validRutValues",
    value: function validRutValues(rut) {
      rut = this.stringifyValue(rut);

      for (var i = 0; i < rut.length; i++) {
        if (!this.validRutValue(rut[i])) {
          return false;
        }
      }

      return true;
    } // returns rut without dots or dashes

  }, {
    key: "normalizeRut",
    value: function normalizeRut(rut) {
      rut = this.stringifyValue(rut);

      if (rut === null || !this.validRutValues(rut)) {
        return;
      }

      rut = rut.replace(/[.-]/g, "");
      return rut.toUpperCase();
    } // get the rut verifier digit

  }, {
    key: "getRutVerifier",
    value: function getRutVerifier(rut) {
      rut = this.normalizeRut(rut);

      if (rut === null) {
        return;
      }

      var sum = 0;
      var mul = 2;

      for (var i = rut.length - 1; i >= 0; i--) {
        sum += parseInt(rut[i]) * mul;
        mul === 7 ? mul = 2 : mul++;
      }

      var res = sum % 11;
      return this.translateVerifierResult(res);
    } // translate rut verifier digit

  }, {
    key: "translateVerifierResult",
    value: function translateVerifierResult(result) {
      if (result === 0) {
        return "0";
      }

      if (result === 1) {
        return "k";
      }

      return (11 - result).toString();
    } // validates rut verifier digit

  }, {
    key: "validRutVerifier",
    value: function validRutVerifier(rut) {
      rut = this.normalizeRut(rut);

      if (rut === null) {
        return;
      }

      var verifier = rut.slice(-1);
      var rutValue = rut.slice(0, -1);
      return verifier === this.getRutVerifier(rutValue);
    } // validates rut

  }, {
    key: "validRut",
    value: function validRut(rut) {
      rut = this.normalizeRut(rut);

      if (rut === null) {
        return;
      }

      return this.validRutValues(rut) && this.validRutVerifier(rut);
    } // formats rut

  }, {
    key: "formatRut",
    value: function formatRut(rut) {
      rut = this.normalizeRut(rut);

      if (rut === null) {
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
    }
  }]);

  return ChileanRutify;
}();

module.exports = new ChileanRutify();