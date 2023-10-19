import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import {default as ClockIcon} from '@mui/icons-material/WatchLater';
import {default as ArrowDownOnSquareIcon} from '@mui/icons-material/FileDownload';
export const AddWorkoutRoutine = () => {
    const company = {
        title: 'elo',

    }

    return (
        <Card
            sx={{
                border: '2px dashed grey',
                boxSizing: 'border-box',
                boxShadow: 'none',
            }}
        >
            <CardContent sx={{
                fontFamily: 'Plus Jakarta Sans',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                // backgroundColor: 'grey',

                gap: 1,
                p: '30px'
            }}>
                <Box

                >
                    <Avatar
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Plus.png"
                        variant="square"
                        sx={{
                            // width: 60,
                            // height: 60,
                        }}
                    />
                </Box>
                <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                    fontFamily='inherit'
                    // fontWeight='bold'
                >
                    Add new workout routine
                </Typography>

            </CardContent>
        </Card>
    );
};
