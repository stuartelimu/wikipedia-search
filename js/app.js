const searchTermEl = document.querySelector('#searchTerm');
const searchResultEl = document.querySelector('#searchResult');

searchTermEl.focus();


searchTermEl.addEventListener('input', function(event) {
    search(event.target.value);
})

const debounce = (fn, delay=500) => {

    let timeoutId;

    return (...args) => {
        // cancel the previous timer
        if(timeoutId) {
            clearTimeout(timeoutId);
        }

        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay)
    }
}


const search = debounce(async (searchTerm) => {

    // if searchTerm is removed
    // reset search result
    if(!searchTerm) {
        // reset the search results
        searchResultEl.innerHTML = '';
        return;
    }
    
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchTerm}`;
        const response = await fetch(url);
        const searchResults = await response.json();

        // render search result
        const searchResultHtml = generateHTML(searchResults.query.search, searchTerm);

        // add searchResult to searchResultEl
        searchResultEl.innerHTML = searchResultHtml;
    } catch(error) {
        console.log(error);
    }
    
})



const stripHtml = (html) => {
    let div = document.createElement('div');
    div.textContent = html;
    return div.textContent;
}

const highlight = (str, keyword, className = "highlight") => {
    const h1 = `<span class="${className}">${keyword}</span>`;
    return str.replace(new RegExp(keyword, 'gi'), h1)
}


const generateHTML = (results, searchTerm) => {
    return results
        .map(result => {
            const title = highlight(stripHtml(result.title), searchTerm);
            const snippet = highlight(stripHtml(result.snippet), searchTerm);

            return `<article>
                <a href="https://en.wikipedia.org/?curid=${result.pageid}">
                    <h2>${title}</h2>
                </a>
                <div class="summary">${snippet}...</div>
            </article>`
        }).join('');
}