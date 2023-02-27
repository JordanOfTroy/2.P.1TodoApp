let theInput = document.getElementById('todoInput')
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

let testData = [
    {
        title: "shopping",
        items: [
            {
                item: 'millk',
                checked: false,
                isEditing: false
            },
            {
                item: 'bread',
                checked: false,
                isEditing: false
            },
            {
                item: 'eggs',
                checked: false,
                isEditing: false
            },
        ],
        isEditing: false
    },
    {
        title: "chores",
        items: [
            {
                item: 'clean the gutters',
                checked: false,
                isEditing: false
            },
            {
                item: 'mow the lawn',
                checked: false,
                isEditing: false
            },
            {
                item: 'clean out the garage',
                checked: false,
                isEditing: false
            },
        ],
        isEditing: false
    },
    {
        title: "empty_list",
        items: [],
        isEditing: false
    }
]

function listObj (str, arr = [], bool = false) {
    this.title = str,
    this.items = arr,
    this.isEditing = bool
    this.timeStamp = new Date,
    this.bgColor = null
}

let listData = []

function getInputValue (ele) {
    let currentInputValue = ele.value
    ele.value = ""
    return currentInputValue
}

function createNewListObject (str) {
    let newObj = new listObj(str)
    return newObj
}



theBigButton.addEventListener('click', () => {
    let currentListItem = getInputValue(theInput)
    let currentListObject = createNewListObject(currentListItem)
    listData.push(currentListObject)
    showLists(listData)
})
theInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        let currentListItem = getInputValue(theInput)
        let currentListObject = createNewListObject(currentListItem)
        listData.push(currentListObject)
        showLists(listData)
    }
})
orderOptions.addEventListener('change', () => {
    let order = orderOptions.value

    switch (order) {
        case ORDER_BY_NAME:
            listData.sort((a, b) => {
                return a.title > b.title ? 1 : -1
            })
            break;
        case ORDER_BY_TIME:
            listData.sort((a, b) => {
                return a.timeStamp - b.timeStamp
            })
            break;
        default:
            console.error('DAFUQ!?!?!')
            break;
    }
    showLists(listData)
})
deathButton.addEventListener('click', () => {
    listData = []
    showLists(listData)
})


function clearOldList () {
    theList.innerHTML = ''
}


function createListDiv (ele, ind, arr) {
    let listTitleDiv = document.createElement("div")
    let divID = `ListDiv_${ind}`

    theList.appendChild(listTitleDiv)
    listTitleDiv.setAttribute('id', divID)
    listTitleDiv.setAttribute('class', `listCard ${ele.bgColor ? ele.bgColor : ''}`)

    createListTitle(divID, ind, ele, arr)

    return listTitleDiv
}


function createListTitle (divID, i, ele, arr) {
   
    let titleRow = document.createElement('div')
    let rowID = `row_${i}`
    let itemElement = !ele.isEditing ? 'h1' : 'input'

    let listTitle = document.createElement(`${itemElement}`)
    let eleTitle = ele.title
    let eleID = `${eleTitle}_id${i}`

    let colorOptions = document.createElement('select')


    if (itemElement) {
        listTitle.setAttribute('value', `${eleTitle}`)
        listTitle.setAttribute('class', `edit_item_input`)
        listTitle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                let newTitle = listTitle.value
                ele.title = newTitle
                ele.isEditing = false
                showLists(listData)
            }
        })
    }


    titleRow.setAttribute('id', `${rowID}`)
    titleRow.setAttribute('class', 'listHeader')

    listTitle.innerText = eleTitle
    listTitle.setAttribute('id', eleID)
    listTitle.setAttribute('class', 'listTitle')
    titleRow.appendChild(createUtilities(i, 'xl', divID, ele, arr, 'list'))

    let toolsDiv = document.createElement('div')
    let toolsDivID = `tools_${i}`
    toolsDiv.setAttribute('id', `${toolsDivID}`)
    toolsDiv.setAttribute('class','tools')
    toolsDiv.appendChild(addlistInputDiv(i, ele, eleID, divID, 'list'))


    colorOptions.addEventListener('change', (e) => {
        updateListColor(e, i)
    })

    addColorOptions(colorOptions, COLOR_OPTIONS)
    
    function addColorOptions (ele, arr) {
        let blank = document.createElement('option')
        blank.setAttribute('value', 'none')
        blank.innerText = '---'
        ele.appendChild(blank)
        for (let i = 0; i < arr.length; i++) {
            let colorOption = document.createElement('option')
            colorOption.setAttribute('value', `${arr[i].value}`)
            colorOption.innerText = arr[i].text
            ele.appendChild(colorOption)
        }
    }

    function updateListColor(e, i) {
        let option = e.target.value
        // let parentList = e.target.parentNode.parentNode
        // let parentObj = listData[i]

        switch (option) {
            case BLUE:
                listData[i].bgColor = BLUE
                showLists(listData)
                break;
            case PURPLE:
                listData[i].bgColor = PURPLE
                showLists(listData)
                break;
            case PINK:
                listData[i].bgColor = PINK
                showLists(listData)
                break;
            case ORANGE:
                listData[i].bgColor = ORANGE
                showLists(listData)
                break;
            case GREEN:
                listData[i].bgColor = GREEN
                showLists(listData)
                break;
            default:
                listData[i].bgColor = null
                showLists(listData)
                break;
        }
    }

    
    document.getElementById(divID).appendChild(titleRow)
    document.getElementById(rowID).appendChild(listTitle)
    document.getElementById(divID).appendChild(toolsDiv)
    document.getElementById(rowID).appendChild(colorOptions)
    
    createListItems(ele, eleID, divID, arr)
}


