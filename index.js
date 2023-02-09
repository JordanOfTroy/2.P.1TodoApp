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

    document.getElementById(divID).appendChild(titleRow)
    document.getElementById(rowID).appendChild(listTitle)
    document.getElementById(rowID).appendChild(addlistInputDiv(i, ele, eleID, divID))
    createListItems(ele, eleID, divID)
}


function addlistInputDiv (i, ele, eleID, divID) {
    let inputDiv = document.createElement('div')
    let inputID = `inputDiv_${i}`
    inputDiv.setAttribute('id', `${inputID}`)

    let theInput = document.createElement('input')
    theInput.setAttribute('placeholder', 'Add a new list item...')

    let button = document.createElement('button')
    let buttonID = `button_${i}`
    button.innerText = '+ Add'
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
        let listItem = document.createElement("p")

        listItem.innerText = item.item
        listItem.setAttribute('id', `${eleID}_${i}`)
        listItem.setAttribute('class', 'listItem')

        document.getElementById(divID).appendChild(listItem)
    })
}


function showLists (arr) {
    clearOldList()
    arr.forEach((ele, i) => {
        createListDiv(ele, i)
    })
}

// showLists(testData)

function nolists() {
    return '<h1>Add a list</h1>'
}

listData.length > 0 ? showLists(listData) : nolists()

