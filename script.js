document.addEventListener("DOMContentLoaded", function () {
    toggleGenerateButton();
});

function toggleGenerateButton() {
    const length = document.getElementById("length").value;
    const includeSymbols = document.getElementById("symbols").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeUppercase = document.getElementById("uppercase").checked;

    const generateBtn = document.getElementById("generateBtn");
    generateBtn.disabled = !(length > 0 && (includeSymbols || includeNumbers || includeLowercase || includeUppercase));
}

function generatePassword() {
    const length = document.getElementById("length").value;
    const includeSymbols = document.getElementById("symbols").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeUppercase = document.getElementById("uppercase").checked;

    const symbols = "!@#$%^&*()_-+=[]{}|:;<>,.?/";
    const numbers = "0123456789";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let charset = "";
    if (includeSymbols) charset += symbols;
    if (includeNumbers) charset += numbers;
    if (includeLowercase) charset += lowercaseLetters;
    if (includeUppercase) charset += uppercaseLetters;

    let password = "";

    for (let i = 0; i < 4; i++) {
        const charType =
            i === 0
                ? includeSymbols
                : i === 1
                    ? includeNumbers
                    : i === 2
                        ? includeLowercase
                        : includeUppercase;

        if (charType) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset.charAt(randomIndex);
        }
    }

    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    password = shuffleString(password);

    const generateBtn = document.getElementById("generateBtn");
    const copyBtn = document.getElementById("copyBtn");

    document.getElementById("password").textContent = password;
    generateBtn.disabled = !(length > 0 && (includeSymbols || includeNumbers || includeLowercase || includeUppercase));
    copyBtn.disabled = !password;
}

function shuffleString(str) {
    const chars = str.split('');

    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.join('');
}

let toastVisible = false;
function copyToClipboard() {
    const passwordField = document.getElementById("password");
    const tempInput = document.createElement("textarea");
    tempInput.value = passwordField.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    if (toastVisible) return;

    const toast = document.getElementById("toast");
    const copyBtn = document.getElementById("copyBtn");

    const toastRect = toast.getBoundingClientRect();
    const rect = copyBtn.getBoundingClientRect();

    const toastX = rect.right + toastRect.width / 2 + 5;
    const toastY = rect.top - toastRect.height / 2 - 5;

    toast.style.left = toastX + "px";
    toast.style.top = toastY + "px";
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
        toastVisible = false;
    }, 2000);

    toastVisible = true;
}
