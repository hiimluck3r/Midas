<h1 align="center" id="title">Midas - Panel</h1>

<p align="center"><img src="../pictures/midas_logo.png" width ="200" height ="200" alt="project-image"></p>

<p align="center" id="description"><strong>Управляйте ценами лёгким касанием руки.</strong></p>

<h2>🎯 Описание:</h2>

Данный package позволит запустить панель аналитика для удобного взаимодействия с API ценообразования и отдачи.

<h2>📋 Frotend:</h2>

**Зависимости:**
Установка зависимостей осуществляется командой "npm i", читая список из файла package.json.

**POST запрос:**
Функция handleSaveEdit отправляет POST запрос на сервер для сохранения изменений данных.

**GET запросы:**
Используется useEffect для получения данных о матрицах из API.
Данные фильтруются, оставляя только матрицы, имя которых начинается с 'baselineMatrix_'.
Второй GET запрос выполняется при изменении selectedUUID или currentPage для получения данных о выбранной матрице.


**Функции:**
useState используется для хранения состояний компонента, таких как список имен, результаты поиска, выбранный UUID и др.
useEffect используется для выполнения побочных эффектов, загрузки данных и обновления по выбранной матрице.
handleSearch фильтрует список имен по введенному термину.
handleAddName вызывается при добавлении имени из результатов поиска.
handleNextPage и handlePreviousPage изменяют номер текущей страницы.
handleEdit вызывается при редактировании данных по выбранной матрице.
handleCloseEditDialog закрывает диалог редактирования.
handleSaveEdit сохраняет отредактированные данные на сервере.
handlePriceChange, handleLocationIdChange и handleMicrocategoryIdChange обновляют данные для редактирования в диалоге.

**UI**
![image](https://github.com/hiimluck3r/Midas/assets/102501329/d2a9f217-c857-4c41-b768-f6d7142b6c82)
![image](https://github.com/hiimluck3r/Midas/assets/102501329/e65f6cb7-a3c9-4b4e-aa0f-d0e1b0853725)
![image](https://github.com/hiimluck3r/Midas/assets/102501329/317bd635-ac69-43ce-8741-b5dbdc600db6)




<h2>💻 Создано при помощи:</h2>

Использованные технологии:

*   ghcr.io
*   GitHub Actions
*   Docker
*   React
*   NodeJS
*   Vite

<h2>🛡️ Лицензия:</h2>

Проект распространяется по лицензии MIT

<h2>🐛 Баги и вопросы:</h2>

Создайте Issue с необходимым тегом:
* Feature request
* Bug report
* Question

<h2>💖Понравился проект?</h2>

Тогда поставьте нам звезду :)

---
<p align="center"><img src="../pictures/panel.jpg" width ="1000" height ="100" alt="project-image"></p>
