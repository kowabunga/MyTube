class SearchAndVideoUi {
  constructor() {
    // Need to bind *this* instead of arrow function - Safari evidently does not support arrow func in class in expected manner
    this.showResults = this.showResults.bind(this);
  }

  // Display videos on page
  displayVideos(data, pageSection) {
    // console.log(data);
    let output = '';
    // loop through data items and add video, name, title, etc. to list item and append to output
    if (data.items.length > 0) {
      data.items.forEach(item => {
        output += `
            <li class="search-item" data-videoId=${
              item.id.videoId || item.contentDetails.videoId
            } data-videoName="${item.snippet.title}" data-Author="${
          item.snippet.channelTitle
        }" data-channelid=${item.snippet.channelId}>
                    <img class="thumbnail" src="${
                      item.snippet.thumbnails.medium.url
                    }" alt="Thumbnail for ${item.snippet.title}" data-videoId=${
          item.id.videoId || item.contentDetails.videoId
        } data-channelid=${item.snippet.channelId} >
                <p data-videoId=${
                  item.id.videoId || item.contentDetails.videoId
                } data-channelid=${item.snippet.channelId}>
                    <strong class="video-title" data-videoId=${
                      item.id.videoId || item.contentDetails.videoId
                    } data-channelid=${item.snippet.channelId}>${
          item.snippet.title
        } </strong> <br>
                    Author: <a href='#!' data-channelid=${
                      item.snippet.channelId
                    } class='channel-author-id'>${item.snippet.channelTitle}</a>
                </p>
            </li>
        `;
      });
    } else {
      output = 'No videos.';
    }
    if (pageSection === 'search-results') {
      searchedVideoItems.innerHTML = output;

      // make pagination buttons work
      this.paginationButtons(
        data.prevPageToken,
        data.nextPageToken,
        prevSearchBtn,
        nextSearchBtn
      );
    } else if (pageSection === 'relevant-videos') {
      // add output to section and make section visible on website
      relevantVideoItems.innerHTML = output;
      relevantVideos.style.display = 'flex';

      // add description and display below video
      videoDesc.style.display = 'block';
      videoDesc.style.displaySearchResults = 'block';
    } else if (pageSection === 'main-news') {
      // add results to page
      newsSection.innerHTML = output;

      // make pagination buttons work
      this.paginationButtons(
        data.prevPageToken,
        data.nextPageToken,
        prevNewsBtn,
        nextNewsBtn
      );
    } else if (pageSection === 'main-comedy') {
      // add results to page
      comedySection.innerHTML = output;

      // make pagination buttons work
      this.paginationButtons(
        data.prevPageToken,
        data.nextPageToken,
        prevComedyBtn,
        nextComedyBtn
      );
    } else if (pageSection === 'channel-videos') {
      channelVideosUl.innerHTML = output;
      this.paginationButtons(
        data.prevPageToken,
        data.nextPageToken,
        prevChannelVidBtn,
        nextChannelVidBtn
      );
    }
  }

  // Display video comments on page
  displayVideoComments(data, getAllComments) {
    const commentsList = data.items;
    let output = '';

    // The following outer if/else deals with two conditions. If getAllComments is true, we loop through the returned result and append *all* items to the end of the ul.
    // If it is false, we just add the newly added comment to the beginning of the ul.

    // Loop through each item in data array to get comments and add to ul
    // Also check and see if there are replies to the comment, if so add them. If not, add empty string.
    if (getAllComments) {
      if (commentsList.length > 0) {
        commentsList.forEach(comment => {
          const author =
            comment.snippet.topLevelComment.snippet.authorDisplayName;
          const displayComment =
            comment.snippet.topLevelComment.snippet.textDisplay;
          output += `
          <li class="comment" data-commentid = ${comment.id}>
            <div id="comment-btns">
              <button class="reply-comment" data-tooltip="Reply"><i class="fas fa-reply"></i></button>
            </div>
            <p class="author">${author}</p>
            <br>
            <p class="author-comment">${displayComment}</p>
            <form class="reply-form" autocomplete="off">
              <input type="text" class="input-box" class="btn" placeholder="Add reply..." />
              <input type="submit" id="submit-reply" class="btn" value="Add Reply">
            </form>

            ${
              comment.snippet.totalReplyCount > 0
                ? this.addReplies(comment.replies.comments, comment.id)
                : ''
            }
          </li>
      `;
        });
      } else {
        output = 'No comments.';
        moreCommentsBtn.setAttribute('disabled', true);
      }

      // we use insertAdjascentHTML because we want to increase the list of comments, not replace them since there's no backwards pagination with this api
      commentsUl.insertAdjacentHTML('beforeend', output);

      // make pagination buttons work, pass in undefined for prevPage information. First check if there are comments (date.items will be greater than 0)
      if (data.items.length > 0) {
        this.paginationButtons(
          undefined,
          data.nextPageToken,
          undefined,
          moreCommentsBtn,
          data.items[0].snippet.videoId
        );
      }
    } else {
      const author = data.snippet.topLevelComment.snippet.authorDisplayName;
      const displayComment = data.snippet.topLevelComment.snippet.textDisplay;
      output = `
        <li class="comment" data-commentid = ${data.id}>
          <div id="comment-btns">
          <button class="reply-comment" data-tooltip="Reply"><i class="fas fa-reply"></i></button>
          </div>
          <p class="author">${author}</p>
          <br>
          <p class="author-comment">${displayComment}</p>
          <form class="reply-form" autocomplete="off">
            <input type="text" class="input-box" placeholder="Add reply..." />
            <input type="submit" id="submit-reply" class="btn" value="Add Reply">
          </form>
        </li>
        `;
      //  Here we insert the new comment at the beginning, as it was just posted.
      commentsUl.insertAdjacentHTML('afterbegin', output);
    }
  }

  // This function is called based on the conditional statement in displayVideComments(). It is called if totalReplyCount > 0, i.e. there are comments on the page. If so, this function creates a new unordered list with all comments within it and returns that unordered list to the calling function to be displayed on the page.
  addReplies(replies, commentId) {
    let output = ``;
    replies.forEach(reply => {
      const author = reply.snippet.authorDisplayName;
      const replyDisplay = reply.snippet.textDisplay;
      output += `
        <li class="comment" data-commentid = ${commentId}>
          <div id="comment-btns">
          <button class="reply-comment" data-tooltip="Reply"><i class="fas fa-reply"></i></button>
          </div>
          <p class="author">${author}</p>
          <br>
          <p class="author-comment">${replyDisplay}</p>
          <form class="reply-form" autocomplete="off">
            <input type="text" class="input-box" placeholder="Add reply..." />
            <input type="submit" id="submit-reply" class="btn" value="Add Reply">
          </form>
        </li>
      `;
    });
    return `
      <br><hr><br>
      <a class="view-replies" href="#/"><i class="fas fa-angle-down"></i> View Replies</a>
      <ul class="replies-ul">
        ${output}
      </ul>
    `;
  }

  addReply(reply, commentId, firstReply) {
    const author = reply.authorDisplayName;
    const replyDisplay = reply.textDisplay;
    const output = `        
        <li class="comment" data-commentid=${commentId}>
          <div id="comment-btns">
          <button class="reply-comment" data-tooltip="Reply"><i class="fas fa-reply"></i></button>
          </div>
          <p class="author">${author}</p>
          <br>
          <p class="author-comment">${replyDisplay}</p>
          <form class="reply-form" autocomplete="off">
            <input type="text" class="input-box" placeholder="Add reply..." />
            <input type="submit" id="submit-reply" class="btn" value="Add Reply">
          </form>
        </li>`;
    // If firstReply is true, add the replies ul + comment, else just add the comment
    return firstReply
      ? `
      <br><hr><br>
      <a class="view-replies" href="#/"><i class="fas fa-angle-down"></i> View Replies</a>
      <ul class="replies-ul">
      ${output}
      </ul>
    `
      : output;
  }

  updateReplies(data, commentLi, commentId) {
    if (commentLi.lastElementChild.classList.contains('replies-ul')) {
      commentLi.lastElementChild.insertAdjacentHTML(
        'afterbegin',
        this.addReply(data.snippet, commentId, false)
      );
    } else {
      commentLi.insertAdjacentHTML(
        'beforeend',
        this.addReply(data.snippet, commentId, true)
      );
    }
  }

  // Function to add data-attributes and disable/enable pagination buttons
  paginationButtons(prevPageToken, nextPageToken, prevBtn, nextBtn, videoId) {
    // Some parts of the api don't return previous page tokens, only next page. The pagination function is called with undefined variables in place of prevPageToken and prevBtn if the respective api call doesn't have such parameters
    if (prevPageToken === undefined && prevBtn === undefined) {
      nextPageToken !== undefined
        ? nextBtn.setAttribute('data-nextpage', nextPageToken)
        : nextBtn.removeAttribute('data-nextpage');
      nextBtn.hasAttribute('data-nextpage')
        ? (nextBtn.disabled = false)
        : (nextBtn.disabled = true);
      if (videoId !== null) {
        nextPageToken !== undefined
          ? nextBtn.setAttribute('data-videoid', videoId)
          : nextBtn.removeAttribute('data-nextpage');
      }
    } else {
      // Store prev page token/next page token in a data attribute in respective button
      // otherwise, remove the data attribute (no more prev/next pages)
      prevPageToken !== undefined
        ? prevBtn.setAttribute('data-prevpage', prevPageToken)
        : prevBtn.removeAttribute('data-prevpage');
      nextPageToken !== undefined
        ? nextBtn.setAttribute('data-nextpage', nextPageToken)
        : nextBtn.removeAttribute('data-nextpage');

      // Check if prev/next buttons have data-attribute (i.e. they will do something). If so, enable button else don't.
      prevBtn.hasAttribute('data-prevpage')
        ? (prevBtn.disabled = false)
        : (prevBtn.disabled = true);
      nextBtn.hasAttribute('data-nextpage')
        ? (nextBtn.disabled = false)
        : (nextBtn.disabled = true);
    }
  }

  // show search results after they have been hidden
  showResults(e) {
    body.style.overflow = 'hidden';
    e.preventDefault();
    if (searchResults.classList.contains('hide-search')) {
      searchResults.classList.remove('hide-search');
      searchResults.classList.add('show-search');
      closeSearchBtn.style.visibility = 'visible';
      videoSection.style.visibility = 'hidden';
    } else {
      this.hideResults();
    }

    // this if/else controls the background color based on light/dark mode selection
    if (body.classList.contains('dark')) {
      searchResults.classList.remove('light');
      searchResults.classList.add('dark');
    } else {
      searchResults.classList.remove('dark');
      searchResults.classList.add('light');
    }
  }

  // hide search results if they are shown
  hideResults() {
    body.style.overflow = 'auto';
    searchResults.classList.remove('show-search');
    searchResults.classList.add('hide-search');
    closeSearchBtn.style.visibility = 'hidden';
    videoSection.style.visibility = 'visible';
  }

  // MAKE BUTTONS SWITCH IF OPPOSITE IS PRESSED WHILE ACTIVE
  editRating(result, clickedBtn) {
    // result value is returned as false by api if it succeeds (for some reason...), need true to continue
    if (!result) {
      // if clicked button is like button
      if (clickedBtn.id === 'like') {
        // If button was already pressed, revert to unclicked status
        if (clickedBtn.classList.contains('liked')) {
          clickedBtn.classList.remove('liked');
          clickedBtn.innerText = 'Like';
        } else {
          // If button clicked is like, add liked class to button and change text.
          clickedBtn.classList.add('liked');
          clickedBtn.innerText = 'Liked';
        }

        // Also, if video was previously disliked, remove appropriate classes from dislike button
        if (clickedBtn.nextElementSibling.classList.contains('disliked')) {
          clickedBtn.nextElementSibling.classList.remove('disliked');
          clickedBtn.nextElementSibling.innerText = 'Dislike';
        }
        // If clicked button was dislike button
      } else if (clickedBtn.id === 'dislike') {
        // If button was already pressed, revert to unclicked status
        if (clickedBtn.classList.contains('disliked')) {
          clickedBtn.classList.remove('disliked');
          clickedBtn.innerText = 'Dislike';
        } else {
          // if button clicked is dislike, add disliked class to button and change text.
          clickedBtn.classList.add('disliked');
          clickedBtn.innerText = 'Disliked';
        }

        // Also, if video was previously liked, remove appropriate classes from like button
        if (clickedBtn.previousElementSibling.classList.contains('liked')) {
          clickedBtn.previousElementSibling.classList.remove('liked');
          clickedBtn.previousElementSibling.innerText = 'Like';
        }
      }
    }
  }
}
