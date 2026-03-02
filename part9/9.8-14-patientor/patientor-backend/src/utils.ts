import { Gender, NewPatient } from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object != "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseStringParam(object.name),
      dateOfBirth: parseStringParam(object.dateOfBirth),
      ssn: parseStringParam(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringParam(object.occupation),
    };
    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseGender = (param: unknown): Gender => {
  if (!param || !isString(param) || !isGender(param)) {
    throw new Error("Invalid or missing gender: " + param);
  }
  return param;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseStringParam = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error("Incorrect or missing field");
  }

  return param;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
