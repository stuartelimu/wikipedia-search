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
    
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchTerm}`;
        const response = await fetch(url);
        const searchResults = await response.json();

        // show search results to console
        console.log({
            'term': searchTermEl,
            'results': searchResults.query.search
        })
    } catch(error) {
        console.log(error);
    }
    
})

