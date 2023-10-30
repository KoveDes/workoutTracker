import * as Yup from 'yup';

const customValidation = (message) => {
    return Yup.string().test('is-in-active-muscles', message, function (value) {
        const activeMuscles = this.resolve(Yup.ref('activeMuscles'));
            return  value && activeMuscles.includes(value) ;
    });
};

export default Yup.object({
    name: Yup.string().required('Required').min(4, 'Name should contain at least 4 characters'),
    url: Yup.string().required("Required").url('Enter proper URL'),
    activeMuscles: Yup.array().required('Required').min(1, 'Choose at least 1 muscle'),
    equipment: Yup.string().required('Required'),
    primaryMuscle: customValidation('Required')
})