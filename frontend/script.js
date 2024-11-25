//fetching the medicines data from the API
fetch("http://localhost:8000/medicines")
//.then(res=> console.log(result))
.then(response => response.json()) //converting the response to JSON format
.then(res =>{
    //getting the medicines array from the response and assigning it to data
    const data = res.medicines;
    //initialising an empty string to store the table rows
    let rows = '';
    //looping through each medicine in the array
    data.forEach(medicine =>(
        //for error handling if there is missing/invalid data, if the name or price
        //is empty/doesn't return a value, then i would set the value to be 'unknown' so 
        //that the program doesn't crash and it informs the user there is a missing data
        //value instead of just crashing

        //adding a table row for each medicine with name and price
        rows += `<tr> <td> ${medicine.name}</td><td> ${medicine.price}</td></tr>`
    ))
    //adding the generated rows to the HTML table
    document.getElementById('tableRows').innerHTML = rows;
})
//logging any errors that occur during the fetch process
.catch(error => console.log(error));

//variables to store the medicine name and price entered by the user
let medicineName;
let medicinePrice;

//checks that the submit button has been clicked
document.getElementById("mySubmit").onclick = function(){
    //retrieving the user input from the entry fields
    medicineName = document.getElementById("medicineInput").value;
    medicinePrice = document.getElementById("priceInput").value;

    console.log(medicineName);
    console.log(medicinePrice);

    //need to create the objects that will be pushed to the API
    const medicineData ={
        name : medicineName,
        price: parseFloat(medicinePrice) //converting medicinePrice from a string to float
    };

    //sending the medicine data to the API using a POST request
    fetch("http://localhost:8000/create",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' //telling the server what the data format is
        },
        body:JSON.stringify(medicineData) //converting the medicineData object to a JSON string
    })
    .catch(error => console.log(error));
} 