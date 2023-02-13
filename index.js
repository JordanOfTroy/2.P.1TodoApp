let theInput = document.getElementById('todoInput')
let theBigButton = document.getElementById('inputButton')
let theList = document.getElementById('todoList')

let testData = [
    {
        title: "shopping",
        items: [
            {
                item: 'millk',
                checked: false
            },
            {
                item: 'bread',
                checked: false
            },
            {
                item: 'eggs',
                checked: false
            },
        ]
    },
    {
        title: "chores",
        items: [
            {
                item: 'clean the gutters',
                checked: false
            },
            {
                item: 'mow the lawn',
                checked: false
            },
            {
                item: 'clean out the garage',
                checked: false
            },
        ]
    },
    {
        title: "empty_list",
        items: []
    }
]

function listObj (str, arr = []) {
    this.title = str,
    this.items = arr
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
    console.log(listData)
    showLists(listData)
})


function clearOldList () {
    theList.innerHTML = ''
}


function createListDiv (ele, ind) {
    let listTitleDiv = document.createElement("div")
    let divID = `ListDiv_${ind}`

    theList.appendChild(listTitleDiv)
    listTitleDiv.setAttribute('id', divID)
    listTitleDiv.setAttribute('class', 'listCard')

    createListTitle(divID, ind, ele)
    return listTitleDiv
}


function createListTitle (divID, i, ele) {
    let titleRow = document.createElement('div')
    let rowID = `row_${i}`

    let listTitle = document.createElement("h1")
    let eleTitle = ele.title
    let eleID = `${eleTitle}_id${i}`

    titleRow.setAttribute('id', `${rowID}`)
    titleRow.setAttribute('class', 'listHeader')

    listTitle.innerText = eleTitle
    listTitle.setAttribute('id', eleID)
    listTitle.setAttribute('class', 'listTitle')

    titleRow.appendChild(createUtilities(i, 'xl'))

    let toolsDiv = document.createElement('div')
    let toolsDiviD = `tools_${i}`
    toolsDiv.setAttribute('id', `${toolsDiviD}`)
    toolsDiv.setAttribute('class','tools')
    toolsDiv.appendChild(addlistInputDiv(i, ele, eleID, divID))
    
    document.getElementById(divID).appendChild(titleRow)
    document.getElementById(rowID).appendChild(listTitle)
    document.getElementById(divID).appendChild(toolsDiv)
    createListItems(ele, eleID, divID)
}


function createUtilities (i, size) {
    let utilDiv = document.createElement('div')
    let uitilIdvID = `utils_${i}`
    utilDiv.setAttribute('id', `${uitilIdvID}`)
    utilDiv.setAttribute('class','utils mx-3')

    let editbutton = document.createElement('i')
    let edifButtonID = `editButt_${i}`
    editbutton.setAttribute('id', `${edifButtonID}`)
    editbutton.setAttribute('class', `fa-solid fa-pen-to-square fa-${size} utilButton mx-3`)
    editbutton.addEventListener('click', (e, i) => {
        handleEdit(e, i)
    })

    let deleteButton = document.createElement('i')
    let deleteButtonID = `deleteButt_${i}`
    deleteButton.setAttribute('id', `${deleteButtonID}`)
    deleteButton.setAttribute('class', `fa-solid fa-trash fa-${size} utilButton mx-3`)
    deleteButton.addEventListener('click', (e, i) => {
        hadnleDelete(e, i)
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
            checked: false
        })
        showLists(listData)
    })
    
    inputDiv.appendChild(theInput)
    inputDiv.appendChild(button)
    return inputDiv
}



function createListItems (ele, eleID, divID) {
    ele.items.forEach((item, i) => {
        let listItem = document.createElement("div")
        let itemName = document.createElement('p')

        itemName.innerText = item.item
        listItem.setAttribute('id', `${eleID}_${i}`)
        listItem.setAttribute('class', 'listItem')



        document.getElementById(divID).appendChild(listItem)
        listItem.appendChild(itemName)
        listItem.appendChild(createUtilities(i, 'md'))
        
    })
}


function handleEdit (event, i) {
    console.log('you are ediging the list title.', event.target)
    // bring up modal with input and button
}

function hadnleDelete (event, i) {
    console.log('you are deleting the list!', event.target)
    // buring up modal to confirm deletion 
}


function showLists (arr) {
    clearOldList()
    arr.forEach((ele, i) => {
        createListDiv(ele, i)
    })
}



listData.length > 0 ? showLists(listData) : showLists(testData)

