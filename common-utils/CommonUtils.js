module.exports = {
    generateRandomAlphaNumericString: (length) => {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    },

    generateGUID: () => {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
    },
}