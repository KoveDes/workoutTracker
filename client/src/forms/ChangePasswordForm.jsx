import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {Form, Formik} from "formik";
import passwordSchema from "../schemas/passwordSchema.js";
import {Box} from "@mui/material";
import {PasswordInput} from "../components/CustomInputs.jsx";

export default function ChangePasswordForm({setError, setIsSubmitting, setSuccess}) {
    const axiosPrivate = useAxiosPrivate();
    const handleSubmit = async (values) => {
        setError('');
        setSuccess(false);
        setIsSubmitting(true);
        try {
            const response = await axiosPrivate.patch('/user/auth', {
                password: values.password,
            })
            setSuccess(response.data.message);

        } catch (e) {
            setError(e.message);
        } finally {
            setIsSubmitting(false);

        }
    }

    return (
        <Formik
            initialValues={{
                password: '',
                matchPassword: ''
            }}
            validationSchema={passwordSchema}
            onSubmit={handleSubmit}
        >
                <Form id='pwdForm'>
                    <Box>
                        <PasswordInput
                            label='Password'
                            name='password'
                            placeholder='password'
                        />
                    </Box>
                    <Box>
                        <PasswordInput
                            label='Confirm password'
                            name='matchPassword'
                            placeholder='password'
                        />
                    </Box>
                </Form>
        </Formik>
    )
}