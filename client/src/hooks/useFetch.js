import {useEffect, useState} from "react";
import useAxiosPrivate from "./useAxiosPrivate.js";
import useAuth from "./useAuth.js";

export default function useFetch ({path, method,deps = [], body='', refresh}) {
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const needsUserParam = ['get', 'delete'].includes(method?.toLowerCase())
    useEffect(() => {
        setLoading(true)
        setResponse(null)
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate[method](
                    `${path}${needsUserParam && `?user=${auth.user}`}`,
                    {signal: controller.signal}
                )
                setResponse(response?.data);
                setLoading(false);
                refresh && refresh();
            }
            catch(e) {
                setResponse(null);
            }
        }
        getData();
        return () => controller.abort();

    }, [path, method, body, ...deps])

    return { response, loading }
}