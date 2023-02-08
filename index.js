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
    this.itesm = arr
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
    let currentListItem = getInputValue()
    let currentListObject = createNewListObject(currentListItem)
    listData.push(currentListObject)

    console.log('listData:', listData)
})

// function to itterate through data structure and retuen STRING of HTML
// "I may vomit"


function showLists (arr) {
    console.log(arr)
    console.log('~~~~~~~')

    arr.forEach((ele, i) => {
        console.log(ele)
        console.log('-----')
        let listTitle = document.createElement("h1")
        let eleTitle = ele.title
        let eleID = eleTitle + '_id' + i
        listTitle.innerText = eleTitle
        listTitle.setAttribute('id', eleID)
        document.getElementById('container1').appendChild(listTitle)

        ele.items.forEach((item) => {
            console.log(item)
            console.log(item.item)
            console.log('...')
            let listItem = document.createElement("p")
            listItem.innerText = item.item
            console.log(listItem)
            document.getElementById(eleID).appendChild(listItem)
        })
        
    })


}

showLists(testData)

// function showshit () {
//     console.log(theList)
//     theList.innerHTML = '<h1>Hello World</h1>'
//     console.log(theList)
// }


