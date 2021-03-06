let $todoInput; // miejsce, gdzie użytkownik wpisuje treść
let $alertInfo; // info o braku zadań / konieczności dodania tekstu
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; // nowo dodany LI, nowe zadanie
let $allTasks; // lista wszystkich dodanych LI
let $idNumber = 0; // ID dodawane do każdego nowego zadania
let $popup; //pobrany popup
let $popupInfo; // alert w popupie, jak się doda pusty tekst
let $editedTodo; // edytowany Todo
let $popupInput; //tekst wpisywany w inputa w popup'ie
let $addPopupBtn; // przycisk "zatwierdź" w popup'ie
let $closeTodoBtn //przycisk od zamykania popup'a

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todo-input');
    $alertInfo = document.querySelector('.alert-info');
    $addBtn = document.querySelector('.add-btn');
    $ulList = document.querySelector('.todo-list ul');
    $allTasks = document.getElementsByTagName('li');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popup-info');
    $popupInput = document.querySelector('.popup-input');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $todoInput.addEventListener('keyup', enterCheck)
    $ulList.addEventListener('click', checkClick)
    $addPopupBtn.addEventListener('click', changeTodo)
    $closeTodoBtn.addEventListener('click', closePopup)
}

const addNewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++
        $newTask = document.createElement('li')
        $newTask.setAttribute('id', `todo-${$idNumber}`)
        $newTask.innerHTML = `${$todoInput.value}
        <div class="tools">
            <button class="complete"><i class="fas fa-check"></i></button>
            <button class="edit">edit</button>
            <button class="delete"><i class="fas fa-times"></i></button>
        </div>`
        $ulList.appendChild($newTask)
        $todoInput.value = ''
        $alertInfo.innerText = ''
    } else {
        $alertInfo.innerText = 'Wpisz treść zadania.'
    }
}

const enterCheck = () => {
    if (event.code === 'Enter') {
        addNewTask()
    }
}

const checkClick = e => {
    if (e.target.classList.value !== '') {
        if (e.target.closest('button').classList.contains('complete')) {
            e.target.closest('li').classList.toggle('completed')
            e.target.closest('button').classList.toggle('completed')
        } else if (e.target.closest('button').classList.contains('edit')) {
            editTask(e)
        } else if (e.target.closest('button').classList.contains('delete')) {
            deleteTask(e)
        }
    }
}

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id
    $editedTodo = document.getElementById(`${oldTodo}`)
    $popup.style.display = 'flex'
    $popupInput.value = $editedTodo.firstChild.textContent
}

const changeTodo = () => {
    if ($popupInput.value !== '') {
        $popupInfo.textContent = ''
        $popup.style.display = 'none'
        $editedTodo.firstChild.textContent = $popupInput.value

    } else {
        $popupInfo.innerText = 'Musisz wpisać treść.'
    }
}

const closePopup = () => {
    $popup.style.display = 'none'
    $popupInfo.innerText = ''
}

const deleteTask = e => {
    const deleteTodo = e.target.closest('li')
    deleteTodo.remove();
    if ($allTasks.length === 0) {
        $alertInfo.innerText = 'Brak zadań na liście.';
    }
}

document.addEventListener('DOMContentLoaded', main);