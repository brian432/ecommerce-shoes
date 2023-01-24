import { NavigateFunction } from "react-router-dom";
import Swal, { SweetAlertResult } from "sweetalert2";

export const swalFalse = (title: string, text: string = 'Intentelo nuevamente'): Promise<SweetAlertResult> => {
    return Swal.fire({
        title: title,
        text: text,
        width: "400px",
        timer: 5000,
        timerProgressBar: true,
        confirmButtonText: 'Aceptar'
    });
};

export const swalTrue = (title: string): Promise<SweetAlertResult> => {
    return Swal.fire({
        title: title,
        width: "400px",
        timer: 5000,
        timerProgressBar: true,
        confirmButtonText: 'Aceptar'
    });
};

export const swalSuccess = (title: string, text: string, navigate: NavigateFunction) => {
    return Swal.fire({
        title: title,
        text: text,
        width: "400px",
        confirmButtonText: 'Aceptar'
    }).then(result => {
        result.isConfirmed && navigate('/', { replace: true })
    })
}