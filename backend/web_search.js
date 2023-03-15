// Web Search
// A node js program that searches the web for a given query
// and returns the top 10 results

// Import the required modules

const
    googleIt = require('google-it');

let
    titles = [],
    links = [],
    snippets = "";

async function searchGoogle(query) {
    const options = {
        query: query,
        limit: 10,
        video: false,
        image: false,
        news: false,
        logRequests: false
    };

    titles = [];
    links = [];
    snippets = "";

    const results = await googleIt(options);

    results.forEach(result => {
        titles.push(result.title);
        links.push(result.link);
        snippets += result.snippet;
    });

    return {
        links,
        snippets
    }
}

module.exports = {
    searchGoogle
}