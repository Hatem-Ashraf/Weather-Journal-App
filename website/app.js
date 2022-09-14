/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=8a35947617907290167c18323571cde3&units=imperial';

//Get data from UI
const zipCode =  document.getElementById('zip');
let d = new Date();

//UI elements
const tempUI = document.getElementById("temp");
const dateUI = document.getElementById("date");
const contentUI = document.getElementById("content");

//Adding event listener to the button
document.getElementById('generate').addEventListener('click', action);

//The main function
function action(){
	// Create a new date instance dynamically with JS
	let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
	
	//example of GET request http://api.openweathermap.org/data/2.5/weather?zip=49811,de&APPID=8a35947617907290167c18323571cde3&units=imperial
 	const content = document.getElementById("feelings").value;
	getDataFromApi(baseURL + zipCode.value + apiKey)
	.then( data =>{
		if(data){
		PostDataToLocal('/sendData', {temperature : data.main.temp, date : newDate, content : content});
		}else{
			return false;
		}
	})	
	.then( data =>{
		updateUI('/getData');	
	})
};

const getDataFromApi = async(url) =>{
	const res = await fetch(url);
	try{
		const data = await res.json();
		if(data.cod === 200 ){
			return data;			
		}else{
			alert(data.message);
			//return false in order not to POST it to the server
			return false;
		}
	}catch(err){
		alert("Error:",err);
	}
};


const PostDataToLocal = async(url = '', data = {}) =>{
	const response = await fetch(url, {
		method : "POST",
		credentials : 'same-origin',
    headers : {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(data)
  	});
  	try{
	    const newData = await response.json();
	    return 0;
  	}catch(error){
    	console.log('error', error);
  }
};


const updateUI = async (url)=>{
	const res = await fetch(url);
	try{
		const data = await res.json();

		//Checking if the server response is empty or not
		if(JSON.stringify(data) != '{}'){
			tempUI.innerHTML = "The current temperature is " + Math.round(data.temperature)+ ' degrees';
			contentUI.innerHTML = data.userResponse ; 
			dateUI.innerHTML = data.date;
			}
	}catch(err){
		console.log("Error", err);
	}
}