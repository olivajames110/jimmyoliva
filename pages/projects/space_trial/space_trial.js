function buttonClick() {
 var item = document.getElementById('list-input').value;
 var text = document.createTextNode(item);
 var newItem = document.createElement("li");
 newItem.appendChild(text)
 document.getElementById("uncompleted-list").appendChild(newItem)

 
}