import { useCallback,useState } from 'react';

export default function useFormState() {
    const [success, setSuccessState] = useState(false);
    const [error, setErrorState] = useState(false);
    const [isSubmitting, setIsSubmittingState] = useState(false);

    const setSuccess = useCallback(value => {
        setSuccessState(value);
    }, []);
    const setError = useCallback(value => {
        setErrorState(value);
    }, []);

    const setIsSubmitting = useCallback(value => {
        setIsSubmittingState(value);
    }, []);



    return {
        success,
        error,
        isSubmitting,
        setSuccess,
        setError,
        setIsSubmitting
    };
}