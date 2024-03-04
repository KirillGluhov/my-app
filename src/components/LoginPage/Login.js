import { PageName } from "../../const/const-pagesnames";
import Header from "../Header";
import Forms from "./Forms";

function Login()
{
    return (
        <>
            <Header type="unauthorized" page={PageName.LOGIN}/>
            <Forms/>
        </>
    );

}

export default Login