export class ErrorsUtility {


    getError(nameControl: any) {
        var validation = {
            valid: true,
            msg: ""
        };

      

        if (nameControl.errors != null) {

            if (nameControl.errors.pattern) {
                validation.valid = false;
                validation.msg = 'Debes ingresar solo letras';
                return validation;
            }

            else if (nameControl.errors.email) {
                validation.valid = false;
                validation.msg = 'Debes ingresar un correo valido';
                return validation;

            }

            else if (nameControl.errors.max) {
                validation.valid = false;
                validation.msg = 'Debe ingresar un numero de celular valido';
                return validation;
            }

            else if (nameControl.errors.required) {
                validation.valid = false;
                validation.msg = 'Debes ingresar un valor';
                return validation;
            }


        } else if (nameControl.value == "" || nameControl.value == false) {
            validation.valid = false;
            validation.msg = 'Debes aceptar Tratamiento de Datos Personales';
            return validation;

        }



        return validation;
    }

    getErrorOnlyLetters(nameControl: any) {

        var validation = {
            valid: true,
            msg: ""
        };

        if (nameControl.hasError('pattern')) {
            validation.valid = false;
            validation.msg = 'Debes ingresar solo Letras';
            return validation;
        }
        return validation;

    }

}
