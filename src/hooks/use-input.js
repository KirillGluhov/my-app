import { useState } from "react";

function useInput(initialValues) {
    const [values, setValues] = useState(initialValues);

    function handleChange(e) {
        const { id, value, type, options, selectedIndex } = e.target;
        const newValue = type === "select-multiple"
            ? Array.from(options).filter(option => option.selected).map(option => option.value)
            : value;

        setValues({
            ...values,
            [id]: newValue
        });
        console.log('Имя:', id, "Значение:", newValue);
    }

    return [values, handleChange];
}

export default useInput;