let theInput = document.getElementById('todoInput')
let theBigButton = document.getElementById('inputButton')
let theList = document.getElementById('todoList')
let searchInput = document.getElementById('taskSearch')

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


theBigButton.addEventListener('click', (event) => {
    let currentListItem = getInputValue(theInput)
    let currentListObject = createNewListObject(currentListItem)
    listData.push(currentListObject)
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
    listTitleDiv.setAttribute('class', 'listCard')

    createListTitle(divID, ind, ele, arr)

    return listTitleDiv
}


function createListTitle (divID, i, ele, arr) {
    let titleRow = document.createElement('div')
    let rowID = `row_${i}`
    let itemElemet = !ele.isEditing ? 'h1' : 'input'

    let listTitle = document.createElement(`${itemElemet}`)
    let eleTitle = ele.title
    let eleID = `${eleTitle}_id${i}`

    if (itemElemet) {
        listTitle.setAttribute('value', `${eleTitle}`)
        listTitle.setAttribute('class', 'edit_item_input')
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
    let toolsDiviD = `tools_${i}`
    toolsDiv.setAttribute('id', `${toolsDiviD}`)
    toolsDiv.setAttribute('class','tools')
    toolsDiv.appendChild(addlistInputDiv(i, ele, eleID, divID, 'list'))
    
    document.getElementById(divID).appendChild(titleRow)
    document.getElementById(rowID).appendChild(listTitle)
    document.getElementById(divID).appendChild(toolsDiv)
    createListItems(ele, eleID, divID, arr)
}


function createUtilities (i, size, divID, ele, arr, editType) {
    let utilDiv = document.createElement('div')
    let uitilIdvID = `utils_${i}`
    utilDiv.setAttribute('id', `${uitilIdvID}`)
    utilDiv.setAttribute('class','utils mx-3')

    let editbutton = document.createElement('i')
    let edifButtonID = `editButt_${i}`
    editbutton.setAttribute('id', `${edifButtonID}`)
    editbutton.setAttribute('class', `fa-solid fa-pen-to-square fa-${size} utilButton mx-3`)
    editbutton.addEventListener('click', (e) => {
        
        handleEdit(e, i, divID, ele, arr, editType)
    })

    let deleteButton = document.createElement('i')
    let deleteButtonID = `deleteButt_${i}`
    deleteButton.setAttribute('id', `${deleteButtonID}`)
    deleteButton.setAttribute('class', `fa-solid fa-trash fa-${size} utilButton mx-3`)
    deleteButton.addEventListener('click', (e) => {
        hadnleDelete(e, i, divID, ele, arr, editType)
    })

    utilDiv.appendChild(editbutton)
    utilDiv.appendChild(deleteButton)
    
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
        listItem.appendChild(createUtilities(i, 'md', divID, ele, arr))
    })
}


function handleEdit (event, i, divID, ele, arr, editType) {

    if (editType === 'list') {
        let listToBeEdited = ele
        ele.isEditing = true
    } else {
        let itemTobeEdited = ele.items[i] 
        itemTobeEdited.isEditing = true
    }

    showLists(listData)
}


function hadnleDelete (event, i, divID, ele, arr, editType) {

    if (editType === 'list') {
        arr.splice(i, 1)
    } else {
        let itemToBeDeleted = ele.items[i]
        ele.items.splice(i, 1)
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
    messageText.innerText = 'Please add a To-do'
    message.appendChild(messageText)
}

searchInput.addEventListener('keyup', (e) => {
    console.log(`you're searching for something...`)
    if (e.key ==='Enter') {
        console.log('you hit enter!')
    }
})



// listData.length > 0 ? showLists(listData) : showLists(testData)
listData.length > 0 ? showLists(listData) : showEmpty()