function createUtilities (i, size, divID, ele, arr, editType) {
    let utilDiv = document.createElement('div')
    let utilIdvID = `utils_${i}`
    utilDiv.setAttribute('id', `${utilIdvID}`)
    utilDiv.setAttribute('class','utils mx-3')

    let editButton = document.createElement('i')
    let editButtonID = `editButt_${i}`
    editButton.setAttribute('id', `${editButtonID}`)
    editButton.setAttribute('class', `fa-solid fa-pen-to-square fa-${size} utilButton mx-3`)
    editButton.addEventListener('click', (e) => {
        
        handleEdit(e, i, divID, ele, arr, editType)
    })

    let deleteButton = document.createElement('i')
    let deleteButtonID = `deleteButt_${i}`
    deleteButton.setAttribute('id', `${deleteButtonID}`)
    deleteButton.setAttribute('class', `fa-solid fa-trash fa-${size} utilButton mx-3`)
    deleteButton.addEventListener('click', (e) => {
        handleDelete(e, i, divID, ele, arr, editType)
    })

    utilDiv.appendChild(editButton)
    utilDiv.appendChild(deleteButton)

    if (editType != 'listUtils') {

        let clearCompletedTasksButton = document.createElement('i')
        let clearCompletedTasksButtonID = `clearAllTasks_${i}`
        clearCompletedTasksButton.setAttribute('id', `${clearCompletedTasksButtonID}`)
        clearCompletedTasksButton.setAttribute('class', `fa-solid fa-circle-xmark fa-${size} utilButton mx-3`)
        clearCompletedTasksButton.addEventListener('click', (e) => {
           handleClearCompletedTasksFromList(e, i, divID, ele, arr, editType) 
        })
    
        let clearAllTasksButton = document.createElement('i')
        let clearAllTasksButtonID = `clearAllTasks_${i}`
        clearAllTasksButton.setAttribute('id', `${clearAllTasksButtonID}`)
        clearAllTasksButton.setAttribute('class', `fa-solid fa-explosion fa-${size} utilButton mx-3`)
        clearAllTasksButton.addEventListener('click', (e) => {
           handleClearAllTasksFromList(e, i, divID, ele, arr, editType) 
        })

        utilDiv.appendChild(clearCompletedTasksButton)
        utilDiv.appendChild(clearAllTasksButton)
    }
    
    return utilDiv
}


function addlistInputDiv (i, ele, eleID, divID) {
    let inputDiv = document.createElement('div')
    let inputID = `inputDiv_${i}`
    inputDiv.setAttribute('id', `${inputID}`)

    let theInput = document.createElement('input')
    theInput.setAttribute('placeholder', 'Add a new list item...')
    theInput.setAttribute('class', 'my-3')

    let button = document.createElement('button')
    let buttonID = `button_${i}`
    button.innerHTML = '<i class="fa-solid fa-plus"></i> Add'
    button.setAttribute('id', `${buttonID}`)
    button.addEventListener('click', (event) => {
        let addedItem = getInputValue(theInput)
        ele.items.push({
            item: addedItem,
            checked: false,
            isEditing: false
        })
        showLists(listData)
    })
    theInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            let addedItem = getInputValue(theInput)
            ele.items.push({
                item: addedItem,
                checked: false,
                isEditing: false
            })
            showLists(listData)
        }
    })
    
    inputDiv.appendChild(theInput)
    inputDiv.appendChild(button)
    return inputDiv
}



