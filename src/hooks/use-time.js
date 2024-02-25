import { useState } from "react";

const useTime = (initialValues) => {

    const [selectedTime, setSelectedTime] = useState(initialValues);

    const handleTimeChange = (eventKey, event) => {
        setSelectedTime(event.target.textContent);
        console.log('Выбранное время:', event.target.textContent);
    };

    return [selectedTime, handleTimeChange]

};

export default useTime;