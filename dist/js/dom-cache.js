// cachine dom items
const body = document.body,
  searchResults = document.getElementById('search-results'),
  searchInput = document.getElementById('search-input'),
  searchedTerm = document.getElementById('searched-term'),
  closeSearchBtn = document.getElementById('window-close'),
  showSearchResults = document.getElementById('show-search'),
  searchSubmit = document.getElementById('submit-search'),
  resultsTermDisplay = document.getElementById('results-term-field'),
  prevSearchBtn = document.getElementById('prev-search'),
  nextSearchBtn = document.getElementById('next-search'),
  prevTrending = document.getElementById('prev-trending'),
  nextTrending = document.getElementById('next-trending'),
  prevNews = document.getElementById('prev-news'),
  nextNews = document.getElementById('next-news'),
  resultsContainer = document.getElementById('results-container'),
  searchedVideoItems = document.getElementById('search-items'),
  videoSection = document.getElementById('video'),
  videoCenter = document.getElementById('video-center'),
  videoPlayer = document.getElementById('player'),
  relatedVideoItems = document.getElementById('relevant-videos-items'),
  commentsUl = document.getElementById('comments-ul'),
  homePageContainer = document.getElementById('home-page-container'),
  newsSection = document.getElementById('news'),
  trendingSection = document.getElementById('trending'),
  moreCommentsBtn = document.getElementById('more-comments'),
  submitComment = document.getElementById('submit-comment'),
  commentInput = document.getElementById('input-comment'),
  colorSwitcher = document.getElementById('color-mode'),
  colorCircle = document.getElementById('color-circle'),
  colorSun = document.getElementById('color-mode-icon-sun'),
  colorMoon = document.getElementById('color-mode-icon-moon'),
  searchContainer = document.getElementById('search-container'),
  brand = document.getElementById('brand');

/* ------------------------------------------------------------------------- */
// classes
const youtube = new Youtube(),
  ui = new UI(),
  googleAuth = new GoogleAuth();

// Other variables
let searchParameter = '';
