class ChileanRutify {
  // validates that value can be used in a rut
  validRutValue(value){
    value = this.stringifyValue(value);
    const validValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "k", "K", ".", "-"];
    return validValues.includes(value);
  }

  //returns a string if posible
  stringifyValue(value){
    if (typeof value === "string" || typeof value === "number"){
      return value.toString();
    }

    return;
  }

  // validates if rut values are valid
  validRutValues(rut){
    rut = this.stringifyValue(rut);
    for (let i = 0; i < rut.length; i++){
      if (!this.validRutValue(rut[i])){
        return false;
      }
    }
    return true;
  }

  // returns rut without dots or dashes
  normalizeRut(rut){
    rut = this.stringifyValue(rut);
    if(rut === null || !this.validRutValues(rut)){
      return;
    }

    rut = rut.replace(/[.-]/g, "");
    return rut.toUpperCase();
  }

  // get the rut verifier digit
  getRutVerifier(rut){
    rut = this.normalizeRut(rut);
    if(rut === null){
      return;
    }

    let sum = 0;
    let mul = 2;

    for (let i = rut.length - 1; i >= 0; i--) {
      sum += parseInt(rut[i]) * mul;
      mul === 7 ? mul = 2 : mul++;
    }

    const res = sum % 11;

    return this.translateVerifierResult(res);
  }

  // translate rut verifier digit
  translateVerifierResult(result){
    if (result === 0){
      return "0";
    }

    if (result === 1){
      return "k";
    }

    return (11 - result).toString();
  }

  // validates rut verifier digit
  validRutVerifier(rut){
    rut = this.normalizeRut(rut);
    if(rut === null){
      return;
    }

    const verifier = rut.slice(-1);
    const rutValue = rut.slice(0, -1);

    return verifier === this.getRutVerifier(rutValue);
  }

  // validates rut
  validRut(rut){
    rut = this.normalizeRut(rut);
    if(rut === null){
      return;
    }

    return this.validRutValues(rut) && this.validRutVerifier(rut);
  }

  // formats rut
  formatRut(rut){
    rut = this.normalizeRut(rut);
    if(rut === null){
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
  }
}

module.exports = new ChileanRutify;