export const generateRefNum = (lastItem) =>{
    const date = new Date();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    const prefix = `${mm}${yy}`;
    const lastMonth = lastItem ? lastItem?.numRef.slice(0, 4) : null;
    const nextNum = (lastMonth === prefix) ? (parseInt(lastItem?.numRef.slice(-4)) + 1) : 1;

    return `${prefix}${String(nextNum).padStart(4, '0')}`;
}