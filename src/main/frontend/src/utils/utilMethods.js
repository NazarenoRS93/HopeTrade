export const isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
};