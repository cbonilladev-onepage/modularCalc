function getHistory() {
    return document.querySelector(".history-value").innerText;
}

function printHistory(num) {
    document.querySelector(".history-value").innerText = num;
}

function getOutput() {
    return document.querySelector(".output-value").innerText;
}

function printOutput(num) {
    if (num == "") {
        document.querySelector(".output-value").innerText = num;
    } else {
        document.querySelector(".output-value").innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    if(num == "-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {

        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        }
        else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } 
        else {
            var output = getOutput();
            var history = getHistory();
            if (output == "" && history != "") {
                output = output == ""?
                output:reverseNumberFormat(output);
                if (isNaN(history[history.length-1])) {
                    history = history.substr(0, history.length-1);
                }
            }
            if (output != "" || history != "") {
                output = reverseNumberFormat(output);
                history = history + output;
                if (this.id == "=") {
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        var output = reverseNumberFormat(getOutput());
        if (output != NaN) {
            output = output + this.id;
            printOutput(output);
        }
    });
}

var dot = document.getElementById(".");
dot.addEventListener("click", decimal);
function decimal() { 
    var output = reverseNumberFormat(getOutput());
    output += this.id;
    printOutput(output);
}


printOutput("");