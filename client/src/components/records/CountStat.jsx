import React from 'react';
import {Avatar, Card, CardContent, Stack, Typography} from "@mui/material";
import TrophyImg from '../../assets/Trophy.png';
function CountStat({value, label }) {

        return (
            <Card sx={{
                backgroundColor: 'gold',
                boxShadow: 'none',
                // boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 22px, rgba(0, 0, 0, 0.01) 0px 0px 0px 0.5px",
                width: '300px',
            }}>
                <CardContent>
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Stack spacing={1}>
                            <Typography
                                fontWeight='bold'
                                sx={{color: 'azure'}}
                                fontSize='1rem'
                            >
                                {label}
                            </Typography>
                            <Typography variant="h4">
                                {value}
                            </Typography>
                        </Stack>
                        <Avatar
                            sx={{
                                height: '100%',
                                width: '30%',
                            }}
                            src={TrophyImg}
                        />

                    </Stack>

                </CardContent>
            </Card>
        );
}

export default CountStat;