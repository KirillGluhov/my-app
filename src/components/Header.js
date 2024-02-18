import React from "react";
import {Button, Stack, Grid, ButtonGroup} from '@mui/joy';
import { LogoApp } from "./LogoApp";


export class Header extends React.Component
{
    render()
    {
        return (
        <Stack alignItems="center" backgroundColor={this.props.mainColor}>
            <Grid container sx={{ width: 4/5 }} my={1}>
                <Grid container alignItems="center" xs={parseInt(this.props.proportion.split("/")[0])}>
                    <Grid item>
                        <LogoApp color={this.props.secondColor}/>
                    </Grid>
                    <Grid item>
                        <ButtonGroup variant={this.props.styleOfElement} sx={{ '--ButtonGroup-separatorColor': `${this.props.secondColor} !important` }}>
                            <Button style={{ color: this.props.secondColor }}>TSU.INLOCK</Button>
                            <Button style={{ color: this.props.secondColor }}>КЛЮЧИ</Button>
                            <Button style={{ color: this.props.secondColor }}>ПОЛЬЗОВАТЕЛИ</Button>
                            <Button style={{ color: this.props.secondColor }}>ЗАПРОСЫ</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" xs={parseInt(this.props.proportion.split("/")[1])}>
                    <Grid item>
                        <ButtonGroup variant={this.props.styleOfElement}>
                            <Button style={{color: this.props.secondColor}}>ПРОФИЛЬ</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
        );
    }
}