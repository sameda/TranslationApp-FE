import swal from 'sweetalert2';
import { AbstractControl } from '@angular/forms';
declare var $: any;

export class HelperFunctions {

    static showNotification(from, align, message, type) {
        $.notify({
            icon: 'notifications',
            message: message
        }, {
                type: type,
                timer: 1000,
                placement: {
                    from: from,
                    align: align
                }
            });
    }

    static DisplayConfirmMessage(title: string, message: string): Promise<any> {
        return swal.fire({
            title: title,
            text: message,
            // showCancelButton: false,
            // reverseButtons: true,
            // confirmButtonClass: 'btn btn-primary',
            // cancelButtonClass: 'btn btn-primary margin-right-base',
            // buttonsStyling: true           
            type: 'warning',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        });
    }


    //Check if unauthorized error display session timeout message
    static checkAuthentication(error: any): any {
            swal.isVisible()
            if (error.status == 401) {
    
                if (!swal.isVisible()) {
                    swal.fire({
                        title: 'Session timeout',
                        text: ' Please login to get a new session.',
                        type: 'warning',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false
                    }).then((result) => {
                        if (result.value) {
                            localStorage.clear();                           
                        }
                    });
                }
            }
            //return JSON.parse(error.error);
        }

    static passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
            let password = c.get('password');
            let confirmpassword = c.get('rePassword');
            if (password.pristine || confirmpassword.pristine) {
              return null;
            }
            if (password.value === confirmpassword.value) {
              return null;
            }
            return { 'match': true };
          }
    

}