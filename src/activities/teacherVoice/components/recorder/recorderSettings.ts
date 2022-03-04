import { StereoAudioRecorder } from 'recordrtc';

export const rtcSettings: any = {
    // audio, video, canvas, gif
    type: 'audio',
    mimeType: 'audio/wav',

    // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
    // CanvasRecorder, GifRecorder, WhammyRecorder
    recorderType: StereoAudioRecorder,

    // disable logs
    disableLogs: true,

    // get intervals based blobs
    // value in milliseconds
    timeSlice: 1000,

    // requires timeSlice above
    // returns blob via callback function
    ondataavailable: function (blob: any) {},

    // auto stop recording if camera stops
    checkForInactiveTracks: false,

    // requires timeSlice above
    onTimeStamp: function (timestamp: any) {},

    // both for audio and video tracks
    bitsPerSecond: 128000,

    // only for audio track
    // ignored when codecs=pcm
    audioBitsPerSecond: 128000,

    // only for video track
    videoBitsPerSecond: 128000,

    // used by CanvasRecorder and WhammyRecorder
    // it is kind of a "frameRate"
    frameInterval: 90,

    // if you are recording multiple streams into single file
    // this helps you see what is being recorded
    previewStream: function (stream: any) {},

    // used by StereoAudioRecorder
    // the range 22050 to 96000.
    // can force a specific rate:
    // sampleRate: 48000,

    // used by StereoAudioRecorder
    // the range 22050 to 96000.
    // let us force 16khz recording:
    // desiredSampRate: 16000,

    // used by StereoAudioRecorder
    // Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
    bufferSize: 16384,

    // used by StereoAudioRecorder
    // 1 or 2
    numberOfAudioChannels: 1,

    // used by WebAssemblyRecorder
    frameRate: 30,

    // used by WebAssemblyRecorder
    bitrate: 128000,

    // used by MultiStreamRecorder - to access HTMLCanvasElement
    elementClass: 'multi-streams-mixer',
};
