const text = `Google LLC is an American multinational technology company focusing on online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics. It has often been referred to as "the most powerful company in the world" and one of the world's most valuable brands due to its market dominance, data collection, and technological advantages in the area of artificial intelligence. Its parent company Alphabet is considered one of the Big Five American information technology companies, alongside Amazon, Apple, Meta, and Microsoft. Google was founded on September 4, 1998, by computerscientists Larry Page and Sergey Brin while they were PhD students  at Stanford University in California. Together theyown about 14% of its publicly listed shares and control 56% of its stockholder voting power through super-voting stock.The company went public via an initial public offering (IPO) in  2004. In 2015, Google was reorganized as a wholly ownedsubsidiary of Alphabet Inc. Google is Alphabet's largest subsidiary and is a holding company for Alphabet's internet properties and interests. Sundar Pichai was appointed CEO of Google on October 24, 2015, replacing Larry Page, who became the CEO of Alphabet. On December 3, 2019, Pichai also became the CEO of Alphabet.`
const title = "Google LLC"

// get js_summarize.js
const summarize = require('./js_summarize.js');


// get the summary
summary = summarize.summarize(title, text);


