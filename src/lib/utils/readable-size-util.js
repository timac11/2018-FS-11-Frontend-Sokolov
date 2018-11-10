const constants = new Map([
    ["Bytes", 1],
    ["KB", 1024],
    ["MB", 1048576],
    ["GB", 1073741824]
]);

const getReadableSize = function (size) {
    const bytes = 'Bytes';
    let val;
    size = parseInt(size);
    if (size) {
        val = size + ' ' + bytes;
        constants.forEach(function (value, key) {
            if (Math.floor(size / value) > 0) {
                val = Math.floor(size / value) + ' ' + key;
            }
        });
        return val;
    } else {
        return 'Not a number'
    }
};

export {getReadableSize, constants}