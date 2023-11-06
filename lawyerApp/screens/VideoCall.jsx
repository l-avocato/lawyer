import * as Permissions from 'expo-permissions';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { RTCView, RTCPeerConnection, mediaDevices } from 'react-native-webrtc';

const VideoCall = () => {
    const localStream = useRef(null);
    const remoteStream = useRef(null);
    const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    const pc = new RTCPeerConnection(configuration);

    useEffect(() => {
        const getPermissions = async () => {
            const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
            const { status: audioStatus } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        
            if (cameraStatus !== 'granted' || audioStatus !== 'granted') {
                console.log('Permission to use camera or audio not granted');
            }
        };
        getPermissions();

       navigator.mediaDevices.getUserMedia({ video: true })
       .then((stream) => {
        localStream.current = stream;
        return navigator.mediaDevices.enumerateDevices()
        }).then((devices) => {
            devices.forEach((device) => {
                if (device.kind === "videoinput") {
                    device.label // This is the name of your webcam
                }
                });
    }, []);


        const getLocalStream = async () => {
            const stream = await mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });

            localStream.current = stream;
            pc.addStream(stream);
        };

        getLocalStream();

        pc.onaddstream = event => {
            remoteStream.current.srcObject = event.stream;
        };

       

        return () => {
            pc.close();
        };
    }, []);

    return (
        <View>
            <RTCView streamURL={localStream.current.toURL()} style={{ width: 200, height: 150 }} />
            <RTCView streamURL={remoteStream.current.toURL()} style={{ width: 200, height: 150 }} />
        </View>
    );
};

export default VideoCall;

