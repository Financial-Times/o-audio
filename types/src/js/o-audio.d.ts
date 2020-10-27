export default OAudio;
declare class OAudio {
    /**
     * Get the data attributes from the OAudioElement. If the message is being set up
     * declaratively, this method is used to extract the data attributes from the DOM.
     * @param {HTMLElement} oAudioEl - The component element in the DOM
     * @returns {Object} - Data attributes as an object
     */
    static getDataAttributes(oAudioEl: HTMLElement): any;
    /**
     * Initialise message component.
     * @param {(HTMLElement|String)} rootEl - The root element to intialise the component in, or a CSS selector for the root element
     * @param {Object} [opts={}] - An options object for configuring the component
     * @returns {(OAudio|Array<OAudio>)} - OAudio instance(s)
     */
    static init(rootEl: (HTMLElement | string), opts?: any): (OAudio | Array<OAudio>);
    /**
     * Class constructor.
     * @param {HTMLAudioElement} [oAudioEl] - The component element in the DOM
     * @param {Object} [opts={}] - An options object for configuring the component
     */
    constructor(oAudioEl?: HTMLAudioElement, opts?: any);
    oAudioEl: HTMLAudioElement;
    options: any;
    tracking: Tracking;
    /**
     * Destroy this component. Unbinds listeners and dispatches any final tracking events
     * @returns {void}
     */
    destroy(): void;
}
import Tracking from "./tracking.js";
