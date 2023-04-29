import postApi from '../api/postApi'
import { initPagination, renderPagination } from './pagination'
import { renderPostList } from './post'
import { initSeach } from './seach'
import { toast } from './toast'

async function handleFilterChange(filterName, filterValue) {
  try {
    // update query params
    const url = new URL(window.location)
    if (filterName) url.searchParams.set(filterName, filterValue)
    // đêtr khi ngta truyền thì mới set.. k thì thôi.

    // nếu muốn lọc input thì ta phải reset page về 1 để nó hiện ra

    if (filterName === 'title_like') url.searchParams.set('_page', 1)

    history.pushState({}, '', url)

    // fetch API
    // re-render post ;ist
    const { data, pagination } = await postApi.getAll(url.searchParams)
    // vaf khi render lại.. thì ta phải xóa dữ liệu cũ.. k thì nó lấy nữa là chồng thêm vô.
    renderPostList('box-container', data)
    renderPagination('pagination', pagination)
  } catch (error) {
    console.log('fail to fetch post list', error)
  }
}

function registerPostDeleteEvent() {
  document.addEventListener('post-delete', async (e) => {
    // console.log('delte', e.detail)
    try {
      const post = e.detail
      const measege = `Bạn có muốn chắc chắn xóa ${post.title} !!`
      if (window.confirm(measege)) {
        // if ok
        await postApi.remove(post.id)
        await handleFilterChange()
        toast.success(`Xóa thành Công !!!`)
      }
    } catch (error) {
      console.log('fail to remove post', error)
      toast.error(`Error:${error.message}`)
    }
  })
}

;(async () => {
  try {
    const url = new URL(window.location)

    // update search params if needed
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)

    history.pushState({}, '', url)
    // const queryParams = new URLSearchParams(window.location.search)
    // const queryParams = url.searchParams.toString()
    const queryParams = url.searchParams

    registerPostDeleteEvent()
    console.log(queryParams)

    initPagination({
      elementId: 'pagination',
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange('_page', page),
    })
    // console.log(queryParams.toString())

    initSeach({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value),
    })

    // const { data, pagination } = await postApi.getAll(queryParams)
    // renderPostList(data)
    // renderPagination('pagination', pagination)
    handleFilterChange()
    //k truyeenf j la refresh laij duwx lieuj
  } catch (error) {
    console.log('get all failed', error)
  }
})()
