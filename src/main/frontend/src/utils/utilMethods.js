export const isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
};

export const onlyNumbers = (event) => { 
    // Sirve para validar que solo se admitan caracteres númericos en un string (target.value) de un objeto evento
    event.target.value = event.target.value.replace(/[^0-9]/g, '') 
};
