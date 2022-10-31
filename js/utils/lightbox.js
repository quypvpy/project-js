function showModal(modalElement) {
  const modal = new bootstrap.Modal(modalElement)
  if (modal) modal.show()
}

export function registerLightbox({ modalId, imgSelector, prevSelector, nextSelector }) {
  // handle click for all images -> Event Delagation
  // img click -find all imgs with the same album /gallery
  // show modal with selected img
  // hadle pre/next click

  const modalElement = document.getElementById(modalId)
  if (!modalElement) return

  // check if modal is registered or not
  if (modalElement.dataset.registered) return

  // selector
  const imageElement = modalElement.querySelector(imgSelector)
  const prevButton = modalElement.querySelector(prevSelector)
  const nextButton = modalElement.querySelector(nextSelector)
  if (!imageElement || !prevButton || !nextButton) return

  let imgList = []
  let currentIndex = 0

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src
  }

  document.addEventListener('click', (event) => {
    // khi làm như vậy.. thì nó sẽ puble thì thằng cha mãi và cha ở đây là document.. vì thế click ở đâu nó cũng show.
    // target laf minhf kichs vô cái nào.. thì nó in ra cái đó.. vì dụ nguyên thẻ p ..nguyên thẻ img
    // target.dataset.album cái nào thuộc về 1 album nào đó..trong nhiều album. miễn có dât-album
    const { target } = event
    if (target.tagName !== 'IMG' || !target.dataset.album) return

    // sau đó lấy tất cả ảnh thộc album đó.. tỉnh tổng của nó.. để  pk nó thuộc index nào để next prev
    imgList = document.querySelectorAll(`img[data-album=${target.dataset.album}]`)
    // khi chúng ta click vô 1 hình.. nó sẽ tìm tất cả hình có data-album bằng với data-album hình mình chọn.
    // imgList laf mootj nodelist nên k có hàm findIdeex vì thế phải chueyenr
    currentIndex = [...imgList].findIndex((x) => x === target)
    // console.log('album image llick', { target, currentIndex, imgList })

    // show image ai index
    showImageAtIndex(currentIndex)
    // show modal
    showModal(modalElement)
  })

  prevButton.addEventListener('click', () => {
    // show prev image of current album
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length
    showImageAtIndex(currentIndex)
  })
  nextButton.addEventListener('click', () => {
    // show next image of current album
    // cpos 3 anhr.. %3
    currentIndex = (currentIndex + 1) % imgList.length
    showImageAtIndex(currentIndex)
  })

  // laần đầu tiên gọi hàm register thì tới dùng này,, nó gắn dattaset vào bằng true..
  // ở dưới ,,nếu chúng ta lỡ gọi hàm này  2 , 3 lần chung 1 trang code
  // thì ở trên có hàm kiểm tra.. nếu có datasetr = true. thì nóe sẽ return, mà nó chỉ gọi 1 lần duy nhất.
  // tránh lặp lại.
  // mark this modal is already registed
  modalElement.dataset.registered = 'true'
}
