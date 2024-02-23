import {Styles} from "../const/const-styles";
import { PageName } from "../const/const-pagesnames";
import { Nav } from "react-bootstrap";

function partOfHeader(page, currentPage, isScreenSm, isScreenMd)
{
    if (page === PageName.PROFILE)
    {
        return smallCase(page, (currentPage === page), !(page === PageName.PROFILE));
    }
    else
    {
        return smallCase(page, (currentPage === page), !(page === PageName.PROFILE) && isScreenMd);
    }
}

function smallCase (page, disabled, withstick)
{
    if (disabled)
    {
        if (withstick)
        {
            return <Nav.Link href={page.Eng.toString().toLowerCase()} className={Styles.WITHSTICK} disabled>{page.Rus.toUpperCase()}</Nav.Link>;
        }
        else
        {
            return <Nav.Link href={page.Eng.toString().toLowerCase()} className={Styles.WITHOUTSTICK} disabled>{page.Rus.toUpperCase()}</Nav.Link>;
        }
    }
    else
    {
        if (withstick)
        {
            return <Nav.Link href={page.Eng.toString().toLowerCase()} className={Styles.WITHSTICK}>{page.Rus.toUpperCase()}</Nav.Link>;
        }
        else
        {
            return <Nav.Link href={page.Eng.toString().toLowerCase()} className={Styles.WITHOUTSTICK}>{page.Rus.toUpperCase()}</Nav.Link>;
        }
    }
}

export default partOfHeader;