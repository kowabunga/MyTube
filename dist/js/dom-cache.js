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
  prevComedyBtn = document.getElementById('prev-comedy'),
  nextComedyBtn = document.getElementById('next-comedy'),
  prevNewsBtn = document.getElementById('prev-news'),
  nextNewsBtn = document.getElementById('next-news'),
  prevChannelVidBtn = document.getElementById('prev-channel-video'),
  nextChannelVidBtn = document.getElementById('next-channel-video'),
  resultsContainer = document.getElementById('results-container'),
  searchedVideoItems = document.getElementById('search-items'),
  videoSection = document.getElementById('video'),
  videoCenter = document.getElementById('video-center'),
  videoDesc = document.getElementById('video-desc'),
  videoPlayer = document.getElementById('player'),
  relevantVideoItems = document.getElementById('relevant-videos-items'),
  relevantVideos = document.getElementById('relevant-videos'),
  commentsUl = document.getElementById('comments-ul'),
  homePageContainer = document.getElementById('home-page-container'),
  newsSection = document.getElementById('news'),
  comedySection = document.getElementById('comedy'),
  moreCommentsBtn = document.getElementById('more-comments'),
  submitComment = document.getElementById('submit-comment'),
  commentInput = document.getElementById('input-comment'),
  searchContainer = document.getElementById('search-container'),
  brand = document.getElementById('brand'),
  likeBtn = document.getElementById('like'),
  dislikeBtn = document.getElementById('dislike'),
  videoContainer = document.getElementById('videos-container'),
  viewChannel = document.getElementById('view-channel'),
  channelContainer = document.getElementById('channel-container'),
  channelBanner = document.getElementById('channel-banner'),
  channelTitle = document.getElementById('channel-info-title'),
  channelDescription = document.getElementById('channel-info-description'),
  channelThumbnail = document.getElementById('channel-info-thumbnail'),
  channelVideosSection = document.getElementById('channel-content-videos'),
  channelVideosUl = document.getElementById('channel-content-videos-list');
/* ------------------------------------------------------------------------- */
// classes
const youtube = new Youtube(),
  svUI = new SearchAndVideoUi(),
  chUI = new ChannelsUi(),
  googleAuth = new GoogleAuth();

// Other variables
let searchParameter = '';

// Loads the Google API Client library for use in all other files and init client
googleAuth.loadClient();

// Allows page reload by clicking brand logo
brand.addEventListener('click', () => window.location.reload());
