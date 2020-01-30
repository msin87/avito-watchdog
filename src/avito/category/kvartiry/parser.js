module.exports = baseResult => {
    const roomsMatch = baseResult.text.match(/^((\d)|студия)/i)[0];
    const rooms = Number(roomsMatch) ? Number(roomsMatch) : roomsMatch;
    return {
        rooms,
        area: Number(baseResult.text.match(/\d{0,4}(?=\sм²)/i)[0]),
        floor: Number(baseResult.text.match(/\d{1,2}(?=\/)/i)),
        floors: Number(baseResult.text.match(/(?<=\/)\d{1,2}/i))
    }
};