// validates that value can be used in a rut
export const validRutValue = (value: string) => {
  value = stringifyValue(value) as string;
  const validValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "k", "K", ".", "-"];
  return validValues.includes(value);
}

//returns a string if posible
export const stringifyValue = (value: string |  number) => {
  if (typeof value === "string" || typeof value === "number"){
    return value.toString();
  }

  return;
}

// validates if rut values are valid
export const validRutValues = (rut: string) =>{
  rut = stringifyValue(rut) as string;
  if(!rut){
    return false;
  }

  for (const element of rut){
    if (!validRutValue(element)){
      return false;
    }
  }
  return true;
}

// returns rut without dots or dashes
export const normalizeRut = (rut: string) => {
  rut = stringifyValue(rut) as string;
  if(!rut || !validRutValues(rut)){
    return;
  }

  rut = rut.replace(/[.-]/g, "");
  return rut.toUpperCase();
}

// get the rut verifier digit
export const getRutVerifier = (rut: string) => {
  rut = normalizeRut(rut) as string;
  if(!rut){
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
}

// translate rut verifier digit
export const translateVerifierResult = (result: number) => {
  if (result === 0){
    return "0";
  }

  if (result === 1){
    return "K";
  }

  return (11 - result).toString();
}

// validates rut verifier digit
export const validRutVerifier = (rut: string) => {
  rut = normalizeRut(rut) as string;
  if(!rut){
    return;
  }

  const verifier = rut.slice(-1);
  const rutValue = rut.slice(0, -1);

  return verifier === getRutVerifier(rutValue);
}

// validates rut
export const validRut = (rut: string) =>{
  rut = normalizeRut(rut) as string;
  if(!rut){
    return;
  }

  return validRutValues(rut) && validRutVerifier(rut);
}

// formats rut
export const formatRut = (rut: string) => {
  rut = normalizeRut(rut) as string;
  if(!rut){
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