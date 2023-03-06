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
const NONE = 'NONE'
const COLOR_OPTIONS = [
    {
        value: NONE,
        text: 'None'
    },
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

function listItemObj (str, listIndex) {
    this.title = str,
    this.isEditing = false,
    this.listIndex = listIndex,
    this.isFinished = false
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
    let lists = getLists()
    let colorTool = document.createElement('select')
    colorTool.setAttribute('class', 'colorSelect')
 
    
    
    COLOR_OPTIONS.forEach((colorOpt) => {
        let {value, text} = colorOpt
        let option = document.createElement('option')
        option.setAttribute('value', `${value}`)
        option.innerText = text

        if (value == lists[ind].bgColor){
            option.selected = true
        }

        colorTool.appendChild(option)
    })
    
    colorTool.addEventListener('change', (e) => {
        let newColor = e.target.value
        lists[ind].bgColor = newColor
        updateLocalStorage('lists', lists)
        showLists()
        
    })

    parentEle.appendChild(colorTool)
}

function editListName (ind, parentEle) {
    let editTool = document.createElement('i')
    editTool.setAttribute('class', 'fa-solid fa-pen-to-square fa-md utilButton mx-2')
    editTool.addEventListener('click', () => {
        let lists = getLists()
        lists[ind].isEditing = true
        updateLocalStorage('lists', lists)
        showLists()
    })
    parentEle.appendChild(editTool)
}

function deleteList (ind, parentEle) {
    let deleteTool = document.createElement('i')
    deleteTool.setAttribute('class', 'fa-solid fa-trash fa-md utilButton mx-2')
    deleteTool.addEventListener('click', () => {
       let lists = getLists()
       lists.splice(ind, 1)
       updateLocalStorage('lists', lists)
       showLists()
    })
    parentEle.appendChild(deleteTool)
}

function deleteFinishedItems (ind, parentEle) {
    let deleteFinishedTool = document.createElement('i')
    deleteFinishedTool.setAttribute('class', 'fa-solid fa-circle-check fa-md utilButton mx-2')
    deleteFinishedTool.addEventListener('click', () => {
        let lists = getLists()
        lists[ind].items.forEach((listItem, i) => {
            if (listItem.isFinished) {
                let filtered = lists[ind].items.filter(item => !item.isFinished)
                lists[ind].items = filtered
                updateLocalStorage('lists', lists)
                showLists()
            }
        })
    })
    parentEle.appendChild(deleteFinishedTool)
}

function clearAllItemsFromList(ind, parentEle) {
    let clearItemsTool = document.createElement('i')
    clearItemsTool.setAttribute('class', 'fa-solid fa-circle-xmark fa-md utilButton mx-2')
    clearItemsTool.addEventListener('click', () => {
        let lists = getLists()
        lists[ind].items = []
        updateLocalStorage('lists', lists)
        showLists()
    })

    parentEle.appendChild(clearItemsTool)
}

function editItemName(indObj, parentEle){
    let {listInd, itemInd} = indObj
    let editItemTool = document.createElement('i')
    editItemTool.setAttribute('class', 'fa-solid fa-pen-to-square fa-md utilButton mx-2')
    editItemTool.addEventListener('click', () => {
        let lists = getLists()
        lists[listInd].items[itemInd].isEditing = true
        updateLocalStorage('lists', lists)
        showLists()
    })

    parentEle.appendChild(editItemTool)
}

function deleteSingleItem(indObj, parentEle){
    let {listInd, itemInd} = indObj
    let deleteSingleTool = document.createElement('i')
    deleteSingleTool.setAttribute('class', 'fa-solid fa-trash fa-md utilButton mx-2')
    deleteSingleTool.addEventListener('click', () => {
        let lists = getLists()
        lists[listInd].items.splice(itemInd, 1)
        updateLocalStorage('lists', lists)
        showLists()
    })

    parentEle.appendChild(deleteSingleTool)
}

function finishSingleItem(indObj, parentEle){
    let {listInd, itemInd} = indObj
    let finishTool = document.createElement('i')
    let lists = getLists()
    let isFinished = lists[listInd].items[itemInd].isFinished
    finishTool.setAttribute('class',`fa-${isFinished ? 'solid' : 'regular'} fa-square-check utilButton mx-2`)
    finishTool.addEventListener('click', () => {
        lists[listInd].items[itemInd].isFinished = isFinished ? false : true
        updateLocalStorage('lists', lists)
        showLists()
    })

    parentEle.appendChild(finishTool)
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
            clearAllItemsFromList(ind, tools)
            break;
        case 'forItem':
            editItemName(ind, tools)
            deleteSingleItem(ind, tools)
            finishSingleItem(ind, tools)
            break;
        default:
            break;
    }

    parentEle.appendChild(tools)
}

