import React, {useState} from 'react';
import useAuth from "../hooks/useAuth.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

function EntryItem({data, setChange, label, payloadParam, apiPath, dataValue}) {
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(dataValue);
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const handleEdit = (e) => {
        setInputValue(e.target.value);
    }
    const handleDeleteClick = async (e) => {
        let ignore = false;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.delete(`${apiPath}?id=${data._id}&user=${auth.user}`,
                {signal: controller.signal})
            if (!ignore && response.statusText === 'OK') {
                setChange(c => !c);
                console.log(response.data)
            }

        } catch (e) {
            console.log(e);
        }
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }
    const handleSaveClick = async (e) => {
        let ignore = false;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.patch(apiPath,
                JSON.stringify({
                    user: auth.user,
                    id: data._id,
                    [payloadParam]: Number.parseInt(inputValue),
                }),
                {signal: controller.signal})
            if (!ignore) {
                setChange(c => !c);
                setEditing(false);
                console.log(response.data)
            }

        } catch (e) {
            console.log(e);
        }
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }

    // const formattedDate = new Date(data.date).toLocaleDateString('en-Gb');
    const formattedDate = data.date;

    return (
        <div className='entry'>
            <label htmlFor={data._id}>
                {label}
                {editing === true ? (
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleEdit}
                    />
                ) : (
                    <span>{dataValue}</span>
                )}
            </label>
            <p>Date: {formattedDate}</p>

            <div className='buttons'>
                {editing === true ? (
                        <>
                            <div className='button save'
                                 onClick={handleSaveClick}>
                                Save
                            </div>
                            <div className='button cancel'
                                 onClick={() => {
                                     setEditing(false)
                                     setInputValue(dataValue)
                                 }}>
                                cancel
                            </div>
                        </>)
                    :
                    (
                        <>
                            <div className='button edit'
                                 onClick={() => setEditing(true)}>
                                Edit
                            </div>
                            <div className='button delete'
                                 onClick={handleDeleteClick}>
                                Delete
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
}

export default EntryItem;

