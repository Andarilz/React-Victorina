export function  CreateControl(config, validation){
    return {
        ...config,
        validation,
        valid: !validation, //изначальное состояние
        touched: false,
        value: ''
    }
}

export function Validate(value, validation = null){
    if(!validation){
       return true
    }
    let isValid = true

    if(validation.required){
        isValid = value.trim() !== '' && isValid
    }

    return isValid
}

export function ValidateForm(formControls){
    let isFormValid = true

    for (let control in formControls) {
        if(formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid
}

//забираем значения и проверяем форму на валидность