import { LightningElement, api } from 'lwc';

export default class LwcModal extends LightningElement {
    showModal = false;
    @api message;
    @api title;

    @api
    openModal() {
        this.showModal = true;
    }

    @api
    closeModal() {
        this.showModal = false;
    }
}
