import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import postApi from '../api/postApi'
import { setTextContent } from './common'
import { registerLightbox } from './lightbox'

function renderPostDetail(post) {
  if (!post) return
  // render title
  // render descrition
  // render author
  // render updateAt

  setTextContent(document, '#postDetailTitle', post.title)
  setTextContent(document, '#postDetailDescription', post.description)
  setTextContent(document, '#postDetailAuthor', post.author)
  setTextContent(
    document,
    '#postDetailTimeSpan',
    dayjs(post.updatedAt).format('- DD/MM/YYYY HH:mm')
  )

  // render hero Image (imageUrl)
  const heroImage = document.getElementById('postHeroImage')
  if (heroImage) {
    // heroImage.style.backgroundImage = `url(${post.imageUrl})`

    // mình tự custom image
    const customerImg = [
      '../images/des-3.jpg',
      '../images/des-4.jpg',
      '../images/des-5.jpg',
      '../images/des-6.jpg',
      '../images/des-7.jpg',
      '../images/des-8.jpg',
    ]

    const idx = parseInt(localStorage.getItem(post.id))
    if (localStorage.getItem(post.id)) {
      heroImage.style.background = `linear-gradient(to bottom,  rgb(247 249 250 / 0%), rgb(255 255 255 / 74%)),
        url('${customerImg[idx]}') no-repeat center/cover`
    } else {
      heroImage.style.background = `linear-gradient(to bottom,  rgb(247 249 250 / 0%), rgb(255 255 255 / 74%)),
      url('${post.imageUrl}') no-repeat center/cover`
    }

    // heroImage.style.background = `linear-gradient(to bottom,  rgb(247 249 250 / 0%), rgb(255 255 255 / 74%)),
    // url('${post.imageUrl}') no-repeat center/cover`

    heroImage.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=Visit+Blogging.com+Now'
    })
  }
  // render edit page link
  const editPageLink = document.getElementById('goToEditPageLink')
  if (editPageLink) {
    editPageLink.href = `/add-edit-post.html?id=${post.id}`
    editPageLink.innerHTML = '<i class="fas fa-edit"></i>Edit Post'
  }
}

;(async () => {
  // get post id from URL
  // fetch post detail API
  // render post detail
  registerLightbox({
    modalId: 'lightbox',
    imgSelector: 'img[data-id="lightboxImg"]',
    prevSelector: 'button[data-id="lightboxPrev"]',
    nextSelector: 'button[data-id="lightboxNext"]',
  })

  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')
    if (!postId) {
      console.log('Post Not Found')
      return
    }
    const post = await postApi.getById(postId)
    renderPostDetail(post)
  } catch (error) {
    console.log('failed to fetch post detail', error)
  }
})()
