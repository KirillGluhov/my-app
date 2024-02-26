import Header from './Header';
import {PageName} from "../const/const-pagesnames"

function Profile(props)
{
    return (
        <>
            <Header type="authorized" page={PageName.PROFILE}/>
        </>
    );
}

export default Profile;