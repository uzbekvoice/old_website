
$('.slider').slick({
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  speed:500,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
  
  ]
});

$('.slider__works').slick({
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  speed:500,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
  ]
});


$('.partners__catalog').slick({
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  speed:500,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
  
  ]
});


$(document).ready(function(){
  function loadLeaderboard(listEl, url) {
    $.get(url).done(function(data){
      let block = listEl.find('.leader__wall-info');
      listEl.find('.ajax-loader').hide();
      data.forEach(function(item, i) {
        if (i >= 3) return;
        let newBlock = block.clone();
        listEl.append(newBlock);
        newBlock.find('.leaderboard-username').text(item.username);
        newBlock.find('.leaderboard-total').text(item.total);
        newBlock.show();
      });
    })
  }

  const leaderboardClips = $('.leaderboard-list-clips');
  const leaderboardClipsURL = 'http://104.248.26.69/leaderboard/clips';
  loadLeaderboard(leaderboardClips, leaderboardClipsURL);

  const leaderboardVotes = $('.leaderboard-list-votes');
  const leaderboardVotesURL = 'http://104.248.26.69/leaderboard/votes';
  loadLeaderboard(leaderboardVotes, leaderboardVotesURL);
});