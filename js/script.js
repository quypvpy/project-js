// toggle menu
function menuToggle(selector, menu) {
  const toggleMenu = document.querySelector(selector)
  const ElevMenu = document.querySelector(menu)
  const mycustom = document.querySelector('.header-icon')

  toggleMenu.classList.toggle('active')

  const listClass = toggleMenu.classList.value
  if (listClass.includes('active')) {
    toggleMenu.innerHTML = '<i class="icon fas fa-times"></i>'
    ElevMenu.classList.add('is-toggle')
    mycustom.classList.add('mycustom')
  } else {
    toggleMenu.innerHTML = '  <i class="icon fas fa-bars"></i>'
    ElevMenu.classList.remove('is-toggle')
    mycustom.classList.remove('mycustom')
  }

  // kkhi nhấn ngpoaif phần menu thì toggle chạy vô lại.
  //  nếu kích vào window thifg kiểm tra nếu k phải menu header và menu-icon và có là cái nút đóng mởk
  window.addEventListener('click', function (e) {
    if (!ElevMenu.contains(e.target) && !mycustom.contains(e.target) && !e.target.matches('.fas')) {
      toggleMenu.classList.remove('active')
      ElevMenu.classList.remove('is-toggle')
      mycustom.classList.remove('mycustom')
    }
  })
}

// xử lí counter number khi reload sẽ chạy
let flag = false
window.onload = function () {
  let number = document.querySelector('.number')
  let offsetnumber = number.offsetTop - 300

  if (document.documentElement.scrollTop > offsetnumber || document.body.scrollTop > offsetnumber) {
    flag = true
    let counters = document.querySelectorAll('.counter')
    counters.forEach((counter) => {
      counter.innerText = '0'

      let updateCounter = () => {
        let target = +counter.getAttribute('data-val')
        let c = +counter.innerText

        let increment = target / 400

        if (c < target) {
          let num = `${Math.ceil(c + increment)}`
          counter.innerText = `${Math.ceil(c + increment)}`
          setTimeout(updateCounter, 1)
        }
      }
      updateCounter()
    })
  }

  // xử lí slide header
  document.querySelector('.button').onclick = function () {
    let lists = document.querySelectorAll('.item')
    let nextElenmnt = lists[0]

    document.getElementById('slide').appendChild(lists[0])
    nextElenmnt.classList.add('main')
  }

  // xử lí slick slider
  $('.popular').slick({
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    fadeSpeed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-arrow-left-long'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><i class='fa-solid fa-arrow-right-long' aria-hidden='true'></i></button>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  })
}

// xử lí counter number và arrow-up khi scroll
window.onscroll = function () {
  let number = document.querySelector('.number')
  let offsetnumber = number.offsetTop - 300

  let arrow_up = document.querySelector('#arrow-up')
  if (document.documentElement.scrollTop > offsetnumber || document.body.scrollTop > offsetnumber) {
    arrow_up.classList.add('visible')
  } else {
    arrow_up.classList.remove('visible')
  }

  if (flag) return
  if (document.documentElement.scrollTop > offsetnumber || document.body.scrollTop > offsetnumber) {
    flag = true
    let counters = document.querySelectorAll('.counter')
    counters.forEach((counter) => {
      counter.innerText = '0'

      let updateCounter = () => {
        let target = +counter.getAttribute('data-val')
        let c = +counter.innerText

        let increment = target / 600

        if (c < target) {
          let num = `${Math.ceil(c + increment)}`
          counter.innerText = `${Math.ceil(c + increment)}`
          setTimeout(updateCounter, 1)
        }
      }
      updateCounter()
    })
  }
}
