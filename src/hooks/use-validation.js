import { useState } from "react";

function useValidation(initialValues) {
    const [errors, setErrors] = useState(initialValues);

    function handleValidation(e) {
        const { id, value } = e.target;

        let error = false;

        switch (id) 
        {
            case "email":
                if (value === null || value === "")
                {
                    error = true;
                }
                else
                {
                    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/;
                    if (emailRegex.test(value))
                    {
                        error = false;
                    }
                    else
                    {
                        error = true;
                    }
                }
                break;
            case "password":
                if (value === null || value === "")
                {
                    error = true;
                }
                else
                {
                    let flag = false;

                    for (let i = 0; i < value.length; i++)
                    {
                        if (!isNaN(+value[i]))
                        {
                            flag = true;
                            break;
                        }
                    }

                    if (flag)
                    {

                        error = false
                    }
                    else
                    {
                        error = true;
                    }
                }
                break;
            default:
                break;
        }

        console.log("Имя:", id, "Значение:", value, "Значение ошибки:", error, "Тип данных:", typeof value);

        setErrors({
            ...errors,
            [id]: error
        });
    }

    return [errors, handleValidation];
}

export default useValidation;