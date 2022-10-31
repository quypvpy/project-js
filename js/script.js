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
