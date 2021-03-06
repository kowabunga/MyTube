/* ------------------------------------------------------------------------- */
// Init classes

// Event listeners
searchSubmit.addEventListener('click', submitQuery);
showSearchResultsBtn.addEventListener('click', svUI.showResults);
closeSearchBtn.addEventListener('click', svUI.hideResults);
searchVideoBtn.addEventListener('click', svUI.showSearchResults);
searchPlaylistBtn.addEventListener('click', svUI.showSearchResults);
searchPlaylistItemsBtn.addEventListener('click', svUI.showSearchResults);
channelPlaylistItemsBtn.addEventListener('click', svUI.showSearchResults);
searchedPlaylistItems.addEventListener('click', e => {
  viewPlaylistVideos(e, searchPlaylistSection, searchedPlaylistItems);
});

// homepage
function setUpHomePage() {
  youtube
    .getSearchResults('web development', 24, 'video')
    .then(data => svUI.displayVideos(data.result, 'web-development'))
    .catch(err => console.log(err));
  youtube
    .getSearchResults('news', 24, 'video')
    .then(data => svUI.displayVideos(data.result, 'main-news'))
    .catch(err => console.log(err));
}

// I think this is the best way? Need to check on that eventually
window.addEventListener('load', () => {
  setTimeout(() => {
    setUpHomePage();
  }, 1000);
});

function submitQuery(e) {
  e.preventDefault();

  //   submit search request and get results so long as user actually inputs something
  searchParameter = searchInput.value;
  if (searchParameter !== '') {
    if (
      searchInput.classList.contains('search-error') &&
      searchSubmit.classList.contains('search-error')
    ) {
      // remove error classes, make error text go away
      searchInput.classList.remove('search-error');
      searchSubmit.classList.remove('search-error');
      searchedTerm.innerText = '';
    }

    // Check if search results is hidden, if so add the show class
    if (searchResults.classList.contains('hide-search')) {
      svUI.showResults(e);
    }
    videoSection.classList.add('invisible');

    resultsContainer.classList.remove('hide'); //

    // make request to api with search parameter and display in webpage for both videos and playlists
    youtube
      .getSearchResults(searchParameter, 24, 'video')
      .then(data => svUI.displayVideos(data.result, 'search-results'))
      .catch(err => console.log(err));

    youtube
      .getSearchResults(searchParameter, 24, 'playlist')
      .then(data => chUI.buildPlaylistSection(data, searchedPlaylistItems, true))
      .catch(err => console.log(err));

    searchInput.value = '';

    if (searchVideoSection.classList.contains('hide')) {
      svUI.showSearchResults();
    }
    // show search results - none => flex
    searchResults.classList.remove('hide');
  } else if (searchParameter === '') {
    // If search is empty but submit is clicked/entered, add error classes
    searchedTerm.innerText = 'Please enter something to search.';
    searchInput.classList.add('search-error');
    searchSubmit.classList.add('search-error');

    // Remove error after 10 seconds if user does not enter anything
    setTimeout(() => {
      if (
        searchInput.classList.contains('search-error') &&
        searchSubmit.classList.contains('search-error')
      ) {
        // remove error classes, make error text go away
        searchInput.classList.remove('search-error');
        searchSubmit.classList.remove('search-error');
        searchedTerm.innerText = '';
      }
    }, 10000);
  }
  window.scrollTo(0, 0);
}
