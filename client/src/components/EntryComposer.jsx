import React, {useState} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

function EntryComposer({setRefresh, apiPath, payloadParam, setChange, label, buttonText, method='post'}) {
    const axiosPrivate = useAxiosPrivate();
    const [value, setValue] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault()
        let ignore = false;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate[method](apiPath,
                JSON.stringify({
                    [payloadParam]: value,
                }),
                {signal: controller.signal})

        } catch (e) {
            console.log(e);
        }
        if (setRefresh) setRefresh(v => !v);
        setChange(v => !v);

    }

    return (
        <div className='add-entry'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="entry">{label}</label>
                <input
                    type="number"
                    id='entry'
                    placeholder='10'
                    value={value}
                    onChange={e => setValue(Number(e.target.value))}
                />
                <button>{buttonText}</button>
            </form>
        </div>
    );
}

export default EntryComposer;