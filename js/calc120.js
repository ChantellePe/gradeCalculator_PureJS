window.onload = function () {
    document.getElementById("grades").addEventListener("reset", resetPage);
    document.getElementById("grades").addEventListener("submit", validate);
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click", removeError);
    }
};

let finalMark;
let finalGrade;
let gradeArray = [];
let total = 0;
let animationInterval;
let autoFail = false;

function getAutoFail() {
    return autoFail;
}


function validate(e) {
    e.preventDefault();
    let ass1 = document.querySelector("input[name=assignment1]").value;
    let ass2 = document.querySelector("input[name=assignment2]").value;
    let ass3 = document.querySelector("input[name=assignment3]").value;
    let exam = document.querySelector("input[name=exam]").value;
    finalGrade = "";

    if (isNaN(ass1) || ass1 === null || ass1 === "") {
        addError("You must enter a number in Assignment 1");
    } else if (ass1 > 100) {
        addError("Assignment 1 grade is out of 100");
    } else if (isNaN(ass2) || ass2 === null || ass2 === "") {
        addError("You must enter a number in Assignment 2");
    } else if (ass2 > 100) {
        addError("Assignment 2 grade is out of 100");
    } else if (isNaN(ass3) || ass3 === null || ass3 === "") {
        addError("You must enter a number in Assignment 3");
    } else if (ass3 > 100) {
        addError("Assignment 3 grade is out of 100");
    } else if (isNaN(exam) || exam == null || exam === "") {
        addError("You must enter a number in Exam");
    } else if (exam > 100) {
        addError("Exam grade is out of 100");
    } else {
        removeError();
        displayFinalGrades();
    }
}

function calculateGrade() {

    let results = document.getElementById("resultMark");
    let grades = document.getElementById("resultGrade");
    document.getElementById("int_col_left").classList.add("hidden");
    document.getElementById("int_col_right").classList.add("hidden");
    let comparison = document.getElementById("comparison");
    let challenge = document.getElementById("challenge");
    comparison.classList.add("hidden")
    challenge.classList.remove("hidden")
    comparison.innerHTML = ""
    grades.innerHTML = "";
    results.innerHTML = "";
    finalMark = "";
    finalGrade = "";
    gradeArray = [];
    autoFail = false;
    total = 0;
    let assignment1 = parseInt(document.getElementsByClassName("input_box")[0].value);
    let assignment2 = parseInt(document.getElementsByClassName("input_box")[1].value);
    let assignment3 = parseInt(document.getElementsByClassName("input_box")[2].value);
    let exam = parseInt(document.getElementsByClassName("input_box")[3].value);
    //let length = document.getElementsByClassName("input_box").length;
    if (exam / 100 < 0.5) {
        autoFail = true;
    }
    gradeArray.push((assignment1 / 100) * 15);
    gradeArray.push((assignment2 / 100) * 25);
    gradeArray.push((assignment3 / 100) * 20);
    gradeArray.push((exam / 100) * 40);
    for (x = 0; x < gradeArray.length; x++) {
        total += gradeArray[x];
    }
    console.log(total);
    finalMark = parseInt(total);
}

function displayFinalGrades() {
    let submitButton = document.querySelector('.button[type="submit"]');
    if (submitButton.disabled === false) {
        calculateGrade();
        let results = document.getElementById("resultMark");
        let grades = document.getElementById("resultGrade");
        let resultContainer = document.getElementById("results");
        resultContainer.classList.remove("hidden");
        results.classList.remove("hidden");
        grades.classList.remove("hidden");
        if (getAutoFail() === true) {
            finalGrade = "You have failed - you are required to achieve at least 50% in the exam.";
        } else if (finalMark >= 85) {
            finalGrade = "You have achieved a High Distinction";
        } else if (finalMark < 85 && finalMark > 75) {
            finalGrade = "You have achieved a Distinction";
        } else if (finalMark <= 75 && finalMark > 65) {
            finalGrade = "You have achieved a Credit";
        } else if (finalMark <= 65 && finalMark > 50) {
            finalGrade = "You have achieved a Pass";
        } else if (finalMark <= 50) {
            finalGrade = "You have achieved a Fail";
        }
        gradeComparison(91, finalMark)
        let markNode = document.createTextNode("Your final mark is " + finalMark.toString())
        let gradeNode = document.createTextNode(finalGrade)
        results.appendChild(markNode);
        grades.appendChild(gradeNode);
        resultContainer.classList.add("animated_results");
        requestAnimationFrame(() => {
            resultContainer.classList.add("show");
        });
        if (finalGrade === "You have achieved a High Distinction") {
            let $omg1 = $("#omg1");
            let $omg2 = $("#omg2");
            document.getElementById("int_col_left").classList.remove("hidden");
            document.getElementById("int_col_right").classList.remove("hidden");
            $omg1.fadeIn();
            $omg1.fadeOut();
            $omg2.fadeIn();
            $omg2.fadeOut();
            $omg1.fadeIn();
            $omg1.fadeOut();
            $omg2.fadeIn();
            $omg2.fadeOut();
            $omg1.fadeIn();
            $omg1.fadeOut();
            $omg2.fadeIn();
            $omg2.fadeOut();
            $omg1.fadeIn();
            $omg1.fadeOut();
            $omg2.fadeIn();
            $omg2.fadeOut();
            $omg1.fadeIn();
            $omg2.fadeIn();
        }
    }
}

function gradeComparison(myGrade, calcGrade) {
    let comparison = document.getElementById("comparison");
    let challenge = document.getElementById("challenge");
    if (myGrade > calcGrade) {
        comparison.classList.remove("hidden")
        challenge.classList.add("hidden")
        comparison.classList.add("pop-outin")
        let difference = myGrade - calcGrade
        comparison.innerHTML = "I beat your grade by " + difference + "%!";
    } else if (calcGrade > myGrade) {
        comparison.classList.remove("hidden")
        challenge.classList.add("hidden")
        comparison.classList.add("pop-outin")
        let difference = calcGrade - myGrade
        comparison.innerHTML = "Well done! You beat my grade by " + difference + "%!";
    } else {
        comparison.classList.remove("hidden")
        challenge.classList.add("hidden")
        comparison.classList.add("pop-outin")
        comparison.innerHTML = "Wow! You got the same grade as me! Well done!";
    }

}

function resetPage(e) {
    location.reload();
}

function addError(message) {
    let errorDiv = document.createElement("div");
    errorDiv.id = "error1";
    errorDiv.textContent = message;
    let errorContainer = document.getElementById("error");
    errorContainer.appendChild(errorDiv);
}

function removeError(e) {
    document.getElementById("error").innerHTML = "";
}