Replace more any.
Finalize on the image capturing thingy.
    - Should only use react-native-image-picker, or use with react-native-vision-camera.
    - react-native-vision-camera alone lengthens the build time a lot (from ~1m to ~3m).
    - Not know yet about alone react-native-image-picker.
    - react-native-image-picker alone can handle both camera and gallery.
    - As of now, react-native-vision-camera is only viable if the app is far more complex. Like, if the user needs to edit the image before sending to the server, or before sharing.
    - F*ck u react-native-vision-camera!!!