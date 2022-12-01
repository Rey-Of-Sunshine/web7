let data = JSON.parse(localStorage.getItem('todos2072'))

let addBtn = document.getElementById('addBtn'),
    addMsg = document.getElementById('addTitle'),
    addPrior = document.getElementById('addPrior'),
    block = document.querySelector('.TODO'),
    items = data ?? []

addBtn.addEventListener('click', addElement)

let delBtn = document.getElementById('delBtn')
delBtn.addEventListener('click', deleteElement)


function addElement() {
    let item = {
        'todo': addMsg.value,
        'checked': false,
        'prior': addPrior.value
    }
    items.push(item)
    console.log(items)
    localStorage.setItem('todos2072', JSON.stringify(items))
    showItems()
}


function deleteElement() {
    
    items = [];
    console.log(items)
    showItems()
    
}
 
function showItems(){
    block.innerHTML = ''
    
    items.forEach(function (item, index, items) {
        let newBlock = `
        <div class="item ${item.checked ? "checkedTodo" : ""} ${ getColorClass(item.prior) }">
            <input type="checkbox" id='item_${index}' data-eid="${index}"  ${ item.checked ? 'checked' : ''}>
            <label for="item_${index}">${item.todo}</label>
            ${ index > 0 ? '<img class="item_icon" data-eid="' + index + '" src="arrow-up.png">' : ''}
            ${ index < (items.length-1) ? '<img class="item_icon" data-eid="' + index + '" src="arrow-down.png">' : ''}
        </div>
        `
        block.innerHTML += newBlock
    })

    let checkboxes = document.querySelectorAll('input[type=checkbox]')
    checkboxes.forEach(function (el, index) {
        el.addEventListener('change', checkboxHandler)
    })

    let upItemBtn = document.querySelectorAll('div.item img.item_icon')
    upItemBtn.forEach(function (el, index) {
        el.addEventListener('click', upItemPosition)
    })

    let downItemBtn = document.querySelectorAll('div.item img.item_icon')
    downItemBtn.forEach(function (el, index) {
        el.addEventListener('click', downItemPosition)
    })
}

function getColorClass(prior) {
    switch (prior) {
        case '1':
            return 'optblue'
        break
        case '2':
            return 'optred'
        break
        case '3':
            return 'optwhite'
        break
        default:
            return 'idk'
    }
}

function upItemPosition(event) {
    let el = event.currentTarget,
        fromIndex = parseInt(el.dataset.eid),
        thisel = items[fromIndex]
    items[fromIndex] = items[fromIndex-1]
    items[fromIndex-1] = thisel

    showItems()
}

function downItemPosition(event) {
    let el = event.currentTarget,
        dfromIndex = parseInt(el.dataset.eid),
        dthisel = items[dfromIndex]
    items[dfromIndex] = items[dfromIndex+1]
    items[dfromIndex+1] = dthisel

    showItems()
}

function checkboxHandler(event) {
    let el = event.currentTarget,
        index = parseInt(el.dataset.eid)
    items[index].checked = !items[index].checked
    console.log(items)
    localStorage.setItem('todos2072', JSON.stringify(items))
    showItems()
}

if (items) showItems()