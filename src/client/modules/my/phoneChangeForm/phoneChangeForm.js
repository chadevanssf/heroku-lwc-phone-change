import { LightningElement, api } from 'lwc';

export default class PhoneChangeForm extends LightningElement {
    @api title;
    firstName = 'Chad';
    lastName = 'Evans';
    email = '1@2.com';
    phone;

    handleInputOnChange(event) {
        this[event.target.name] = event.target.value;
    }

    handleUpdateData() {
        const data = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone
        };
        const reqInfo = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(data)
        };
        const req = new Request('/api/phonechange', reqInfo);
        fetch(req)
            .then((response) => {
                return response.text();
            })
            .then((text) => {
                let value = JSON.parse(text);
                let msg = 'Successfully completed an ' + value.command;
                let modal = this.template.querySelector('.modal-alert');
                modal.showToast('success', msg);
            })
            .catch((error) => {
                console.log(`Failed: ${error}`);
            });
    }
}
