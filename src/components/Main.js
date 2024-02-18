import React from "react";
import {Grid, Typography, Card, CardContent, Button, Box, Input, Select, Option} from '@mui/joy';
import {Yes} from "./Yes"
import {No} from "./No"
import { LogoSearch } from "./LogoSearch";

export class Main extends React.Component
{
    render()
    {
        return (
        <Grid container justifyContent="center">
            <Grid sx={{backgroundColor: this.props.mainColor}} mt={parseInt(this.props.top)}>
                <Box m={parseInt(this.props.bot)}>
                    <Grid container mb={parseInt(this.props.bot)}>
                        <Grid xs={4} container justifyContent="center" alignItems="center">
                            <Typography>
                                Список заявок
                            </Typography>
                        </Grid>
                        <Grid xs={4} container justifyContent="center">
                            <Input startDecorator={<LogoSearch color={this.props.secondColor}/>}></Input>
                        </Grid>
                        <Grid xs={4} container justifyContent="center">
                            <Select placeholder="Роль">
                                <Option value="student">Студент</Option>
                                <Option value="teacher">Преподаватель</Option>
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid xs={2} container justifyContent="center">
                            <Select placeholder="Корп.">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                            </Select>
                        </Grid>
                        <Grid xs={2} container justifyContent="center">
                            <Select placeholder="Ауд.">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                            </Select>
                        </Grid>
                        <Grid xs={2} container justifyContent="center">
                            <Select placeholder="Статус">
                                <Option value="dec">В деканате</Option>
                                <Option value="user">У пользователя</Option>
                            </Select>
                        </Grid>
                        <Grid xs={3} container justifyContent="center">
                            <Input type="date" startDecorator={<Typography>От</Typography>}></Input>
                        </Grid>
                        <Grid xs={3} container justifyContent="center">
                            <Input type="date" startDecorator={<Typography>До</Typography>}></Input>
                        </Grid>
                    </Grid>
                </Box>
                <Box m={parseInt(this.props.bot)}>
                    <Card>
                        <CardContent orientation="horizontal" sx={{justifyContent: "space-between", alignItems: "center"}}>
                            <Typography>Жмышенко Абоба Бебрович</Typography>
                            <Typography>Студент</Typography>
                            <Typography>12.12.2012</Typography>
                            <Button variant="plain"><Yes color="green"/></Button>
                        </CardContent>
                        <CardContent orientation="horizontal" sx={{justifyContent: "space-between", alignItems: "center"}}>
                            <Typography>Корпус 3</Typography>
                            <Typography>Аудитория 1</Typography>
                            <Typography>В деканате</Typography>
                            <Typography>5 пара</Typography>
                            <Button variant="plain"><No color="red"/></Button>
                        </CardContent>
                    </Card>
                </Box>
                <Box m={parseInt(this.props.bot)}>
                    <Card>
                        <CardContent orientation="horizontal" sx={{justifyContent: "space-between", alignItems: "center"}}>
                            <Typography>Жмышенко Абоба Бебрович</Typography>
                            <Typography>Преподаватель</Typography>
                            <Typography>23.08.2024</Typography>
                            <Button variant="plain"><Yes color="green"/></Button>
                        </CardContent>
                        <CardContent orientation="horizontal" sx={{justifyContent: "space-between", alignItems: "center"}}>
                            <Typography>Корпус 6</Typography>
                            <Typography>Аудитория 23</Typography>
                            <Typography>У Жмышенко Василия Петровича</Typography>
                            <Typography>6 пара</Typography>
                            <Button variant="plain"><No color="red"/></Button>
                        </CardContent>
                    </Card>
                </Box>
                <Box m={parseInt(this.props.bot)}>
                    <Card>
                        <CardContent orientation="horizontal" sx={{justifyContent: "space-between", alignItems: "center"}}>
                            <Typography>Жмышенко Абоба Бебрович</Typography>
                            <Typography>Преподаватель</Typography>
                            <Typography>23.08.2024</Typography>
                            <Button variant="plain"><Yes color="green"/></Button>
                        </CardContent>
                        <CardContent orientation="horizontal" sx={{justifyContent: "space-between", alignItems: "center"}}>
                            <Typography>Корпус 6</Typography>
                            <Typography>Аудитория 23</Typography>
                            <Typography>У Жмышенко Василия Петровича</Typography>
                            <Typography>6 пара</Typography>
                            <Button variant="plain"><No color="red"/></Button>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Grid>
        );
    }

}