import React, {useCallback, useState} from 'react';
import {DEFAULT_Y_AXIS_KEY, LineChart} from "@mui/x-charts";
import {Box, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import dateMonthFormatter, {dateYearFormatter, dateYearsFormatter} from "../../utils/formatters.js";
import ChartReplacement from "./ChartReplacement.jsx";


function TimespanButton({timespan, setTimespan, label, value}) {
    return (
        <Button
            size="small"
            sx={{
                borderColor:'#3b3b3f',
                color: '#3b3b3f',
                "&:hover": {
                    backgroundColor: 'rgba(59,59,63,0.58)',
                    borderColor: 'inherit'
                }
            }}
            onClick={() => setTimespan(value)}
            variant={timespan === value ? 'outlined' : 'text'}
        >
            {label}
        </Button>
    )
}

function CustomLineChart({data = [], dataKey, label}) {
    const [timespan, setTimespan] = useState('month');
    const changeTimespan = useCallback((value) => {
        setTimespan(value);
    }, []);
    const currentDate = timespan === 'month' ? new Date().getMonth() : new Date().getFullYear();
    const filteredData = data.length > 0 ? data.filter(entry => {
        const entryDate = timespan === 'month' ? new Date(entry.date).getMonth() : new Date(entry.date).getFullYear();
        return timespan === 'all' || entryDate === currentDate;
    }) : [];
    const charData = filteredData.length > 0 ? Object.values(filteredData) : [];
    const charDateData = charData.length > 0 ? charData.map(weightEntry => new Date(weightEntry.date)) : [];

    return (<Box sx={{
            height: '100%',
            position: 'relative',
        }}>
            <Stack direction="row" alignItems="center" spacing={1} position='absolute' right={0} zIndex={1}>

                <TimespanButton label='Month' timespan={timespan} setTimespan={changeTimespan} value='month'/>
                <TimespanButton label='Year' timespan={timespan} setTimespan={changeTimespan} value='year'/>
                <TimespanButton label='All' timespan={timespan} setTimespan={changeTimespan} value='all'/>
            </Stack>
            {filteredData.length > 1 ? (
            <LineChart
                xAxis={[{
                    data: charDateData,
                    scaleType: 'time',
                    valueFormatter: timespan === 'month' ? dateMonthFormatter : timespan === 'year' ? dateYearFormatter : dateYearsFormatter,
                    // tickMinStep: 1000 * 3600 * 24,
                    // tickMaxStep: 1000 * 3600 * 24,
                    tickLabelStyle: {
                        angle: 90,
                        textAnchor: 'start',
                    },
                    id: 'dateAxis',

                }
                ]}
                bottomAxis={{
                    disableLine: true,
                    disableTicks: true,
                    axisId: 'dateAxis',
                }}
                leftAxis={{
                    axisId: DEFAULT_Y_AXIS_KEY,
                    disableLine: true,
                    disableTicks: true,
                    position: 'left'

                }}
                dataset={charData}
                series={[
                    {
                        dataKey: dataKey,
                        curve: 'linear',
                        color: '#3b3b3f',
                        label: label,
                        yAxisKey: DEFAULT_Y_AXIS_KEY,
                        xAxisKey: 'dateAxis',
                    },
                ]}
                slotProps={{
                    legend: {
                        hidden: true,
                    }
                }}
                axisHighlight={{
                    x: 'band',
                }}

                sx={{
                    //
                    '.MuiLineElement-series-weightId': {
                        strokeDasharray: '5 5',
                    },

                    '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
                        fill: '#fff',
                    },
                    '& .MuiMarkElement-highlighted': {
                        stroke: 'dashed',
                    },
                }}
                margin={{
                    bottom: 70,
                }}
            />
            ) : (
               <ChartReplacement text={`Not enough data ${timespan !== 'all' ? `for this ${timespan}` : ''} (minimum 2 entries)`}/>
            )

            }
        </Box>

    );
}

export default CustomLineChart;