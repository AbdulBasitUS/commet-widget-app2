export const generateTimeStamp = (timeStampString) => {
    const d = (timeStampString === undefined)? new Date() : new Date(timeStampString)
    return d.toString()
}