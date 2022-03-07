import axios from 'axios';
import * as uuid from 'uuid';

const BASE_URL = "http://localhost:8080/api"; //Change to env var

export async function sendS3(blob: Blob, metaData: any) {
    let id: string = uuid.v4();
    let fileName = `shout_data_${id}`;
    let fileType = 'audio/wav';
    metaData['audioID'] = fileName;

    try {
        // Get the s3 location on where to put the audio file
        const response: any = await axios.post("https://9ml78r5eaj.execute-api.ca-central-1.amazonaws.com/dev/haiven-shout-data-collect-GetPresignedUrlAndStoreM-vGxHgxBaP0LD", {
            fileName: fileName,
            fileType: fileType,
            metaData: metaData,
        });
        console.log(response.data.data.signedRequest)
        var signedRequest = response.data.data.signedRequest;
        var options = {
            headers: {
                'Content-Type': fileType,
            },
        };

        // Put audio file into s3 bucket
        console.log("request")
        console.log(signedRequest)
        await axios.post(signedRequest, blob, options);
        return fileName;
    } catch (error) {
        throw new Error(`Audio Failed to update: ${error}`);
    }
}

export async function sendUserData(data: any) {
    if (!URL) throw new Error(`No USER DATA ENDPOINT`);
    try {
        const response = await axios.post("https://a7uhkhvmh3.execute-api.ca-central-1.amazonaws.com/default/haiven-shout-data-collect-WriteUserDataToDynamoFun-bENtV8zxlg0V", data, {
            headers: {
                'content-type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
    } catch (error) {
        throw new Error(`Failed to upload User Data: ${error}`);
    }
}

export async function pollResults(audioID: string) {
    const URL = process.env.REACT_APP_POLL_RESULTS;
    if (!URL) throw new Error(`No POLL RESULTS DATA ENDPOINT`);

    try {
        const response = await axios.get<any>(URL, {
            params: {
                audioID: audioID,
            },
        });

        // incase anything besides a 200 doesn't thrown an error
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
    } catch (error) {
        // 404 will be caught here and we don't want it to throw an error
        if (axios.isAxiosError(error)) {
            if (error?.response?.status === 404) return null;
        }

        throw new Error(`Failed to upload User Data: ${error}`);
    }
}
