import { FC } from 'react';
import { Formik, Form, Field } from 'formik'
import { userSchema } from '../../utils/yup';
import { RegisterType } from '../../types/types';
import { useRegister } from '../../hooks/useRegister';
import { useAppDispatch } from '../../hooks/useTypedSelector';
import { postRegister } from '../../services/authFetch';
import './auth.css';
import { Link } from 'react-router-dom';

const { IMG_URL } = process.env;

export const Register: FC = () => {
    const dispatch = useAppDispatch();
    useRegister()

    const initialValues: RegisterType = {
        username: "",
        email: "",
        password: ""
    };

    return (
        <div className='auth '>
            <div
                className='div-img div-img-register'
                style={{
                    backgroundImage: `url(${IMG_URL}/v1673877018/shoes-ecommerce/auth-images/register-image_gg4yag.webp)`
                }}
            />
            <div className='form-container '>
                <Formik
                    initialValues={initialValues}
                    validationSchema={userSchema}
                    onSubmit={(values, { resetForm }) => {
                        dispatch(postRegister(values));
                        resetForm();
                    }}
                >
                    {
                        ({ errors, touched }) => (
                            <Form className='form-register'>
                                <div className='inputs-container'>
                                    {errors.username && touched.username && <span className='primaryColor'>{errors.username}</span>}
                                    <Field name="username" className={errors.username && touched.username && 'campo-obligatorio'} spellCheck="false" /><br />
                                    <label htmlFor='username' className='label'>Nombre de usuario</label>
                                </div>
                                <div className='inputs-container'>
                                    {errors.email && touched.email && <span className='primaryColor'>{errors.email}</span>}
                                    <Field name="email" className={errors.email && touched.email && 'campo-obligatorio'} spellCheck="false" /><br />
                                    <label htmlFor='email' className='label'>Email</label>
                                </div>
                                <div className='inputs-container'>
                                    {errors.password && touched.password && <span className='primaryColor'>{errors.password}</span>}
                                    <Field name="password" className={errors.password && touched.password && 'campo-obligatorio'} type="password" spellCheck="false" /><br />
                                    <label htmlFor='password' className='label'>Password</label>
                                </div>
                                <div>
                                    <button type='submit' className='button clickActive'>Registrarse</button>
                                    <Link to="/login">Iniciar sesión</Link>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}