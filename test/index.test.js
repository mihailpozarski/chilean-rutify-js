import { validRutValue, validRutValues, getRutVerifier, validRutVerifier, normalizeRut, formatRut, validRut, stringifyValue } from "../dist";

test("validRutValue", () => {
    expect(validRutValue("y")).toBe(false);
    expect(validRutValue("/")).toBe(false);
    expect(validRutValue([])).toBe(false);
    expect(validRutValue(0)).toBe(true);
    expect(validRutValue("9")).toBe(true);
    expect(validRutValue("k")).toBe(true);
    expect(validRutValue("K")).toBe(true);
});

test("validRutValues", () => {
    expect(validRutValues("ya12")).toBe(false);
    expect(validRutValues("/s21")).toBe(false);
    expect(validRutValues(["1234"])).toBe(false);
    expect(validRutValues(1234)).toBe(true);
    expect(validRutValues("4.678-9")).toBe(true);
    expect(validRutValues("234k")).toBe(true);
    expect(validRutValues("K")).toBe(true);
});

test("getRutVerifier", () => {
    expect(getRutVerifier("12148514")).toBe("1");
    expect(getRutVerifier("23379716")).toBe("2");
    expect(getRutVerifier("32938250")).toBe("8");
    expect(getRutVerifier("36128619")).not.toBe("0");
    expect(getRutVerifier("36228719")).not.toBe("0");
});

test("validRutVerifier", () => {
    expect(validRutVerifier("12148514-1")).toBe(true);
    expect(validRutVerifier("23379716-2")).toBe(true);
    expect(validRutVerifier("32938250-8")).toBe(true);
    expect(validRutVerifier("36128619-0")).toBe(false);
    expect(validRutVerifier("36228719-0")).toBe(false);
});

test("normalizeRut", () => {
    expect(normalizeRut("12.148.514-1")).toBe("121485141");
    expect(normalizeRut("23379.716-2")).toBe("233797162");
    expect(normalizeRut("8.250-8")).toBe("82508");
    expect(normalizeRut("36128619-0")).toBe("361286190");
});

test("formatRut", () => {
    expect(formatRut("12.1485141")).toBe("12.148.514-1");
    expect(formatRut("23379.7162")).toBe("23.379.716-2");
    expect(formatRut("3293825-08")).toBe("32.938.250-8");
    expect(formatRut("36128619-0")).toBe("36.128.619-0");
});

test("validRut", () => {
    expect(validRut("12.148.514-1")).toBe(true);
    expect(validRut("23379.716-2")).toBe(true);
    expect(validRut("329382508")).toBe(true);
    expect(validRut("18531474-k")).toBe(true);
    expect(validRut("36128619-0")).toBe(false);
});

test("stringifyRut", () => {
    expect(stringifyValue("12.148.514-1")).toBe("12.148.514-1");
    expect(stringifyValue(233797162)).toBe("233797162");
    expect(stringifyValue([])).toBe(undefined);
    expect(stringifyValue(["36128619-0"])).toBe(undefined);
});