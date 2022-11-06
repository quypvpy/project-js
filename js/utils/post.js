// trang nhaps.. lucs ddau laf main.js sau doi thanh home.js
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { setTextContent, truncateText } from './common'

export function createPostElement(post, idx) {
  if (!post) return
  // find and clone template
  const postTemplate = document.getElementById('postItemTemplate')
  if (!postTemplate) return
  const liElement = postTemplate.content.firstElementChild.cloneNode(true)
  // lấy ra thẻ li.
  if (!liElement) return

  // update
  setTextContent(liElement, '[data-id="title"]', post.title)
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100))
  setTextContent(liElement, '[data-id="author"]', post.author)

  // caculate timespan
  // cần có import mới chạy dc

  dayjs.extend(relativeTime)
  setTextContent(liElement, '[data-id="timeSpan"]', `- ${dayjs(post.updateAt).fromNow()}`)
  // console.log('timespan', dayjs(post.updateAt).fromNow())

  // custom ảnh mình muốn đổi... nếu page =1 thì mình mới đổi
  // page là chuỗi ..nên == thì tự ép kiểu về so sánh..nên k cần huyển về int
  const customerImg = [
    './assets/des-3.jpg',
    './assets/des-4.jpg',
    './assets/des-5.jpg',
    './assets/des-6.jpg',
    './assets/des-7.jpg',
    './assets/des-8.jpg',
  ]
  // const customerImg = [
  //   './images/des-3.jpg',
  //   './images/des-4.jpg',
  //   './images/des-5.jpg',
  //   './images/des-6.jpg',
  //   './images/des-7.jpg',
  //   './images/des-8.jpg',
  // ]
  const url = new URL(window.location)

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]')
  if (thumbnailElement) {
    if (url.searchParams.get('_page') == 1) {
      localStorage.setItem(`${post.id}`, idx)
      thumbnailElement.src = customerImg[idx]
    } else {
      thumbnailElement.src = post.imageUrl
    }

    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=Visit+Blogging.com+Now'
    })
    console.log(thumbnailElement.src)
    console.log(customerImg[idx])
    console.log(thumbnailElement.src)
  }

  // attach event
  // go to post detail whwn click on div.post-item
  const divElement = liElement.firstElementChild
  if (divElement) {
    divElement.addEventListener('click', () => {
      const menu = liElement.querySelector('[data-id="menu"]')
      if (menu && menu.contains(event.target)) return

      // event.taget là item mà mình click lên
      // kiểm tra menu có chứa cái mình vừa click không( nếu mình click bất cứ chỗ nào bên trong menu này(2 cai nút edit và j đó) )
      // thì bỏ va

      window.location.assign(`/post-detail.html?id=${post.id}`)
    })
  }

  // add click event for edit button
  const editButton = liElement.querySelector('[data-id="edit"]')
  if (editButton) {
    editButton.addEventListener('click', (e) => {
      //C1 dừng bubbling lên cha
      // e.stopPropagation()
      window.location.assign(`/add-edit-post.html?id=${post.id}`)
    })
  }

  // add click event for remove button
  const removeButton = liElement.querySelector('[data-id="remove"]')
  if (removeButton) {
    removeButton.addEventListener('click', (e) => {
      //C1 dừng bubbling lên cha
      // e.stopPropagation()

      const customEvent = new CustomEvent('post-delete', {
        bubbles: true,
        detail: post,
      })

      removeButton.dispatchEvent(customEvent)
    })
  }
  return liElement
}

export function renderPostList(elementId, postList) {
  if (!Array.isArray(postList)) return
  const ulElement = document.getElementById(elementId)
  if (!ulElement) return

  // trước khi render pagination thì ta phải xóa dữ liệu cũ. .để chuyển trang khác dữ liệu lại kacs
  ulElement.textContent = ''

  // mình tự thêm index để thay đổi ảnh ..chứ k cần truyền index
  postList.forEach((post, idx) => {
    const liElement = createPostElement(post, idx)
    ulElement.appendChild(liElement)
  })
}
