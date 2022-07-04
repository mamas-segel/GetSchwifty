export default class UserInteractionView {
    /**
     * @param {string} message 
     */
    showMessage(message) {
        alert(message);
    }

    /**
     * @param {string} message 
     */
    getInput(message) {
        return window.prompt(message);
    }
}
