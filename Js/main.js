var bookmark = document.getElementById("bookmark");
var webUrl = document.getElementById("webUrl");
var submit = document.getElementById("submit");
var btnUpdate = document.getElementById("update");
var alertCont = document.getElementById("alertContainer");
var btnClose = document.getElementById("close");


alertCont.addEventListener("click", function () {
  alertCont.style.display = "none";
});

btnClose.addEventListener("click", function () {
  alertCont.style.display = "none";
});
submit.addEventListener("click", getBookmark);

webUrl.addEventListener("keyup", function () {
  if (check(webUrl.value) == true) {
    webUrl.classList.replace("is-invalid", "is-valid");
  } else {
    webUrl.classList.add("is-invalid");
  }
});
bookmark.addEventListener("keyup", function () {
  if (checkName(bookmark.value) == true) {
    bookmark.classList.replace("is-invalid", "is-valid");
  } else {
    bookmark.classList.add("is-invalid");
  }
});

btnUpdate.addEventListener("click", update);

var bookmarkArray = [];

if (localStorage.getItem("mark") != null) {
  bookmarkArray = JSON.parse(localStorage.getItem("mark"));
  display();
}

function getBookmark() {
  var bookmarkObject = {
    name: bookmark.value,
    url: webUrl.value,
  };
  if (check(webUrl.value) && checkName(bookmark.value) == true) {
    bookmarkArray.push(bookmarkObject);
  } else {
    alertCont.style.display = "flex";
  }
  localStorage.setItem("mark", JSON.stringify(bookmarkArray));
  clr();
  display();
}

function display() {
  var box = ``;
  for (var i = 0; i < bookmarkArray.length; i++) {
    box += `
<tr onclick="edit(${i})">
                            <td>${i + 1}</td>
                            <td>${bookmarkArray[i].name}</td>
                            <td>
                                <button onclick="visit(${i})" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i> Visit</button>
                            </td>
                            <td>
                                <button onclick='deleteItem(${i})' class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button>

                            </td>
                        </tr>
`;
  }
  document.getElementById("body").innerHTML = box;
}
function deleteItem(index) {
  bookmarkArray.splice(index, 1);
  localStorage.setItem("mark", JSON.stringify(bookmarkArray));
  display();
}
// var index = "";
// function edit(trIndex) {
//   bookmark.value = bookmarkArray[trIndex].name;
//   webUrl.value = bookmarkArray[trIndex].url;
//   submit.style.display = "none";
//   btnUpdate.style.display = "block";
//   index = trIndex;
// }

// function update() {
//   var bookmarkObject = {
//     name: bookmark.value,
//     url: webUrl.value,
//   };
//   if(check(webUrl.value)&&checkName(bookmark.value)==true){
//     bookmarkArray[index] = bookmarkObject;
//   }else{
//     alertCont.style.display = "flex";
//   }
//   localStorage.setItem("mark", JSON.stringify(bookmarkArray));
//   clr();
//   display();
//   submit.style.display = "block";
//   btnUpdate.style.display = "none";
// }

function clr() {
  bookmark.value = "";
  webUrl.value = "";
}

function check(str) {
  var regex =
    /^(https?|ftp|file):\/\/?[-A-Za-z0-9+&@#\%?=~_|!:,.;]+[-A-Za-z0-9+&@#\%=~_|]?\//;
  return regex.test(str);
}

function checkName(str) {
  var regex = /^[a-zA-z]{3,}/;
  return regex.test(str);
}
function visit(index) {
  window.open(bookmarkArray[index].url);
}
