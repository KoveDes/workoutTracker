import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import {default as ClockIcon} from '@mui/icons-material/WatchLater';
import {default as ArrowDownOnSquareIcon} from '@mui/icons-material/FileDownload';
export const WorkoutRoutineCard = ({workoutRoutine}) => {

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRadius: '20px',
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 1,
                    }}
                >
                    <Avatar
                       // {/*src={company.logo}*/}
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Flexed%20Biceps%20Light%20Skin%20Tone.png"
                        variant="square"
                    />
                </Box>
                <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                >
                    {workoutRoutine?.name}
                </Typography>
                <Typography
                    align="center"
                    variant="body1"
                >
                    {workoutRoutine?.note}
                </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }} />
            <Divider sx={{borderColor: 'rgb(242, 244, 247)'}} />
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{ p: 2 }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                >
                    <SvgIcon
                        color="action"
                        fontSize="small"
                    >
                        <ClockIcon />
                    </SvgIcon>
                    <Typography
                        color="text.secondary"
                        display="inline"
                        variant="body2"
                    >
                        {/*{workoutRoutine.days}*/}
                        MONDAY TUESDAY WEDNESDAY
                    </Typography>
                </Stack>
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                >
                    <Typography
                        color="text.secondary"
                        display="inline"
                        variant="body2"
                    >
                        Performed: {workoutRoutine?.performed}
                        {/*{company.downloads} Finished*/}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
};
