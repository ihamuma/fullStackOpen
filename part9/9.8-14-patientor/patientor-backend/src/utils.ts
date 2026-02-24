import { Gender, NewPatient } from "./types";

export const toNewPatient = (object: unknown): NewPatient => {



    const newPatient = {
        name,
        dateOfBirth: object.dateOfBirth,
        ssn: object.ssn,
        gender: object.gender,
        occupation: object.occupation
    };

    return newPatient;
};

const parseGender = (param: unknown): Gender => {
    if (!param || isString(param) || !isGender(param)) {
        throw new Error('Invalid or missing gender: ' + param);
    }
    return param;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseStringParam = (param: unknown): string => {
    if (!param || !isString(param)) {
        throw new Error('Incorrect or missing field');
    }

    return param;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

/*
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
*/