import Header from './Header';
import {PageName} from "../const/const-pagesnames"

function Keys(props)
{
    return (
        <>
            <Header type="authorized" page={PageName.KEYS}/>
        </>
    );
}

export default Keys;