const PL_RO = 1.5;
const PL_NSO = 2.4;
const PL_SHW = 2;
const PL_RHW = 1;
const PL_NSHW = 1.2;
const BRUTTO = 29.50;
const STEP = -100;

let transform = [0, 0, 0, 0, 0, 0];
let extraHours = ["PL Regular Overtime", "PL Night Shift Overtime", "PL Sunday Hours Worked"];
let extraHoursShort = ["ro", "nso", "shw"]
let activeHours = [];

function calculate(answer) {
    let ro = 0
    let nso = 0
    let shw = 0
    let rhw = document.getElementById("rhw").value;
    let nshw = document.getElementById("nshw").value;


    let existHours = ifExist()
    if (existHours) {
        for (let i = 0; i < existHours.length; i++) {
            if (existHours[i] === "ro") {
                ro = document.getElementById("ro").value
            }
            if (existHours[i] === "nso") {
                nso = document.getElementById("nso").value
            }
            if (existHours[i] === "shw") {
                shw = document.getElementById("shw").value
            }
        }
    }

    let salaryBrutto = (((
        PL_RHW * (typeof parseInt(rhw) !== "number" ? 0 : rhw) +
        PL_NSHW * (typeof parseInt(nshw) !== "number" ? 0 : nshw) +
        PL_RO * (typeof parseInt(ro) !== "number" ? 0 : ro) +
        PL_NSO * (typeof parseInt(nso) !== "number" ? 0 : nso) +
        PL_SHW * (typeof parseInt(shw) !== "number" ? 0 : shw))
        * BRUTTO))
    console.log(typeof parseInt(rhw))
    console.log(typeof parseInt(nshw))
    let salaryNetto = salaryBrutto - (salaryBrutto * (answer === "yes" ? 0.32 : 0.21));
    let arrayNum = decade(salaryNetto.toFixed(2));
    rotate(arrayNum)
}

function ifExist() {
    let exist = []
    for (let i = 0; i < extraHoursShort.length; i++) {
        let extraHour = document.getElementsByClassName(extraHoursShort[i])[0]
        if (extraHour !== undefined) {
            exist.push(extraHoursShort[i])
        }
    }
    if (!exist[0]) return false;

    return exist
}

function decade(num) {
    num = num.toString().split('.');
    let money = num[0];
    let coins = num[1];
    let num6 = 0;
    let num5 = 0;
    if (coins.length === 1) coins += "0"
    if (coins.length === 2) {
        num6 = coins % 10;
        num5 = (coins % 100 - money % 10) / 10;
    }
    let num4 = money % 10;
    let num3 = (money % 100 - money % 10) / 10;
    let num2 = (money % 1000 - money % 100) / 100;
    let num1 = (money % 10000 - money % 1000) / 1000;
    return [parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4), parseInt(num5), parseInt(num6)];
}

function rotate(array) {

    for (let i = 0; i < array.length; i++) {
        let count = "num" + (i + 1);
        let num = document.getElementById(count)
        num.style.transform = "translateY(" + translateStep(array[i], i) + "%)"
    }
}

function translateStep(num, i) {
    let result = (9 - num) * STEP;
    transform[i] = result
    return result
}

function showExtraHours() {
    let extraHoursBlock = document.getElementById("addForm");
    let salCalc = document.getElementById("salCalc")
    salCalc.style.top = "200%"
    extraHoursBlock.style.top = "50%"
    extraHoursBlock.style.left = "50%"
}

function hideExtraHours() {
    let salCalc = document.getElementById("salCalc")
    salCalc.style.top = "50%"
    let extraHoursBlock = document.getElementById("addForm");
    extraHoursBlock.style.top = "-100%"
}

function showAgeForm() {
    let ageForm = document.getElementById("ageForm");
    let salCalc = document.getElementById("salCalc")
    salCalc.style.top = "200%"
    ageForm.style.top = "50%"
    ageForm.style.left = "50%"
}

function hideAgeForm(answer) {
    let salCalc = document.getElementById("salCalc")
    salCalc.style.top = "50%"
    let ageForm = document.getElementById("ageForm");
    ageForm.style.top = "-100%"
    setTimeout(function () {
        calculate(answer)
    }, 400);
}

function add() {
    let checkBoxArr = document.getElementsByClassName("addCheckBox")
    for (let i = 0; i < checkBoxArr.length; i++) {
        let value = -1
        for (let j = 0; j < activeHours.length; j++) {
            if (checkBoxArr[i].value === activeHours[j]) {
                value = i
            }
        }
        if (checkBoxArr[i].checked && value !== i) {
            let formBody = document.getElementsByClassName("formBody")[0];
            let formBodyRow = document.createElement("div");
            formBodyRow.classList.add(extraHoursShort[i]);
            formBodyRow.classList.add("formBodyRow")
            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            let div3 = document.createElement("div");
            div3.classList.add("deleteIcon");
            div3.setAttribute("onclick", ("deleteRow('" + checkBoxArr[i].value + "')"))
            let span = document.createElement("span");
            span.textContent = "+"
            let label = document.createElement("label");
            label.setAttribute("for", extraHoursShort[i]);
            label.textContent = extraHours[i];
            let input = document.createElement("input");
            input.setAttribute("type", "number");
            input.setAttribute("id", extraHoursShort[i]);
            input.setAttribute("placeholder", "Enter your hours");
            input.classList.add("formBodyInput")

            div1.appendChild(label);
            div2.appendChild(input);
            div3.appendChild(span);
            formBodyRow.appendChild(div1)
            formBodyRow.appendChild(div2)
            formBodyRow.appendChild(div3)
            formBody.appendChild(formBodyRow)
            activeHours.push(checkBoxArr[i].value);
        }
    }
    hideExtraHours()
}

function deleteRow(rowName) {
    let row = document.getElementsByClassName(rowName)[0];
    row.style.transform = "translateX(-130%)";
    setInterval(function () {
        row.remove()
    }, 200);
    let deleted = rowName;
    for (let i = 0; i < activeHours.length; i++) {
        if (rowName === activeHours[i]) {
            delete activeHours[i]
        }
    }
    let checkBoxes = document.getElementsByClassName("addCheckBox")
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].value === deleted) {
            checkBoxes[i].checked = false
        }
    }
}

function resetRows() {
    document.getElementById("rhw").value = ""
    document.getElementById("nshw").value = ""
    if (activeHours[0] && activeHours[0] !== undefined) {
        for (let i = 0; i < activeHours.length; i++) {
            if (activeHours[i] === "ro") {
                document.getElementById("ro").value = ""
            }
            if (activeHours[i] === "nso") {
                document.getElementById("nso").value = ""
            }
            if (activeHours[i] === "shw") {
                document.getElementById("shw").value = ""
            }
        }
    }
    resetNums()
}

function resetNums() {
    for (let i = 0; i < 6; i++) {
        let count = "num" + (i + 1);
        let num = document.getElementById(count)
        num.style.transform = "translateY(-900%)"
    }
    transform = [0, 0, 0, 0, 0, 0];
}