function createNewItemInput (index, parentEle) {
    let newItemInput = document.createElement('input')
    newItemInput.setAttribute('placeholder', 'Add a new list item...')
    newItemInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            let lists = getLists()
            let value = e.target.value
            let newItem = new listItemObj(value, index)
            lists[index].items.push(newItem)
            updateLocalStorage('lists', lists)
            showLists()
        }
    })
    parentEle.appendChild(newItemInput)
}

function createListHeader (str, ind, parentEle) {
    let listHeader = document.createElement('div')
    listHeader.setAttribute('class', 'listHeader')

    createListName(str, ind, listHeader)
    createTools(ind, listHeader, 'forList')
    createNewItemInput(ind, listHeader)

    parentEle.appendChild(listHeader)
}

function createListItems (arr, listInd, parentEle) {
    arr.forEach((listItem, itemInd) => {
        let {title, isEditing, isFinished, listIndex} = listItem
        let item = document.createElement('div')
        let itemName = document.createElement(`${isEditing ? 'input' : 'p'}`)
        item.setAttribute('id', `randoID_${Math.floor(Math.random()*1000000) + 1}`)
        item.setAttribute('class', 'listItem')
        itemName.innerText = title

        isFinished ? item.style.textDecoration = 'line-through' : item.style.textDecoration = 'none'

        if (isEditing) {
            itemName.setAttribute('value', `${title}`)
            itemName.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    let value = e.target.value
                    let lists = getLists()
                    lists[listInd].items[itemInd].title = value
                    lists[listInd].items[itemInd].isEditing = false
                    updateLocalStorage('lists', lists)
                    showLists()
                }
            })
        } 

        createTools({itemInd, listInd}, item, 'forItem')

        item.appendChild(itemName)
        parentEle.appendChild(item)
    })
}

function createList (listObj, ind, listArr) {
    let {title, items, bgColor} = listObj
    let listCard = document.createElement('div')
    let listCardID = `list${ind}_${title}`
    listCard.setAttribute('id', `${listCardID}`)
    listCard.setAttribute('class', `listCard ${bgColor ? bgColor : ''}`)

    createListHeader(title, ind, listCard)

    items.length > 0 ? createListItems(items, ind, listCard) : console.log('no items')

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

function getAllItems(arr) {
    let allItems = []
    for (let i = 0; i < arr.length; i++) {
        let items = arr[i].items
        for (let j = 0; j < items.length; j++) {
            let item = items[j].title
            allItems.push(item)
        }
    }
    return allItems
}

function showMatches (arr) {
    let divArr = Array.from(document.querySelectorAll('.listItem'))
    resultsDiv.innerHTML = ''

    for (let i = 0; i < arr.length; i++) {

        let item = document.createElement('a')
        item.innerText = arr[i]

        for (let j = 0; j < divArr.length; j++){
            let content = divArr[j].innerText
            let theID = divArr[j].id
            if (arr[i] === content) {
                item.setAttribute('href', `#${theID}`)
            }
        }
        resultsDiv.appendChild(item)
    }
}

function findMatches(str, arr) {
    let items = getAllItems(arr)
    let matches = []
    if (str.length > 0) {
       items.forEach((item, ind) => {
        if (item.includes(str)) {
            matches.push(item)
        }
       })
    }

    showMatches(matches)
}

newListInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        let value = e.target.value
        newListInput.value = ''
        addNewListToLists(value)
    }
})

orderOptions.addEventListener('change', () => {
    let order = orderOptions.value
    let lists = getLists()

    switch (order) {
        case ORDER_BY_NAME:
            lists.sort((a, b) => {
                return a.title > b.title ? 1 : -1
            })
            break;
        case ORDER_BY_TIME:
            lists.sort((a, b) => {
                return a.timeStamp - b.timeStamp ? 1 : -1
            })
            break;
        default:
            console.error('DAFUQ!?!?!')
            break;
    }
    updateLocalStorage('lists', lists)
    showLists()
})

deathButton.addEventListener('click', () => {
    localStorage.removeItem('lists')
    showLists()
})

searchInput.addEventListener('keyup', (e) => {
    let searchTerm = searchInput.value
    let lists = Array.from(getLists())
    findMatches(searchTerm, lists)
})



// JSON.parse(localStorage.getItem('listData')).length > 0 ? showLists() : showEmpty()
showLists()
