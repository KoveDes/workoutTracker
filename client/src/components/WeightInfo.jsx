import React, {useEffect, useState} from 'react';
import useAuth from "../hooks/useAuth.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import EntryItem from "./EntryItem.jsx";
import EntryComposer from "./EntryComposer.jsx";

function WeightInfo(props) {
    const [data, setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const [change, setChange] = useState(false);
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getWeightHistory = async () => {
            try {
                const response = await axiosPrivate.get(`/user/weight/all?user=${auth.user}`, {
                    signal: controller.signal
                })
                if (!ignore) {
                    setData(response.data);
                    console.log(response.data)
                }
            } catch (e) {
                console.log(e);
            }
        }
        getWeightHistory();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [change])

    return (
        <>
            <h2>Weight</h2>
            <div className="entries">
                <h3>Weight History</h3>
                <EntryComposer
                    payloadParam='weight'
                    apiPath={`/user`}
                    setChange={setChange}
                    label='New weight (kg)'
                    buttonText='Set weight'
                    method='patch'
                />
                {data.map(entry => (
                    <EntryItem
                        key={entry._id}
                        data={entry}
                        setChange={setChange}
                        label='Weight:'
                        payloadParam='weight'
                        apiPath='/user/weight'
                        dataValue={entry.weight}
                    />
                ))}
            </div>
        </>
    );
}

export default WeightInfo;