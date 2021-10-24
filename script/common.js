/* Burger Start */

let btn = document.querySelector('.header__burger')
let list = document.querySelector('.menu__list')
let closeList = document.querySelector('.header__close')


btn.addEventListener('click', () => {
  list.style.transform = 'translate(0)'
})

closeList.addEventListener('click', () => {
  list.style.transform = 'translate(-100%)'
})

/* Burger End */

/* Modal start */

const show = document.querySelectorAll('.show-all');
const modal = document.querySelector('.modal');
const close = document.querySelector('.modal__close');
const overlay = document.querySelector('.modal__overlay');
const body = document.querySelector('body')

show.forEach(item => {
  item.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    body.style.overflow = 'hidden'
  })
});



close.addEventListener('click', () => {
  modal.style.display = 'none'
  overlay.style.display = 'none'
  body.style.overflow = 'scroll'

})

overlay.addEventListener('click', () => {
  modal.style.display = 'none'
  overlay.style.display = 'none'
})

/* Modal end */

$('.slider').slick({
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  pauseonhover:true,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
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
    {
      breakpoint: 480,
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
  autoplaySpeed: 1000,
  pauseonhover:true,
  speed: 500,
  
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
  autoplaySpeed: 1000,
  pauseonhover:true,
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


$(document).ready(function () {
  function loadLeaderboard(listEl, url) {
    $.get(url).done(function (data) {
      let block = listEl.find('.leader__wall-info');
      listEl.find('.ajax-loader').hide();
      data.forEach(function (item, i) {
        let newBlock = block.clone();
        listEl.append(newBlock);
        newBlock.find('.leaderboard-number').text(i+1 + '.');
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

    $.get(url).done(function (data) {
      chartBlockEl.find('.ajax-loader').hide();
      data.forEach(function (item, i) {
        labels.push(moment(item.date).format('ll'));
        valuesTotal.push(parseFloat(item.total / 60 / 60).toFixed(1));
        valuesValid.push(parseFloat(item.valid / 60 / 60).toFixed(1));
      });

      chartEl.show();

      const annotation1 = {
        type: 'line',
        scaleID: 'x',
        borderWidth: 3,
        borderColor: 'black',
        value: 5,
        label: {
          content: 'Line annotation at x=0.5',
          enabled: true
        },
      };

      var myChart = new Chart(chartEl[0].getContext('2d'), {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Tekshirilgan soatlar',
            data: valuesValid,
            borderWidth: 2,
            borderColor: '#33BFFA',
            backgroundColor: '#E9EDF5',
            fill: true,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          }, {
            label: 'Yozilgan soatlar',
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
                text: 'Soatlar'
              },
              suggestedMin: 0,
              suggestedMax: 10
            }
          },
          plugins: {
            annotation: {
              annotations: {
                annotation1
              }
            }
          },
        }
      });

    });
  }

  const leaderboardClips = $('.leaderboard-list-clips');
  const leaderboardClipsURL = 'https://api.ry.team/leaderboard/clips';
  loadLeaderboard(leaderboardClips, leaderboardClipsURL);

  const leaderboardVotes = $('.leaderboard-list-votes');
  const leaderboardVotesURL = 'https://api.ry.team/leaderboard/votes';
  loadLeaderboard(leaderboardVotes, leaderboardVotesURL);

  const leaderboardClipsAll = $('.leaderboard-list-clips-all');
  const leaderboardClipsURLAll = 'https://api.ry.team/leaderboard/clips/all';
  loadLeaderboard(leaderboardClipsAll, leaderboardClipsURLAll);

  const statsChart = $('.stats-datechart');
  const statsURL = 'https://api.ry.team/stats/clips';
  drawChart(statsChart, statsURL);

});


