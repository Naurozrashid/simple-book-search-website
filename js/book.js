        //  getelemntbyid function
        const getElementById = (id,display) => {
            document.getElementById(id).style.display = display;
        }
      
     

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    getElementById('error-message2','none');
        getElementById('error-message','none');
    getElementById('spinner','block');
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
   
    if (searchText === '') {
        getElementById('error-message2','block');
        getElementById('error-message','none');
        getElementById('total','none');
        getElementById('spinner','none');
        
    }
    else {
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
    }
}


 //display result function 
  const displaySearchResult = bookes => {
    getElementById('error-message2','none');
    getElementById('spinner','none');
    // total found show
    getElementById('total','block');
    document.getElementById('total-found').innerText=`${bookes.numFound}`;

    const books=bookes.docs;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    document.getElementById('error-message').style.display = 'none';
    if (books.length === 0) {
        getElementById('error-message','block');
        getElementById('total','none');
    }
    books.forEach(book => {
        const img=`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid p-2" style="height:350px;" alt="...">
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