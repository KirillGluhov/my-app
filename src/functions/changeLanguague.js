
export function changeTime(timeSlot)
{
    switch (timeSlot) {
        case "S8E10":
            return "8:45 - 10:20";
        case "S10E12":
            return "10:35 - 12:10";
        case "S12E14":
            return "12:25 - 14:00";
        case "S14E16":
            return "14:45 - 16:20";
        case "S16E18":
            return "16:35 - 18:10";
        case "S18E20":
            return "18:25 - 20:00";
        case "S20E21":
            return "20:15 - 21:50";
        default:
            return "";
    }

}

export function changeRole(role)
{
    switch (role) {
        case "Student":
            return "Студент";
        case "Teacher":
            return "Преподаватель";
        case "Principal":
            return "Деканат";
        case "Admin":
            return "Администратор";
        default:
            return "";
    }
}

export function changeDate(date)
{
    return date.replace(/-/g, ".");
}

export function changeStatus(status)
{
    switch (status) {
        case "Approved":
            return {Rus: "Одобрено", Eng: "Approved"};
        case "InProcess":
            return {Rus: "В процессе", Eng: "InProcess"};
        case "Declined":
            return {Rus: "Отклонено", Eng: "Declined"};
        default:
            return "";
    }
}