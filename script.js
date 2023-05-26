// l'id del form da prelevare
const formId = "my-form";

// dichiariamo i nomi per le classi css che usiamo, cosi se cambiano le modifichiamo solo qui
const messageClass = "message";
const invalidMessageClass = "invalid-message";
const validMessageClass = "valid-message";

// il prefisso per l'id del container del messaggio di errore
const messageContainerPrefix = "p-";

/* true messaggi di errore basati su HTML5 form validation
   false i messaggi stampati sono quelli da noi dichiarati */
const defaultMessagesText = false;
/* true mostriamo un messaggio anche per gli input validi
   false non mostriamo alcun messaggio in caso di input positivo*/
const showValidMessage = true;
// dichiariamo le costanti per i messaggi di errore personalizzati
const badInputMessage = "Bad Input";
const valueMissingMessage = "Value missing";
const typeMismatchMessage = "Type mismatch";
const patternMismatchMessage = "Pattern mismatch";
const tooLongMessage = "Too long";
const tooShortMessage = "Too short";
const rangerUnderFlowMessage = "Range under flow";
const rangeOverFlowMessage = "Range over flow";
// messaggio da mostrare per gli input validi
let validInputMessage = "Valid input";
if (defaultMessagesText === true && showValidMessage === true) {
    validInputMessage = "Input valido.";
};

// preleviamo i dati dagli input del form
// const formData = getFormData(form);
const validationAttributesArray = [
    "required",
    "minlength",
    "maxlength",
    "min",
    "max",
    "type",
    "pattern"
];
const inputsAttributes = document.getElementById("name").attributes;
console.log("inputsAttributes", inputsAttributes);
class Input {
    constructor(required, minlength, maxlength, min, max, type, pattern) {
      this.required = required;
      this.minlength = minlength;
      this.maxlength = maxlength;
      this.min = min;
      this.max = max;
      this.type = type;
      this.pattern = pattern;
    };
};

const newInput = new Input(...inputsAttributes);
console.log("newInput", newInput);
// const attribute = testInput.getAttribute("required");
// console.log("attribute", attribute);


function handleFormSubmission() {
    // togliamo i messaggi precedenti se ce ne sono
    clearMessages();
    // preleviamo il form
    const form = getForm(formId);
    // preleviamo gli elementi del form
    const formElements = getFormElements(form);
    // convertiamo la collection degli elementi del form in un array ciclabile
    const formElementsArray = convertFormElementsCollectionToArray(formElements);
    // creiamo un array di oggetti contenenti le informazioni per stampare i messaggi di errore
    const validationObjectArray = checkInputsValidity(formElementsArray);


    // let validationObjectArray = [];
    // formElementsArray.forEach(input => validationObjectArray.push(returnValidationObject(input)));
    validationObjectArray.forEach(validationObject => {
        const inputId = validationObject.inputId;
        let validationMessage = validationObject.validationMessage;
        const valid = validationObject.valid;

        if (valid === true && showValidMessage === true) {
            validationMessage = validInputMessage;
        };

        printValidationMessage(inputId, validationMessage);
        addCssClasses(valid, inputId);
    });
};

function getForm(formId) {
    const form = document.getElementById(formId);
    return form;
}

function getFormElements(form) {
    const formElements = form.elements;
    return formElements;
};

function convertFormElementsCollectionToArray(formElements) {
    const formElementsArray = [...formElements];
    return formElementsArray;
};

function checkInputsValidity(formElementsArray) {
    let validationObjectArray = [];
    formElementsArray.forEach(input => {
        const validationObject = returnValidationObject(input);
        validationObjectArray.push(validationObject);
    });
    return validationObjectArray;
};

function returnValidationObject(input) {
    let validationObject = {
        inputId: input.id,
        valid: input.validity.valid,
        validationMessage: input.validationMessage
    };
    if (defaultMessagesText === false) {
        const validityState = input.validity;

        switch(true) {
            case validityState.badInput:
                input.setCustomValidity(badInputMessage);
                break;
            case validityState.valueMissing:
                input.setCustomValidity(valueMissingMessage);
                break;
            case validityState.typeMismatch:
                input.setCustomValidity(typeMismatchMessage);
                break;
            case validityState.patternMismatch:
                input.setCustomValidity(patternMismatchMessage);
                break;
            case validityState.tooLong:
                input.setCustomValidity(tooLongMessage);
                break;
            case validityState.tooShort:
                input.setCustomValidity(tooShortMessage);
                break;
            case validityState.rangeUnderflow:
                input.setCustomValidity(rangeUnderflow);
                break;
            case validityState.rangeOverflow:
                input.setCustomValidity(rangeOverFlowMessage);
                break;
            default:
                input.setCustomValidity("");
        };
        validationObject.validationMessage = input.validationMessage;
    };
    return validationObject;
};

function printValidationMessage(inputId, validationMessage) {
    const input = document.getElementById(inputId);
    const fatherElement = input.parentElement;
    const p = document.createElement("p");
    p.textContent = validationMessage;
    p.setAttribute("id", `${messageContainerPrefix}${inputId}`); 

    fatherElement.appendChild(p);
};

function clearMessages() {
    const allMessages = document.querySelectorAll(`.${messageClass}`);
    allMessages.forEach(message => {
        message.remove();
    });
};

function addCssClasses(valid, inputId) {
    const pId = `${messageContainerPrefix}${inputId}`;
    const p = document.getElementById(pId);
    if (valid === true && showValidMessage === true) {
        p.classList.add(messageClass);
        p.classList.add(validMessageClass);
    } else if (valid === false) {
        p.classList.add(messageClass);
        p.classList.add(invalidMessageClass);
    };
};

function getFormData(form) {
    const formData = new FormData(form);
    return formData;
};

// function printFormData(formData) {
//     ulId = "form-output";
//     const ul = document.getElementById(ulId);

//     formData.forEach((value, key) => {
//         const li = document.createElement("li");
//         li.textContent = `${key}: ${value}`;
//         ul.appendChild(li);
//     });
// };