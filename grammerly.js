var text;
var incorrectwords = [];

function addEventListeners(){
	document.getElementById("sendReq").onclick = async function getCorrectWord(event) {	
	        	var tarea = document.getElementById("filecontent");

	        	let url = "https://api.textgears.com/spelling?key=LbhsfeRWLJ2GgBMn&text="+text;
		        let response = await fetch(url, {	
		            method: "GET",
		        });	
		        let result = await response.json();	
	        	tarea.remove();
		        console.log(result);
		        let err = result.response.errors;
		        for(let i =0; i<err.length; i++){
		        	incorrectwords.push(err[i].bad);
		        }	
		       	document.getElementById('result').innerHTML = transformContent(text, incorrectwords, err);
	   }
}

function transformContent(content, incorrectwords, err){
  let temp = content;
  // incorrectwords.forEach(key => {
  //   temp = temp.replace(new RegExp(key, 'ig'), wrapKeywordWithHTML(key));
  // });

  for(let i=0; i<incorrectwords.length; i++){
  	temp = temp.replace(new RegExp(incorrectwords[i], 'ig'), wrapKeywordWithHTML(incorrectwords[i]));

  	// create an unordered list of better words for the possible incorrect words and assign them a class
  	// className = class-incorrectwords[i]
  	// eg: className for 'an' will be class-na - as 'na' is the incorrect word for the correct word 'an'
  	let ul = document.createElement("ul");
  	let className = "class-" + incorrectwords[i];
  	ul.classList.add(className);

  	for(let j=0; j<err[i].better.length; j++){
  		let liNode = document.createElement('li');
  		let txt = document.createTextNode(err[i].better[j]);
  		liNode.append(txt);
  		ul.append(liNode);
  	}
  	
  	console.log(ul);
  	let divNode = document.getElementsByTagName('div')[0];
  	divNode.appendChild(ul);

  	let node = document.getElementsByClassName(className);
  	// node.style.display = 'none';
  	console.log(node);
  	// node.addEventListener('click', ()=>{
  	// 	node.style.display = 'inline-block';
  	// });

  }
  return temp;
}

function wrapKeywordWithHTML(keyword){
  return `<span class="suggestion" style=" color: red; font-size: 15px">  ${keyword}  </span>`
}

function readfile(){

	// var tarea = document.createElement("textarea");
	// tarea.setAttribute("id", "filecontent");

	let file = inputfile.files[0];
	let reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function(){
		filecontent.value = reader.result;
		text = filecontent.value;
	}

	// document.body.appendChild(tarea);
}
