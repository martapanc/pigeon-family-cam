export function loadVideoStream() {
    const url = "https://testphotos.teotaylor.co.uk:8081/stream/video.mjpeg";
    const SOI = new Uint8Array(2);
    SOI[0] = 0xFF;
    SOI[1] = 0xD8;
    const CONTENT_LENGTH = 'content-length';
    const TYPE_JPEG = 'image/jpeg';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status + ' ' + response.statusText)
            }

            if (!response.body) {
                throw Error('ReadableStream not yet supported in this browser.')
            }

            const reader = response.body.getReader();

            let headers = '';
            let contentLength = -1;
            let imageBuffer: BlobPart | number[] | null = null;
            let bytesRead = 0;

            let frames = 0;
            let runTime = 0;
            setInterval(() => {
                console.log("Fps: " + frames + " (" + ++runTime + "s)");
                frames = 0;
            }, 1000)

            const read = () => {
                reader.read().then(({done, value}) => {
                    if (done) {
                        // @ts-ignore
                        controller.close();
                        return;
                    }

                    // @ts-ignore
                    for (let index = 0; index < value.length; index++) {
                        // @ts-ignore
                        if (value[index] === SOI[0] && value[index + 1] === SOI[1]) {
                            contentLength = getLength(headers);
                            imageBuffer = new Uint8Array(new ArrayBuffer(contentLength));
                        }
                        if (contentLength <= 0 && value) {
                            headers += String.fromCharCode(value[index]);
                        } else if (bytesRead < contentLength) {
                            // @ts-ignore
                            imageBuffer[bytesRead++] = value[index];
                        } else {
                            // @ts-ignore
                            let blob = new Blob([imageBuffer], {type: TYPE_JPEG});
                            // @ts-ignore
                            document.getElementById('video').src = URL.createObjectURL(blob);
                            frames++;
                            contentLength = 0;
                            bytesRead = 0;
                            headers = '';
                        }
                    }
                    read();
                }).catch(error => {
                    console.error(error);
                });
            };
            read();
        })
        .catch(error => {
            console.error(error);
        });

    const getLength = (headers: string) => {
        let contentLength: number = -1;
        headers.split('\n').forEach((header, _) => {
            const pair = header.split(':');
            if (pair[0].toLowerCase() === CONTENT_LENGTH) {
                contentLength = parseInt(pair[1]);
            }
        });
        return contentLength;
    };
}
