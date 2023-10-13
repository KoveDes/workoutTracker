import React, {useEffect, useState} from 'react';
import {Link, Outlet, useOutletContext, useParams} from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import EntryItem from "./EntryItem.jsx";
import EntryComposer from "./EntryComposer.jsx";

function BodyPart(props) {
    const setRefresh = useOutletContext();
    const {bodyPart} = useParams();
    const [change, setChange] = useState();
    const [data,setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();


    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const getBodyPartInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/body/${bodyPart}?user=${auth.user}`, {
                    signal: controller.signal
                })
                if(!ignore) {
                    setData(response.data);
                    console.log(response.data)
                }
            }
            catch (e) {
                console.log(e);
                setData([]);
            }
        }
        getBodyPartInfo();
        return () => {
            ignore = true;
            controller.abort('useEffect');
        }
    }, [bodyPart, change])
    return (
        <div className='about-page' style={{backgroundColor: 'blanchedalmond'}}>

            <h1>Part: {bodyPart}</h1>
            <EntryComposer
                setRefresh={setRefresh}
                payloadParam='size'
                apiPath={`/body/${bodyPart}`}
                setChange={setChange}
                label='New size (cm)'
                buttonText='Set size'
            />
            <p style={{opacity: 0.5}}>History and chart about {bodyPart}</p>
            {data.map(entry => (
                <EntryItem
                    key={entry._id}
                    data={entry}
                    setChange={setChange}
                    label='Size:'
                    payloadParam='size'
                    apiPath={`/body/${bodyPart}`}
                    dataValue={entry.size}
                />

            ))}
        </div>
    );
}

export default BodyPart;