/* Code by CafeForce || www.cafeforce.com || support@cafeforce.com || Mandatory Header */

import { LightningElement, api } from 'lwc';

export default class Toast extends LightningElement {
    type;
    message;
    showToastBar = false;
    @api autoCloseTime = 5000;

    @api
    showToast(type, message) {
        this.type = type;
        this.message = message;
        this.showToastBar = true;
        setTimeout(() => {
            this.closeModel();
        }, this.autoCloseTime);
    }

    closeModel() {
        this.showToastBar = false;
        this.type = '';
        this.message = '';
    }

    get getIconName() {
        return 'utility:' + this.type;
    }

    get innerClass() {
        return (
            'slds-icon_container slds-icon-utility-' +
            this.type +
            ' slds-m-right_small slds-no-flex slds-align-top'
        );
    }

    get outerClass() {
        return 'slds-notify slds-notify_toast slds-theme_' + this.type;
    }
}

/* 
    Code by CafeForce 
    Website: http://www.cafeforce.com 
    DO NOT REMOVE THIS HEADER/FOOTER FOR FREE CODE USAGE 
*/
