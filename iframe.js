async function captureUserImage() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(async stream => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();
            await new Promise(resolve => video.onloadedmetadata = resolve);
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            stream.getTracks().forEach(track => track.stop());
            const imageDataUrl = canvas.toDataURL('image/png');
            window.parent.postMessage({ action: 'userImageResult', data: imageDataUrl }, '*');
        });
}


window.addEventListener('message', (event) => {
    if (event.data.action === 'captureUserImage') {
        captureUserImage();
    }
});