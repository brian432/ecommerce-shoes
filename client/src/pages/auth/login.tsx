import { FC } from "react";
import { Formik, Form, Field } from 'formik';
import { Link } from "react-router-dom";
import { LoginType } from "../../types/types";
import { loginSchema } from "../../utils/yup";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { postLogin } from "../../services/authFetch";
import { useLogin } from '../../hooks/useLogin';

const { IMG_URL } = process.env;

export const Login: FC = () => {
    const dispatch = useAppDispatch();
    useLogin();

    const initialValues: LoginType = {
        username: "",
        password: ""
    };

    return (
        <div className="auth ">
            <div className='form-container '>
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={(values, { resetForm }) => {
                        dispatch(postLogin(values));
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
                                    {errors.password && touched.password && <span className='primaryColor'>{errors.password}</span>}
                                    <Field name="password" className={errors.password && touched.password && 'campo-obligatorio'} type="password" spellCheck="false" /><br />
                                    <label htmlFor='password' className='label'>Password</label>
                                </div>
                                <div>
                                    <button type='submit' className='button clickActive'>Iniciar sesión</button>
                                    <Link to="/register">Registrarse</Link>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            <div
                className='div-img div-img-login'
                style={{
                    backgroundImage: `url(${IMG_URL}/v1673877018/shoes-ecommerce/auth-images/login-image_ffzv5a.webp)`
                }}
            />
        </div>
    )
}