export const dateToString = (date: Date): string => {
    const dateObject = new Date(date)
    return dateObject.toLocaleDateString("es-AR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
};