function createListItems (ele, eleID, divID, arr) {
    ele.items.forEach((item, i) => {
        let itemElement = !item.isEditing ? 'p' : 'input'
        let listItem = document.createElement("div")
        let itemName = document.createElement(`${itemElement}`)

        if (!item.isEditing) {
            itemName.setAttribute('class', 'listName')
            itemName.addEventListener('click', () => {
                let status = item.checked
                if (status === false) {
                    itemName.classList.remove('text-decoration-none')
                    itemName.classList.add('text-decoration-line-through')
                    item.checked = true
                } else if (status === true) {
                    itemName.classList.remove('text-decoration-line-through')
                    itemName.classList.add('text-decoration-none')
                    item.checked = false
                }
            })
        }

        if (item.isEditing) {
            itemName.setAttribute('value', `${item.item}`)
            itemName.setAttribute('class', 'edit_item_input')
            itemName.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') {
                    let newValue = itemName.value
                    item.item = newValue
                    item.isEditing = false
                    showLists(listData)
                }
            })
        }

        itemName.innerText = item.item
        listItem.setAttribute('id', `${eleID}_item_id${i}`)
        listItem.setAttribute('class', 'listItem')

        document.getElementById(divID).appendChild(listItem)
        listItem.appendChild(itemName)
        listItem.appendChild(createUtilities(i, 'md', divID, ele, arr, 'listUtils'))

    })
}


function handleEdit (event, i, divID, ele, arr, editType) {

    if (editType === 'list') {
        let listToBeEdited = ele
        listToBeEdited.isEditing = true
    } else {
        let itemTobeEdited = ele.items[i] 
        itemTobeEdited.isEditing = true
    }

    showLists(listData)
}


function handleDelete (event, i, divID, ele, arr, editType) {

    if (editType === 'list') {
        arr.splice(i, 1)
    } else {
        let itemToBeDeleted = ele.items[i]
        ele.items.splice(i, 1)
    }
    
    showLists(listData)
}

function handleClearCompletedTasksFromList(e, i, divID, ele, arr, editType) {
    if (editType === 'list') {
        let filteredItems = arr[i].items.filter(el => !el.checked)
        arr[i].items = filteredItems
    }
    showLists(listData)
}
// function handleClearCompletedTasksFromList(e, i, divID, ele, arr, editType) {
//     if (editType === 'list') {
//         let listItems = arr[i].items
//         for (let i = 0; i < listItems.length; i++) {
//             if (listItems[i].checked) {
//                 removeTheItem(i)
//             }
//         }

//         function removeTheItem (i) {
//             listItems.splice(i, 1)
//         }
//     }
//     showLists(listData)
// }

function handleClearAllTasksFromList(e, i, divID, ele, arr, editType) {
    if (editType === 'list') {
        arr[i].items = []
    }
    showLists(listData)
}

function showLists (arr) {
    clearOldList()
    arr.forEach((ele, i) => {
        createListDiv(ele, i, arr)
    })
}

function showEmpty () {
    let message = document.querySelector('#todoList')
    let messageText = document.createElement('h1')
    messageText.innerText = 'Please Create a List'
    message.appendChild(messageText)
}

searchInput.addEventListener('keyup', (e) => {
    let searchTerm = searchInput.value

    findMatches(listData, searchTerm)
    
    if(e.key === 'Backspace') {
        findMatches(listData, searchTerm)
    }
})


function findMatches(arr, str) {
    let items = getAllListItems(arr)
    let matches = []
    if (str.length > 0) {
        for (let i in items) {
            if (items[i].includes(str)) {
                matches.push(items[i])
            }
        }
    }
    showMatches(matches)
}


function getAllListItems (arr) {
    let items = []
    for (let i = 0; i < arr.length; i++) {
        let itemsArr = arr[i].items
        for (let j = 0; j < itemsArr.length; j++) {
            let item = itemsArr[j].item
            items.push(item)
        }
    }
    return items
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



// listData.length > 0 ? showLists(listData) : showLists(testData)
listData.length > 0 ? showLists(listData) : showEmpty()

