// let {
//     createColorSelect,
//     editListName,
//     deleteList,
//     deleteFinishedItems
// }  = import('./helpers/toolHelpers.js')

let newListInput = document.getElementById('todoInput')
let theBigButton = document.getElementById('inputButton')
let theList = document.getElementById('todoList')
let searchInput = document.getElementById('taskSearch')
let resultsDiv = document.getElementById('searchResults')
let orderOptions = document.querySelector('select')
let deathButton = document.querySelector('#deathButton')

const ORDER_BY_TIME = 'ORDER_BY_TIME'
const ORDER_BY_NAME = 'ORDER_BY_NAME'
const BLUE = 'BLUE'
const PURPLE = 'PURPLE'
const PINK = 'PINK'
const ORANGE = 'ORANGE'
const GREEN = 'GREEN'
const COLOR_OPTIONS = [
    {
        value: BLUE,
        text: 'Blue'
    },
    {
        value: PURPLE,
        text: 'Purple'
    },
    {
        value: PINK,
        text: 'Pink'
    },
    {
        value: ORANGE,
        text: 'Orange'
    },
    {
        value: GREEN,
        text: 'Green'
    }
]

function listObj (str) {
    this.title = str,
    this.items = []
    this.isEditing = false
    this.timeStamp = new Date,
    this.bgColor = null
}

function setInitialListDataToLocalStorage () {
    window.localStorage.setItem('lists', JSON.stringify([]))
}

function getLists () {
    return JSON.parse(localStorage.getItem('lists'))
}

function checkForListData () {
    return localStorage.getItem('lists')
}

function updateLocalStorage (str, arr) {
    localStorage.setItem(str, JSON.stringify(arr))
}

function clearOldLists() {
    theList.innerHTML = ''
}


function createListName (str, ind, parentEle) {
    let {isEditing, title} = getLists()[ind]
    let listName = document.createElement(`${isEditing ? 'input' : 'h1'}`)
    let listNameID = `listHeader${ind}`
    listName.setAttribute('id', `${listNameID}`)
    listName.setAttribute('class', '')
    listName.innerText = `${str}`

    if (isEditing) {
        listName.setAttribute('value', `${title}`)
        listName.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                let value = e.target.value
                let lists = getLists()
                lists[ind].title = value
                lists[ind].isEditing = false
                updateLocalStorage('lists', lists)
                showLists()
            }
        })
    }

    parentEle.appendChild(listName)
}

function createColorSelect (ind, parentEle) {
    let tool = document.createElement('select')
    tool.setAttribute('class', 'colorSelect')
    
    let blankOpt = document.createElement('option')
    blankOpt.setAttribute('value', 'NOBGCOLOR')
    blankOpt.innerText = 'None'
    tool.appendChild(blankOpt)
    
    COLOR_OPTIONS.forEach((colorOpt) => {
        let {value, text} = colorOpt
        let option = document.createElement('option')
        option.setAttribute('value', `${value}`)
        option.innerText = text
        tool.appendChild(option)
    })
    
    tool.addEventListener('change', (e) => {
        let lists = getLists()
        let newColor = e.target.value
        lists[ind].bgColor = newColor
        updateLocalStorage('lists', lists)
        showLists()
        
    })

    parentEle.appendChild(tool)
}

function editListName (ind, parentEle) {
    let tool = document.createElement('i')
    tool.setAttribute('class', 'fa-solid fa-pen-to-square fa-md utilButton mx-3')
    tool.addEventListener('click', () => {
        let lists = getLists()
        lists[ind].isEditing = true
        updateLocalStorage('lists', lists)
        showLists()
    })
    parentEle.appendChild(tool)
}

function deleteList (ind, parentEle) {
    let tool = document.createElement('i')
    tool.setAttribute('class', 'fa-solid fa-trash fa-md utilButton mx-3')
    tool.addEventListener('click', () => {
        console.log(`you want to delete list ${ind}`)
        // handleEdit()
    })
    parentEle.appendChild(tool)
    // console.log('deleting list')
}

function deleteFinishedItems (ind, parentEle) {
    let tool = document.createElement('i')
    tool.setAttribute('class', 'fa-solid fa-circle-xmark fa-md utilButton mx-3')
    tool.addEventListener('click', () => {
        console.log(`you want to delete finished items from list ${ind}`)
        // handleEdit()
    })
    parentEle.appendChild(tool)
    // console.log('deleting finished items')
}

function createTools(ind, parentEle, callType) {
    let tools = document.createElement('div')
    tools.setAttribute('class', 'tools')

    switch (callType) {
        case 'forList':
            createColorSelect(ind, tools)
            editListName(ind, tools)
            deleteList(ind, tools)
            deleteFinishedItems(ind, tools)
            break;
        case 'forItem':
            break;
        default:
            break;
    }

    parentEle.appendChild(tools)
}

function createListHeader (str, ind, parentEle) {
    let listHeader = document.createElement('div')
    listHeader.setAttribute('class', 'listHeader')

    createListName(str, ind, listHeader)
    createTools(ind, listHeader, 'forList')

    parentEle.appendChild(listHeader)
}

function createListItems (arr) {

}

function createList (listObj, ind, listArr) {
    let {title, items, bgColor} = listObj
    let listCard = document.createElement('div')
    let listCardID = `list${ind}_${title}`
    listCard.setAttribute('id', `${listCardID}`)
    listCard.setAttribute('class', `listCard ${bgColor ? bgColor : ''}`)

    createListHeader(title, ind, listCard)

    items.length > 0 ?? createListItems(items)

    theList.appendChild(listCard)
}

function showLists () {
    clearOldLists()
    let lists = Array.from(getLists())
    lists.forEach((list, ind, listArr) => {
        createList(list, ind, listArr)
    })
}

function addNewListToLists (str) {
    checkForListData() ?? setInitialListDataToLocalStorage()
    let lists = Array.from(getLists())
    let newList = new listObj(str)
    lists.push(newList)
    updateLocalStorage('lists', lists)
    showLists()
}

newListInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        let value = e.target.value
        newListInput.value = ''
        addNewListToLists(value)
    }
})



// JSON.parse(localStorage.getItem('listData')).length > 0 ? showLists() : showEmpty()
showLists()
