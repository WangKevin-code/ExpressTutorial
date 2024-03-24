export const createUserValidationSchema = {
    name: {
        isLength: {
            errorMessage: "Length Error",
            options: {
                min: 3,
                max: 5
            }
        },
        notEmpty: {
            errorMessage: "not Empty"
        },
        isString: {
            errorMessage: "must String"
        },
    },
    age: {
        notEmpty: {
            errorMessage: "not Empty"
        },
        isNumeric: {
            errorMessage: "must Number"
        }
    }
}