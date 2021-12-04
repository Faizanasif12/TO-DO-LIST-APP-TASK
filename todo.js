

var list = document.getElementById("list")


firebase.database().ref("todos").on("child_added", function (data) {
    var li = document.createElement("li")
    var creat = document.createTextNode(data.val().value)
    li.appendChild(creat)
    list.appendChild(li)
    input.value = " "

    var btn = document.createElement("button")
    var btnText = document.createTextNode("Delet")
    btn.setAttribute("id", data.val().key)
    btn.setAttribute("class", "dlt")
    btn.setAttribute("onclick", "dlet(this)")
    btn.appendChild(btnText)
    li.appendChild(btn)


    var editbtn = document.createElement("button")
    var editText = document.createTextNode("edit")
    editbtn.appendChild(editText)

    editbtn.setAttribute("id", data.val().key)
    editbtn.setAttribute("class", "edit")
    editbtn.setAttribute("onclick", "edit(this)")
    li.appendChild(editbtn)
})


function addtodo() {
    var input = document.getElementById("input")
    var database = firebase.database().ref("todos")
    var key = database.push().key
    var todo = {
        value: input.value,
        key: key

    }
    database.child(key).set(todo)



}
function dlet(parameter) {
    firebase.database().ref("todos").child(parameter.id).remove()
    parameter.parentNode.remove()
}

function dletAll() {
    list.innerHTML = " ";
}

function edit(e) {
    var val = prompt("enter update value")
    var edittod = {
        value:val,
        key: e.id
    }
    firebase.database().ref("todos").child(e.id).set(edittod)
    e.parentNode.firstChild.nodeValue = val;
}

