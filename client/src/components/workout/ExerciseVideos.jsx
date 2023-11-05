import React, {useEffect, useState} from 'react';
import {Box, Grid, Link, Tooltip, Typography} from "@mui/material";
import {fetchRapidAPIData, ytSearchOptions} from "../../api/fetchRapidAPI.js";
import Button from "@mui/material/Button";

function ExerciseVideos({name, target}) {
    const [videos, setVideos] = useState([]);
    console.log(name)
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const ytSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

        const fetchVideosData = async () => {
            try {
                const response = await fetchRapidAPIData(
                    `${ytSearchUrl}/search?query=${name} ${target} exercise technique&type=v&sort=v`,
                    ytSearchOptions);
                if (!ignore) {
                    setVideos(response.data.contents);
                }
            } catch (e) {
                console.log(e);
                setVideos([]);
            }
            finally {
            }
        }
        fetchVideosData();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, []);


    return (
        <Grid container gap={3} justifyContent='center'>
            {videos.length > 0 ? videos.slice(0, 6).map((item, index) => (
                <Grid item key={index}
                sx={{
                    maxWidth: '300px'
                }}>
                    <Box key={index} sx={{width: '300px'}}>
                        <Link
                            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                            target='_blank'
                            rel='noreferrer'
                            sx={{p: 0}}
                        >
                        <Box
                            component='img'
                            sx={{width: '100%', height: '100%'}}
                            src={item.video.thumbnails[0].url}
                        />
                        </Link>
                        <Tooltip title={item.video.title}>
                            <Typography fontWeight='500' fontSize='0.9rem'>
                                {`${item.video.title.slice(0, 40)}${item.video.title.length > 40 ? '...' : ''}`}
                            </Typography>
                        </Tooltip>
                    </Box>
                </Grid>
            )) : <Typography>No data</Typography>}

        </Grid>
    );
}

export default ExerciseVideos;