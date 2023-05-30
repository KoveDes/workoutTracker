const pagination = (arr, limitParam, skipParam) => {
    const limit = limitParam ? parseInt(limitParam) : arr.length;
    const skip = skipParam ? parseInt(skipParam) : 0;
    return arr.slice(skip, skip + limit);

}
module.exports = pagination;