import React from 'react';
import {Box} from "@mui/material";
import CustomInput, {CustomCheckboxList} from "../../components/CustomInputs.jsx";

function DetailsForm({success}) {
    return (
        <>
            <Box>
                <CustomInput
                    label='Name'
                    name='name'
                    placeholder='name'
                    color={success ? 'success' : null}
                />
            </Box>
            <Box>
                <CustomInput
                    label='Description'
                    name='note'
                    multiline
                    placeholder='Description...'
                    color={success ? 'success' : null}
                />
            </Box>
            <Box>
                <CustomInput
                    label='Icon URL'
                    name='icon'
                    placeholder='https://....'
                    color={success ? 'success' : null}
                />
            </Box>
            <Box>
                <CustomCheckboxList
                    wrap={false}
                    label='Days'
                    name='days'
                    itemArray={['Monday', 'Tuesday', 'Wednesday',
                        'Thursday', 'Friday', 'Saturday', 'Sunday']}


                />
            </Box>
        </>
    );
}

export default DetailsForm;