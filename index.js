const root = document.querySelector("#root")
const pagination = document.querySelector("#pagination")

const LIMIT = 10 // мы сами решаем, сколько постов, хотим отображать
const TOTAL_POSTS = 100 // обычно это число получаем с сервера
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
    pagination.innerHTML = ""
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
    pagination.innerHTML = ""
    currentPage++
    loadPosts()
  })
  pagination.append(nextButton)
}

// модальное диалоговое окно
const modal = document.getElementById("modal")
const closeButton = document.getElementById("closeButton")
const openButton = document.getElementById("openButton")
const inputBtn = document.getElementById("inputBtn")
const inputName = document.getElementById("inputName")
const greeting = document.getElementById("greeting")

inputBtn.addEventListener("click", () => {
  let inputValue = inputName.value
  greeting.textContent = `Hello, ${inputValue}!`
})

// openButton.addEventListener("click", () => {   // при нажатии кнопки

// window.onload = () => {}     // 1 вариант при загрузке окна
window.addEventListener("load", () => {
  // 2 вариант при загрузке окна
  modal.showModal()
  document.body.style.overflow = "hidden"
})

closeButton.addEventListener("click", () => {
  modal.close()
  document.body.style.overflow = "auto"
})

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.close()
    document.body.style.overflow = "auto"
  }
})

// сделать кнопку вперед
// залить на гитхаб и дать ссылку преподавателю

// Добавить стили к модальному окну
// Добавить модальное окно в проект с пагинацией
// Модальное окно должно открываться при загрузке страницы
// onload при загрузке - страницы сразу открывается диалоговое окно
