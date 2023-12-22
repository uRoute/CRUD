var formHandle = document.getElementById('formmy');
var bookmarkName = document.getElementById('name');
var bookmarkUrl = document.getElementById('url');
var addButton = document.getElementById('addBtn');
var updateButton = document.getElementById('updateBtn');
var updateIndex;
var bookmarks = []
if(localStorage.getItem("bookmarks")){
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    displayContent()
}
function add(){
   var bookmark = {
    name:bookmarkName.value,
    url:bookmarkUrl.value
   }
  
   bookmarks.push(bookmark)
   console.log(bookmarks);
   localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
   displayContent();
   clearInputs();
}
function displayContent(){

    var box = ''
    for(var i = 0;i<bookmarks.length;i++){
       box+=`
       <tr>
       <th scope="row">${i+1}</th>
       <td>`+bookmarks[i].name+`</td>
       <td>${bookmarks[i].url}</td>
       <td><button id="visitBtn" class="btn btn-success"><a href="https://${bookmarks[i].url}" target="_blank">Visit</a></button></td>
       <td><button onclick="update(${i})"  class="btn btn-warning">Update</button></td>
       <td><button onclick="deleteBookmark(${i})" class="btn btn-danger">Delete</button></td>

     </tr>
       `
    }
    document.getElementById('bodyContent').innerHTML = box
}
function update(index){

    bookmarkName.value = bookmarks[index].name;
    bookmarkUrl.value = bookmarks[index].url;
    addButton.classList.add("d-none");
    updateButton.classList.remove("d-none");
    updateIndex=index;
}
function applyUpdate(){
    bookmarks[updateIndex].name = bookmarkName.value;
    bookmarks[updateIndex].url = bookmarkUrl.value;
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    addButton.classList.remove("d-none");
    updateButton.classList.add("d-none");
    displayContent();
    clearInputs();
}
function clearInputs(){
    bookmarkName.value = '';
    bookmarkUrl.value = '';

}
function bookmarkSearch(searchKey){
    // console.log(searchKey);
    var box = '';
    for(var i = 0 ; i< bookmarks.length ; i++){
        if(bookmarks[i].name.toLowerCase().includes(searchKey.toLowerCase())){
            // console.log(bookmarks[i]);
            box+=`
            <tr>
            <th scope="row">${i+1}</th>
            <td>`+bookmarks[i].name+`</td>
            <td>${bookmarks[i].url}</td>
            <td><button id="visitBtn" class="btn btn-success"><a href="https://${bookmarks[i].url}" target="_blank">Visit</a></button></td>
            <td><button onclick="update(${i})"  class="btn btn-warning">Update</button></td>
            <td><button class="btn btn-danger">Delete</button></td>
     
          </tr>
            `
        }
    }
    document.getElementById('bodyContent').innerHTML = box
}
function deleteBookmark(index){
    bookmarks.splice(index,1);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    displayContent();
}
formHandle.addEventListener('click',function(e){
    e.preventDefault()
})