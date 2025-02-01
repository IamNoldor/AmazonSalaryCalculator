const PL_RO = 1.5;
const PL_NSO = 2.4;
const PL_SHW = 2;
const PL_RHW = 1;
const PL_NSHW = 1.2;
const BRUTTO = 29.50;
const YUONG_TAX = 0.21
const OLD_TAX = 0.32
const STEP = -100;
const PREMIA = 0.15

let transform = [0, 0, 0, 0, 0, 0];
let extraHoursShort = ["ro", "nso", "shw"]
let activeHours = [];
let currentPageStyle = true
let currentLang = "eng"
let currentTheme = "dark"

function calculate(answer = 0) {
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
    if (ro + nso + shw + rhw + nshw <= 0) {
        return false;
    } else if (answer === 0) return true
    if (answer !== 0) {
        let salaryBrutto = (((
                PL_RHW * (typeof parseInt(rhw) !== "number" ? 0 : rhw) +
                PL_NSHW * (typeof parseInt(nshw) !== "number" ? 0 : nshw) +
                PL_RO * (typeof parseInt(ro) !== "number" ? 0 : ro) +
                PL_NSO * (typeof parseInt(nso) !== "number" ? 0 : nso) +
                PL_SHW * (typeof parseInt(shw) !== "number" ? 0 : shw))
            * BRUTTO))
        let salaryNetto = salaryBrutto - (salaryBrutto * (answer === "yes" ? OLD_TAX : YUONG_TAX));
        let arrayNum = decade(salaryNetto.toFixed(2));
        rotate(arrayNum)
    }
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
    if (calculate()) {
        let ageForm = document.getElementById("ageForm");
        let salCalc = document.getElementById("salCalc")
        salCalc.style.top = "200%"
        ageForm.style.top = "50%"
        ageForm.style.left = "50%"
    }
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
            label.classList.add("lng")
            let atr = extraHoursShort[i] === "ro" ? "4" : extraHoursShort[i] === "nso" ? "5" : extraHoursShort[i] === "shw" ? "6" : false
            label.setAttribute("data-key", atr)

            label.textContent = extraHoursShort[i] === "ro" ? LANGUAGES["4"][currentLang] : extraHoursShort[i] === "nso" ? LANGUAGES["5"][currentLang] : extraHoursShort[i] === "shw" ? LANGUAGES["6"][currentLang] : false;

            let input = document.createElement("input");
            input.setAttribute("type", "number");
            input.setAttribute("id", extraHoursShort[i]);
            atr = LANGUAGES["7"][currentLang]
            input.setAttribute("placeholder", atr);
            input.setAttribute("data-key", "7")
            input.classList.add("formBodyInput")
            input.classList.add("lng")
            input.addEventListener("mouseenter", function (e) {
                input.style.borderBottom = currentTheme === "dark" ? '2px solid red' : '2px solid white'
            })
            input.addEventListener("mouseleave", function (e) {
                input.style.borderBottom = currentTheme === "dark" ? '2px solid #f6e9e9' : '2px solid rgb(57, 51, 51)'
            })
            input.style.borderBottom = currentTheme === "dark" ? '2px solid #f6e9e9' : '2px solid rgb(57, 51, 51)'
            input.style.color = currentTheme === "dark" ? 'white' : 'black'
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

function changeState() {
    currentPageStyle = currentPageStyle ? false : true;
    changePageStyle(currentPageStyle)
}

function changePageStyle(mode) {
    let btnWrapper = document.getElementsByClassName("btnWrapper")[0];
    if (mode) {
        btnWrapper.classList.remove("checked")
    } else {
        btnWrapper.classList.add("checked")
    }
}

function delLngClases(element) {
    element.classList.remove("rus");
    element.classList.remove("eng");
    element.classList.remove("pln");
}

let lngSelect = document.getElementById("lng")
lngSelect.addEventListener("change", function (e) {
    let elements = document.getElementsByClassName("lng")
    currentLang = lngSelect.value
    for (let el of elements) {
        if (el.dataset.key !== "7") {
            el.innerHTML = LANGUAGES[el.dataset.key][currentLang]
            delLngClases(el)
            el.classList.add(currentLang)
            delLngClases(document.getElementById("addForm"))
            document.getElementById("addForm").classList.add(currentLang)
            delLngClases(document.getElementById("salCalc"))
            document.getElementById("salCalc").classList.add(currentLang)
        } else {
            el.setAttribute("placeholder", LANGUAGES[el.dataset.key][currentLang])
        }
    }
})

function changeTheme() {
    currentTheme = currentTheme === 'dark' ? "light" : "dark";
    let body = document.body
    let addButton = document.getElementById("addButton")
    let options = document.getElementsByTagName("option");
    let allElements = document.getElementsByTagName("*");
    let inputs = document.getElementsByClassName("formBodyInput");
    let forms = document.getElementsByTagName('form')
    let formHead = document.getElementsByClassName("formHead")
    let buttons = document.getElementsByTagName("button");
    let hr = document.getElementsByTagName("hr")[0];
    let formBody = document.getElementsByClassName("formBody")[1];
    let formBodyInputs = document.getElementsByClassName("formBodyInput");

    changeStyle(buttons, "border", "2px solid red", '2px solid rgb(57, 51, 51)')
    changeStyle(buttons, "bg", "#121212", 'rgb(105, 94, 94)')
    changeStyle(formHead, 'borderBottom', '2px solid white', '2px solid rgb(57, 51, 51)')
    changeStyle(inputs, 'borderBottom', '2px solid #f6e9e9', '2px solid rgb(57 51 51)')
    changeStyle(allElements, 'color', 'white', 'black')
    changeStyle(forms, "bg", '#121212', '#695e5e')
    changeStyle(forms, 'border', '2px solid #121212', '2px solid rgb(57, 51, 51)')
    changeStyle(options, 'bg', '#121212', '#695e5e')

    hr.style.border = currentTheme === "dark" ? '1px solid black' : '1px solid #121212'
    body.style.backgroundColor = currentTheme === "dark" ? 'black' : '#7d7d7d'
    addButton.style.backgroundColor = currentTheme === "dark" ? '#121212' : '#695e5e'
    formBody.style.borderBottom = currentTheme === "dark" ? '2px solid white' : '2px solid rgb(57, 51, 51)'

    for(let el of buttons) {
        el.addEventListener("mouseenter", function (e) {
            el.style.color = currentTheme === "dark" ? 'red' : "white"
            el.style.border = currentTheme === "dark" ? '2px solid white' : '2px solid black'
        })
        el.addEventListener("mouseleave", function (e) {
            el.style.color = currentTheme === "dark" ? 'white' : 'black'
            el.style.border = currentTheme === "dark" ? '2px solid red' : '2px solid rgb(57, 51, 51)'
        })
    }
    for(let el of formBodyInputs) {
        el.addEventListener("mouseenter", function (e) {
            el.style.borderBottom = currentTheme === "dark" ? '2px solid red' : '2px solid white'
        })
        el.addEventListener("mouseleave", function (e) {
            el.style.borderBottom = currentTheme === "dark" ? '2px solid #f6e9e9' : '2px solid rgb(57, 51, 51)'
        })
    }
    function changeStyle(array, kind, firstColor, secondColor) {

        for (let el of array) {
            if (kind === 'bg') {
                el.style.backgroundColor = currentTheme === "dark" ? firstColor : secondColor
            }
            if (kind === 'color') {
                el.style.color = currentTheme === "dark" ? firstColor : secondColor
            }
            if (kind === 'border') {
                el.style.border = currentTheme === "dark" ? firstColor : secondColor
            }
            if (kind === 'borderBottom') {
                el.style.borderBottom = currentTheme === "dark" ? firstColor : secondColor
            }
        }
    }
}