           document.getElementById('error-message').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
   
    if (searchText === '') {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('total-found').innerText=`0`;
    }
    else {
        // load data
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
    }
}


const displaySearchResult = bookes => {
    document.getElementById('total-found').innerText=`${bookes.numFound}`;

    const books=bookes.docs;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    document.getElementById('error-message').style.display = 'none';
    if (books.length === 0) {
        document.getElementById('error-message').style.display = 'block';
    }
    books.forEach(book => {
        const img=`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center fw-bold">${book.title}</h5>
                <p class="card-text"><span class="fw-bold fw-1">Author Name: </span>${book.author_name}</p>
                <p class="card-text"><b class="fw-1">Publisher:</b> ${book.publisher}</p>
                <p class="card-text"><b class="fw-1">First Publish Year: </b>${book.first_publish_year}</p>
                
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
    
}