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
const secondShow = document.querySelector('.second-show-all');
const modal = document.querySelector('.modal');
const secondModal = document.querySelector('.second-modal')
const close = document.querySelectorAll('.modal__close');
const overlay = document.querySelector('.modal__overlay');
const body = document.querySelector('body')




show.forEach(item => {
  item.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
  })
});

secondShow.addEventListener('click', () => {
  secondModal.style.display = 'block';
  overlay.style.display = 'block';
})

close.forEach(block => {
  block.addEventListener('click', () => {
    modal.style.display = 'none'
    secondModal.style.display = 'none'
    overlay.style.display = 'none'
  })
})





overlay.addEventListener('click', () => {
  modal.style.display = 'none'
  secondModal.style.display = 'none'
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

  let latestTotalVoices = 0;
  let latestValidVoices = 0;

  function drawChart(chartBlockEl, url) {
    const labels = [];
    const valuesTotal = [];
    const valuesValid = [];
    const chartEl = chartBlockEl.find('canvas');

    const annotateLabels = [
      [10000, "Juda yuqori sifatli, katta lug'at, uzluksiz nutqni aniqlash modeli"],
      [2000, "Odamga yaqin ASR umumiy aniqligi (tilga bog'liq)"],
      [500, "Cheklangan so'z boyligi doimiy nutqni aniqlash"],
      [100, "Buyruqlarga asoslangan modellar"],
    ];
    var annotations = [];
    annotateLabels.forEach(function(item) {
      annotations.push({
        type: 'line',
        scaleID: 'y',
        borderWidth: 1,
        borderColor: '#92959E',
        borderDash: [3, 3],
        value: item[0],
        label: {
          content: item[1],
          backgroundColor: 'rgb(255,255,255)',
          color: '#92959E',
          font: {'style': 'normal'},
          enabled: true
        },
      });
    });

    $.get(url).done(function (data) {
      chartBlockEl.find('.ajax-loader').hide();
      data.forEach(function (item, i) {
        labels.push(moment(item.date).format('ll'));
        latestTotalVoices = parseFloat(item.total / 60 / 60).toFixed(1);
        latestValidVoices = parseFloat(item.valid / 60 / 60).toFixed(1);
        valuesTotal.push(latestTotalVoices);
        valuesValid.push(latestValidVoices);
      });

      chartEl.show();

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
              type: 'logarithmic',
              suggestedMin: 0,
              suggestedMax: 11000
            }
          },
          plugins: {
            annotation: {
              annotations: annotations
            }
          }
        }
      });

    });
  }

  function drawStatChart(chartBlockEl, url) {
    //const values = [];
    const chartEl = chartBlockEl.find('canvas');

    $.get(url).done(function (data) {
      chartBlockEl.find('.ajax-loader').hide();
      //values.push(data.all.uz.added);
      //values.push(data.all.uz.validated);

      let img = chartBlockEl.find('.svgTxtStat').contents();

      img.find('#ActualStatMatnNumber').text(data.all.uz.validated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
      img.find('#ActualStatHourNumber').text(
        parseFloat(data.all.uz.validated / 900).toFixed(0) + ' soat ovoz');
      img.find('#ActualStatRect').attr('height', data.all.uz.validated/10000);
      img.find('#ActualStatRect').attr('y', 332 - (data.all.uz.validated/10000));
      img.find('#ActualStatMatnNumber').attr('y', 285 - (data.all.uz.validated/10000));
      img.find('#ActualStatMatnNumberSpan').attr('y', 300 - (data.all.uz.validated/10000));
      img.find('#ActualStatHourNumber').attr('y', 319 - (data.all.uz.validated/10000));
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

  const leaderboardVotesAll = $('.leaderboard-list-votes-all');
  const leaderboardVotesURLAll = 'https://api.ry.team/leaderboard/votes/all';
  loadLeaderboard(leaderboardVotesAll, leaderboardVotesURLAll);

  const statsChart = $('.stats-datechart');
  const statsURL = 'https://api.ry.team/stats/clips';
  drawChart(statsChart, statsURL);

  const statsChartTxt = $('.stats-datechart-txt');
  const statsURLTxt = 'https://api.ry.team/stats/texts';
  drawStatChart(statsChartTxt, statsURLTxt);

});


