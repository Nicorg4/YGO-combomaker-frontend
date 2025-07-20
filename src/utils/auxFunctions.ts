
export const formatDate = (dateString: string): string => {
    /* dateString = 2023-04-26T12:00:00.000Z */
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
};