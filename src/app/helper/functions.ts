
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

}