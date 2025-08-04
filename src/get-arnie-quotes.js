const { httpGet } = require('./mock-http-interface');

const parseResponse = (response) => {
    const { message } = JSON.parse(response.body);

    if (response.status === 200) {
        return { 'Arnie Quote': message };
    }

    return { FAILURE: message };
};

const handleRequest = async (url) => {
    try {
        const response = await httpGet(url);
        return parseResponse(response);
    } catch (error) {
        return { FAILURE: error.message || 'Unknown error' };
    }
};

const getArnieQuotes = (urls) => {
    const quotePromises = urls.map((url) => handleRequest(url));
    
    return Promise.all(quotePromises);
};

module.exports = {
    getArnieQuotes,
};
