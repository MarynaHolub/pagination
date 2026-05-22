const root = document.querySelector("#root")
const pagination = document.querySelector("#pagination")

const LIMIT = 5 // мы сами решаем, сколько постов, хотим отображать
const TOTAL_POSTS = 50 // обычно это число получаем с сервера
const TOTAL_PAGES = Math.ceil(TOTAL_POSTS / LIMIT) // количество постов постоянно меняется. периодически делаем запрос ( при загрузке следующей 10ки постов) и проверяем количество всего постов

let currentPage = 1
let isLoading = false

async function loadPosts() {
  if (isLoading) return

  isLoading = true
  root.textContent = "Загрузка..."

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${LIMIT}`,
    )
    if (!response.ok) {
      throw new Error("Ошибка при запросе")
    }
    const data = await response.json()
    isLoading = false
    renderPosts(data)
    renderPagination()
  } catch (e) {
    isLoading = false
    root.textContent = e.message
    root.style.color = "red"
  }
}
loadPosts()

function renderPosts(posts) {
  root.innerHTML = ""
  posts.forEach((post) => {
    const container = document.createElement("div")
    container.classList.add("post")
    container.innerHTML = `
  <h3>${post.title}</h3>
  <p>${post.body}</p>
  `
    root.append(container)
  })
}
function renderPagination() {
  pagination.innerHTML = ""

  // кнопка назад
  const prevButton = document.createElement("button")
  prevButton.classList.add("btn")
  prevButton.textContent = "Назад"
  prevButton.disabled = currentPage === 1
  prevButton.addEventListener("click", () => {
    currentPage--
    loadPosts()
  })
  pagination.append(prevButton)

  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const pageBtn = document.createElement("button")
    pageBtn.classList.add("btn")
    pageBtn.textContent = i
    if (i === currentPage) {
      pageBtn.classList.add("active")
    }
    pageBtn.addEventListener("click", () => {
      pagination.innerHTML = ""
      currentPage = i
      loadPosts()
    })
    pagination.append(pageBtn)
  }

  // кнопка вперед
  const nextButton = document.createElement("button")
  nextButton.classList.add("btn")
  nextButton.textContent = "Вперед"
  nextButton.disabled = currentPage === TOTAL_PAGES
  nextButton.addEventListener("click", () => {
    currentPage++
    loadPosts()
  })
  pagination.append(nextButton)
}

//  сделать кнопку вперед
// залить на гитхаб и дать ссылку преподавателю

/* const root = document.querySelector('#root')
const pagination = document.querySelector('#pagination')

const LIMIT = 20
const TOTAL_POSTS = 100
const TOTAL_PAGES = Math.ceil(TOTAL_POSTS / LIMIT)

let currentPage = 3

let isLoading = false

async function loadPosts() {
  if (isLoading) return

  isLoading = true
  root.textContent = 'Загрузка...'

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${LIMIT}`
    )
    if (!response.ok) {
      throw new Error('Ошибка при запросе')
    }
    const data = await response.json()
    isLoading = false
    renderPosts(data)
    renderPagination()
  } catch (e) {
    isLoading = false
    root.textContent = e.message
    root.style.color = 'red'
  }
}
loadPosts()

function renderPosts(posts) {
  root.innerHTML = ''
  posts.forEach((post) => {
    const container = document.createElement('div')
    container.classList.add('post')
container.innerHTML = `
  <h3>${post.title}</h3>
  <p>${post.body}</p>
  `
    root.append(container)
  })
}
function renderPagination() {
  pagination.innerHTML = ''

  const prevButton = document.createElement('button')
  prevButton.textContent = 'Назад'
  prevButton.disabled = currentPage === 1
  prevButton.addEventListener('click', () => {
    currentPage--
    loadPosts()
  })
  pagination.append(prevButton)
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const pageBtn = document.createElement('button')
    pageBtn.textContent = i
    if (i === currentPage) {
      pageBtn.classList.add('active')
    }
    pageBtn.addEventListener('click', () => {
      pagination.innerHTML = ''
      currentPage = i
      loadPosts()
    })
    pagination.append(pageBtn)
  }
}

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./style.css" />
    <title>Pagination</title>
  </head>
  <body>
    <div id="root" class="root"></div>
    <div id="pagination" class="pagination"></div>
    <script src="./index.js"></script>
  </body>
</html>
.active {
  background: teal;
}
  */
