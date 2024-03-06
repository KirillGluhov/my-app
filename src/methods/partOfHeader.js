import {Styles} from "../const/const-styles";
import { PageName } from "../const/const-pagesnames";
import { Nav } from "react-bootstrap";
import logoutUser from "../functions/logoutUser";

function partOfHeader(page, currentPage, isScreenSm, isScreenMd, isAdmin)
{
    const handleClick = () => {
        logoutUser();
      };

    if (isAdmin && page === PageName.EXIT)
    {
        return (
            isScreenMd ?
            <Nav.Link className={Styles.WITHOUTSTICK} onClick={handleClick}>{page.Rus.toUpperCase()}</Nav.Link> : 
            <Nav.Link className={Styles.WITHOUTSTICK} onClick={handleClick}>{page.Rus.toUpperCase()}</Nav.Link>
        );
    }
    if (page === PageName.PROFILE || page === PageName.LOGIN)
    {
        return smallCase(page, (currentPage === page), !(page === PageName.PROFILE || page === PageName.LOGIN));
    }
    else if (page === PageName.EXIT)
    {
        return (
            isScreenMd ?
            <Nav.Link className={Styles.WITHSTICK} onClick={handleClick}>{page.Rus.toUpperCase()}</Nav.Link> : 
            <Nav.Link className={Styles.WITHOUTSTICK} onClick={handleClick}>{page.Rus.toUpperCase()}</Nav.Link>
        );
    }
    else
    {
        return smallCase(page, (currentPage === page), !(page === PageName.PROFILE || page === PageName.LOGIN) && isScreenMd);
    }
}

function smallCase (page, disabled, withstick)
{
    if (disabled)
    {
        return <Nav.Link href={page.Eng.toString().toLowerCase()} className={withstick ? Styles.WITHSTICK : Styles.WITHOUTSTICK} disabled>{page.Rus.toUpperCase()}</Nav.Link>;
    }
    else
    {
        return <Nav.Link href={page.Eng.toString().toLowerCase()} className={withstick ? Styles.WITHSTICK : Styles.WITHOUTSTICK}>{page.Rus.toUpperCase()}</Nav.Link>;
    }
}

export default partOfHeader;