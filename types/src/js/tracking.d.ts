export default AudioTracking;
declare class AudioTracking {
    constructor(audio: any, trackingProperties?: {});
    audio: any;
    trackingProperties: any;
    audioLength: number;
    lastTrackedProgressPoint: any;
    delegate: any;
    attachListeners(): void;
    extractMetadata(): void;
    eventListener(ev: any): void;
    destroy(): void;
}
