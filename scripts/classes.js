class Youtube {
  constructor() {
    this.api_key = 'AIzaSyDBvwg2Jr6a1CZ1jdroGeh_QVM5tS-AD7Y';
    this.part = 'snippet';
    this.type = 'video';
  }

  async getSearchResults(searchValue) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=${this.part}&q=${searchValue}&type=${this.type}&key=${this.api_key}`);
    const resData = await response.json();
    return resData;
  }
}
