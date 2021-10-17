
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

  function drawChart(chartBlockEl, url) {
    const labels = [];
    const valuesTotal = [];
    const valuesValid = [];
    const chartEl = chartBlockEl.find('canvas');

    $.get(url).done(function(data){
      chartBlockEl.find('.ajax-loader').hide();
      data.forEach(function(item, i) {
        labels.push(moment(item.date).format('ll'));
        valuesTotal.push(Math.round(item.total / 60));
        valuesValid.push(Math.round(item.valid / 60));
      });

      chartEl.show();

      var myChart = new Chart(chartEl[0].getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tekshirilgan minutlar',
                data: valuesValid,
                borderWidth: 2,
                borderColor: '#33BFFA',
                backgroundColor: '#E9EDF5',
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }, {
                label: 'Yozilgan minutlar',
                data: valuesTotal,
                borderWidth: 3,
                borderColor: '#FEB3B4',
                backgroundColor: '#FDE9EA',
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Minutlar'
                },
                suggestedMin: 0,
                suggestedMax: 10 * 60
              }
            }
        }
      });

    });
  }

  const leaderboardClips = $('.leaderboard-list-clips');
  const leaderboardClipsURL = 'http://104.248.26.69/leaderboard/clips';
  loadLeaderboard(leaderboardClips, leaderboardClipsURL);

  const leaderboardVotes = $('.leaderboard-list-votes');
  const leaderboardVotesURL = 'http://104.248.26.69/leaderboard/votes';
  loadLeaderboard(leaderboardVotes, leaderboardVotesURL);

  const statsChart = $('.stats-datechart');
  const statsURL = 'http://104.248.26.69:8010/stats/clips';
  drawChart(statsChart, statsURL);

});