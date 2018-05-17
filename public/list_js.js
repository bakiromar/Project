// function doBackgroundRequest(type, url, data, onloadCallback) {
// 	var xhr = new XMLHttpRequest();
// 	xhr.open(type, url);
// 	xhr.setRequestHeader("Content-Type", "application/json");
// 	xhr.onload = function() {
// 	    onloadCallback(xhr);
// 	  };

// 	  xhr.send(JSON.stringify(data));
// }

// var whatToDoWhenRequestIsDone = function(xhr) {
//   if (xhr.status === 200) {
//       console.log("added");
//       var newElem = document.createElement("LI");
//       var newId = document.createTextNode(itemName);

//       newElem.id = itemName;
//       document.getElementById(categoryName).appendChild(newElem);

//       var newElem2 = document.createElement("INPUT");
//       newElem2.type = "checkbox";
//       newElem.appendChild(newElem2);
//       newElem.appendChild(newId);
//     } else {
//       console.log("Error, not saved on the server");
//     }
// }
// doBackgroundRequest('POST', '/add-new-item', dataToSend, whatToDoWhenRequestIsDone);


/**
 * This function add a new Category to the current list
 */
function addCategory() {
	var categoryName = prompt('Enter a new category name:');
	var myElem = document.getElementById(categoryName);
	if (myElem === null) {
		var newElem = document.createElement('UL');
		var newElem2 = document.createElement('H3')
		var newId = document.createTextNode(categoryName);
		newElem.appendChild(newElem2);
		newElem2.appendChild(newId)
		newElem.id = categoryName;
		document.getElementById('categories').appendChild(newElem);
	}
}

/**
 * This function add a new Item in a specific Category
 */
function addItem() {
	var categoryName = document.getElementById('chooseCategory').value
	var itemName = document.getElementById('chooseItem').value
	var myCategory = document.getElementById(categoryName)
	var myName = document.getElementById(itemName)	
	if (myCategory === null) {
		swal('Category does not exist!')
	} else {
		// problem: can be number
		if (myName === null && itemName.length > 0) {
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/addItem');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onload = function() {
		    if (xhr.status === 200) {
			    var newElem = document.createElement('LI');
				var newId = document.createTextNode(itemName)

				newElem.id = itemName
				document.getElementById(categoryName).appendChild(newElem)

				newElem.appendChild(newId)

		    }
		    else {
		        console.log('Error, not saved on the server');
		    }
		};

	    	xhr.send(JSON.stringify({
			    item: itemName,
			    category: categoryName
			}));

		} else {
			swal('Cant add item!')
		}
	}
}
 
/**
 * This function delete a specific Category
 */
function delCategory() {
	var categoryName = document.getElementById('chooseCategory').value
	var myCategory = document.getElementById(categoryName)
	if (myCategory === null) {
		swal('Category does not exist!')
	} else { 
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/deleteItem');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onload = function() {
		    if (xhr.status === 200) {
				myCategory.parentNode.removeChild(myCategory);
		    } else {
		        console.log('Error, not saved on the server');
		    }
		};

    	xhr.send(JSON.stringify({
		    category: categoryName
		}));
	}
}

/**
 * This function delete a specific Category
 */
function delItem() {
	var itemName = document.getElementById('chooseItem').value
	var myItem = document.getElementById(itemName)
	if (myItem === null) {
		swal('Item does not exist!')
	} else { 
		myItem.parentNode.removeChild(myItem);
	}
}


document.getElementById('newCategory').addEventListener('click', function() {
	addCategory();
});

document.getElementById('newItem').addEventListener('click', function() {
	addItem();
});

document.getElementById('delCategory').addEventListener('click', function() {
	delCategory();
});

document.getElementById('delItem').addEventListener('click', function() {
	delItem();
});
