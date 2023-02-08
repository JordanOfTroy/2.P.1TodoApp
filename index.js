let theInput = document.getElementById('todoInput')
let theButton = document.getElementById('inputButton')
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
        title: "empty list",
        items: []
    }
]

function listObj (str, arr = []) {
    this.title = str,
    this.items = arr
}

let listData = []

function getInputValue () {
    let currentInputValue = theInput.value
    theInput.value = ""
    return currentInputValue
}

function createNewListObject (str) {
    let newObj = new listObj(str)
    return newObj
}


theButton.addEventListener('click', (event) => {
    // console.log('listData B4:', listData)
    let currentListItem = getInputValue()
    let currentListObject = createNewListObject(currentListItem)
    listData.push(currentListObject)
    
    // console.log('listData AFT:', listData)
    // console.log('~~~~~~~~')
    showLists(listData)
    
})

function clearOldList () {
    theList.innerHTML = ''
}

function createListDiv (ind, ele) {
    let listTitleDiv = document.createElement("div")
    let divID = `ListDiv_${ind}`
    theList.appendChild(listTitleDiv)
    listTitleDiv.setAttribute('id', divID)
    listTitleDiv.setAttribute('class', 'listCard')
    createListTitle(divID, ind, ele)
    return listTitleDiv
}

function createListTitle (divID, i, ele) {
    let listTitle = document.createElement("h1")
    let eleTitle = ele.title
    let eleID = eleTitle + '_id' + i
    listTitle.innerText = eleTitle
    listTitle.setAttribute('id', eleID)
    listTitle.setAttribute('class', 'listTitle')
    document.getElementById(divID).appendChild(listTitle)
    createListItems(ele, eleID, divID)
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
        createListDiv(i, ele)
        // console.log(ele.items.length)
        // console.log('-----')
        // let listTitleDiv = document.createElement("div")
        // let divID = `ListTitleDiv_${i}`
        // document.getElementById('todoList').appendChild(listTitleDiv)
        // listTitleDiv.setAttribute('id', divID)
        // listTitleDiv.setAttribute('class', 'listCard')

        // let listTitle = document.createElement("h1")
        // let eleTitle = ele.title
        // let eleID = eleTitle + '_id' + i
        // listTitle.innerText = eleTitle
        // listTitle.setAttribute('id', eleID)
        // listTitle.setAttribute('class', 'listTitle')
        // document.getElementById(divID).appendChild(listTitle)
        
        // ele.items.forEach((item, i) => {
        //     // console.log(item)
        //     // console.log(item.item)
        //     // console.log('...')
        //     let listItem = document.createElement("p")
        //     listItem.innerText = item.item
        //     listItem.setAttribute('id', `${eleID}_i`)
        //     listItem.setAttribute('class', 'listItem')
        //     // console.log(listItem)
        //     document.getElementById(divID).appendChild(listItem)
        // })
    })
}

showLists(testData)



