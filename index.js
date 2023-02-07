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

function getInputValue () {
    let currentInputValue = theInput.value
    theInput.value = ""
    return currentInputValue
}


theButton.addEventListener('click', (event) => {
    let currentListItem = getInputValue()
    console.log('theInput:', currentListItem)

})



// function showshit () {
//     console.log(theList)
//     theList.innerHTML = '<h1>Hello World</h1>'
//     console.log(theList)
// }


