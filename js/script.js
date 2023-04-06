function showOutput() {
    document.getElementById("output").innerHTML = output;
}

function clearOutput() {
    document.getElementById("output").innerHTML = " "
}

function getFieldValue(id) {
    return document.getElementById(id).value;
}

function getRandomId() {
    return Math.random().toString(36).slice(2)
}


let emailValidation = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

function showNotification(msg, type){

    let bgColor;

    switch (type) {
        case "success" :
            bgColor = "linear-gradient(to right, #1D976C, #93F9B9)"
            break ;
        case "error" :
            bgColor = "linear-gradient(to right, #93291e, #ed213a)"
            break;
        default : 
            bgColor = "#000"

    }

    Toastify({
        text: msg,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "tom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: bgColor,
        },
        onClick: function(){} // Callback after click
      }).showToast();

}


// -----------------------------------------------------------------------------------------------------


let users = []


function handleSubmit() {

    event.preventDefault();


    let firstName = getFieldValue("firstName");
    let lastName = getFieldValue("lastName");
    let email = getFieldValue("email");
    let dob = getFieldValue("dob")
    

    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();

    
    let user = {
        firstName,
        lastName,
        email,
        dob,
        calculateAge : function (){
            let dateOfBirth = new Date(dob) ;
            let today = new Date();
            let dateOfBirthTime = dateOfBirth.getTime();
            let todayTime = today.getTime();
            let msDiff = todayTime - dateOfBirthTime ;
            let age = Math.floor(msDiff / (1000 * 60 * 60 * 24 * 365))
            return age ;
        },
    }

    

    user.id = getRandomId();
    user.dateCreated = new Date().getTime();
    user.status = "active";
    user.role = "student";

    users.push(user);

    showNotification("A new user has been successfully added", "success")


    showTable()

}


function showTable() {

    if(!users.length){
        showNotification("There is no single user available", "error");
        return;
    }

    let tableStartingCode = "<div class='table-responsive'><table class='table'>";
    let tableHead = "<thead><tr><th>#</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Date of Birth</th><th>Age</th>";
    let tableEndingCode = "</table></div>";
    let tableBody = " ";
    for(i=0; i < users.length; i++){
    tableBody += "<tr scope='row'><th>" + (i+1) + "</th><td>" + users[i].firstName + "</td><td>" + users[i].lastName + "</td><td>" + users[i].email + "</td><td>" + users[i].dob + "</td><td>"  + users[i].calculateAge() + "</td></tr>" ;
        let table = tableStartingCode + tableHead + "<tbody>" + tableBody + "</tbody>" + tableEndingCode ;
        document.getElementById("output").innerHTML = table ;
        console.log(table)

    }

}


function printUsers(){
    showNotification("Users printed on console","success")
        console.log(user)   
}
