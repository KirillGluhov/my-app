import Header from './Header';
import {PageName} from "../const/const-pagesnames";

function Users(props)
{
    return (
        <>
            <Header type="authorized" page={PageName.USERS}/>
        </>
    );
}

export default Users;