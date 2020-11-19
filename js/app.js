const searchTermEl = document.querySelector('#searchTerm');
const searchResultEl = document.querySelector('#searchResult');

let timeOutId;

searchTermEl.focus();


searchTermEl.addEventListener('input', function(event) {
    search(event.target.value);
})

const search = (searchTerm) => {
    // reset the previous timer
    if(timeOutId) {
        clearTimeout(timeOutId);
    }

    // setup a new timer
    timeOutId = setTimeout(async () => {
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
    }, 500);
    
}


