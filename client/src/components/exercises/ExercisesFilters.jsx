import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import {InputAdornment, OutlinedInput, Radio, RadioGroup} from "@mui/material";
import {memo, useState} from "react";
import {useFilters} from "../../hooks/useFilters.js";

export const BODYPARTS_OPTIONS = ['Back', 'Cardio', 'Chest', 'Lower Arms', 'Lower Legs', 'Neck', 'Shoulders', 'Upper arms', 'Upper Legs', 'Waist'];
export const TARGET_MUSCLES = [
    "Abductors",
    "Abs",
    "Adductors",
    "Biceps",
    "Calves",
    "Cardiovascular system",
    "Delts",
    "Forearms",
    "Glutes",
    "Hamstrings",
    "Lats",
    "Levator scapulae",
    "Pectorals",
    "Quads",
    "Serratus anterior",
    "Spine",
    "Traps",
    "Triceps",
    "Upper back"
]
export const EQUIPMENT_OPTIONS = [
    "Assisted",
    "Band",
    "Barbell",
    "Body weight",
    "Bosu ball",
    "Cable",
    "Dumbbell",
    "Elliptical machine",
    "Ez barbell",
    "Hammer",
    "Kettlebell",
    "Leverage machine",
    "Medicine ball",
    "Olympic barbell",
    "Resistance band",
    "Roller",
    "Rope",
    "Skierg machine",
    "Sled machine",
    "Smith machine",
    "Stability ball",
    "Stationary bike",
    "Stepmill machine",
    "Tire",
    "Trap bar",
    "Upper body ergometer",
    "Weighted",
    "Wheel roller"
];

export default memo(function ExercisesFilters({setExercisesFilters}) {
    const {filters, setFilters} = useFilters();
    const [s, setS] = useState({target: '', equipment: '', search: ''});
    const handleSearch = (e) => {
        setFilters(v => ({
            ...v,
            search: e.target.value,
        }))
        setS(val => ({...val, search: e.target.value}))

    }
    const handleCheckboxChange = (e, param) => {
        let {checked: inputChecked, name: inputName} = e.target;
        console.log(inputChecked)
        if (inputChecked) {
            setS(val => ({...val, [param]: e.target.value}))
            setFilters(x => ({...x, [param]: inputName}))
        } else {
            setFilters(x => ({...x, [param]: ''}))
        }
    }
    const handleClear = () => {
        setS({target: '', equipment: '', search: ''});
        setFilters({target: '', search: '', equipment: ''});
    }

    return (
        <Box
            // height='875px'
        >

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{px: 1, py: 2}}
            >
                <Typography variant="h6" sx={{ml: 1}} >
                    Filters
                </Typography>
                <Button fontWeight='bold' sx={{ml: 1}}  onClick={handleClear}>
                    Clear all
                </Button>
            </Stack>


            <Divider/>

            {/*<Scrollbar>*/}

            {/*<Grid container>*/}
            <Stack spacing={3} sx={{p: 3}}>
                <Stack spacing={1}>
                    <Typography variant="subtitle2">Search</Typography>
                    <OutlinedInput
                        // value={filterName}
                        // onChange={onFilterName}
                        placeholder="Search user..."
                        onChange={handleSearch}
                        value={s.search}
                        startAdornment={
                            <InputAdornment position="start">
                                {/*<Iconify*/}
                                {/*    icon="eva:search-fill"*/}
                                {/*    sx={{ color: 'text.disabled', width: 20, height: 20 }}*/}
                                {/*/>*/}
                            </InputAdornment>
                        }
                    />
                    <RenderRadioInputList label={'Targeted muscles'} handleCheckboxChange={handleCheckboxChange} itemArray={TARGET_MUSCLES} param='target' s={s} />
                    <RenderRadioInputList label={'Equipment'} handleCheckboxChange={handleCheckboxChange} itemArray={EQUIPMENT_OPTIONS} param='equipment' s={s}/>
                </Stack>
            </Stack>

        </Box>
    )
})

export function RenderRadioInputList({label, handleCheckboxChange, itemArray, param, s}) {
   return( <>
        <Typography variant="subtitle2">{label}</Typography>
        <Stack spacing={1} sx={{
            maxHeight: '25vh',
            overflowY: 'scroll',
        }}>
            <RadioGroup sx={{backgroundColor: '#e3e3e3'}}
            value={s[param]}
            >
                {itemArray.map((item) => (
                    <FormControlLabel
                        onChange={e => handleCheckboxChange(e, param)}
                        key={item} value={item} control={<Radio name={item}/>} label={item}/>
                ))}
            </RadioGroup>
        </Stack>
    </>)
}