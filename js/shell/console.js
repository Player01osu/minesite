const code = document.getElementById("code");

function code_set(command, text) {
    code.childNodes[1].textContent = command;
    code.childNodes[2].textContent = " " + text;
}
