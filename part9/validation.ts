export const isNumberArray = (possibleNumberArray: unknown): possibleNumberArray is number[] => {
    if (!Array.isArray(possibleNumberArray)) return false;
    const areNumbers = possibleNumberArray.every(function(element) {return typeof element === 'number';});
    return areNumbers;
};