console.log("Let's get this party started!");

const form = document.querySelector('#search-form');
const searchTerm = document.querySelector('#search-term');
const gifContainer = document.querySelector('#gif-container');
const removeGifsButton = document.querySelector('#remove-gifs');


function addGif(gifUrl) {
  const newGif = document.createElement('img');
  newGif.src = gifUrl;
  gifContainer.appendChild(newGif);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const searchQuery = searchTerm.value;
  const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';
  const apiUrl = `http://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    console.log(response.data);

    if (response.data.data.length > 0) {
      const gifUrl = response.data.data[0].images.original.url;
      addGif(gifUrl);
    } else {
      alert('No GIFs found for that search term.');
    }
  } catch (error) {
    console.error('Error fetching data from Giphy API:', error);
  }

  searchTerm.value = '';
}

function handleRemoveGifs() {
  gifContainer.innerHTML = '';
}


form.addEventListener('submit', handleFormSubmit);
removeGifsButton.addEventListener('click', handleRemoveGifs);
