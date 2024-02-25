import { useState } from "react";

function useInput(initialValues) {
    const [values, setValues] = useState(initialValues);

    function handleChange(e) {
        const { id, value } = e.target;
        setValues({
            ...values,
            [id]: value
        });
        console.log('Имя:', id, "Значение:", value);
    }

    return [values, handleChange];
}

export default useInput;