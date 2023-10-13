import * as Yup from "yup";

const loginSchema = Yup.object({
        login: Yup.string().trim()
            .required('Required')
            .min(4, 'Login should be have least 4 characters'),
        password: Yup.string().trim()
    })
export default loginSchema