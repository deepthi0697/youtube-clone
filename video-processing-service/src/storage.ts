import {Storage} from '@google-cloud/storage'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'

let storage = new Storage()

let rawVideoBucketName = "dpkn-yt-raw-videos"
let processedVideoBucketName = "dpkn-yt-processed-videos"

let localRawVideoPath = "./raw-videos"
let localProcessedVideoPath = "./processed-videos"



/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}.
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}.
 * @returns A promise that resolves when the video has been converted.
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {

    return new Promise<void>((resolve, reject) =>{
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
            .outputOptions('-vf', 'scale=-1:360') // 360p
            .on('end', function() {
                console.log('Processing finished successfully');
                resolve()
                // console.log'(200 Processing finished successfully');
            })
            .on('error', function(err: any) {
                console.log('An error occurred: ' + err.message);
                reject(err)
                // res.status(500).send('An error occurred: ' + err.message);
            })
            .save(`${localProcessedVideoPath}/${processedVideoName}`);
            })
     
}



/**
 * @param fileName - The name of the file to download from the 
 * {@link rawVideoBucketName} bucket into the {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been downloaded.
 */
export async function downloadRawVideo(fileName: string) {
    await storage.bucket(rawVideoBucketName)
    .file(fileName)
    .download({destination: `${localRawVideoPath}/${fileName}`})

    console.log(`gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`)
}


export async function uploadProcessedVideo(fileName:string){
const bucket = storage.bucket(processedVideoBucketName)
bucket.upload(`${localProcessedVideoPath}/${fileName}`,{
    destination: fileName
})

console.log(`${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}`)

await bucket.file(fileName).makePublic() //by default google cloud store in private

}

export function deleteRawVideo(fileName:string){
    return deleteFile(`${localRawVideoPath}/${fileName}`)
}

export function deleteProcessedVideo(fileName:string){
    return deleteFile(`${localProcessedVideoPath}/${fileName}`)
}



function deleteFile(filePath:string):Promise<void>{
    return new Promise((resolve, reject) =>{
        if(fs.existsSync(filePath)){
            fs.unlink(filePath, (err)=>{
                if(err){
                console.log(`failed to delete ${filePath}`)
                reject(err)
                }else{
                    console.log(`File deleted`)
                    resolve()
                }
                
            })
        }else{
            console.log('file doesnt exist')
            resolve()
        }
    })
}

export function setupDirectories() {
  ensureDirectoryExistence(localRawVideoPath);
  ensureDirectoryExistence(localProcessedVideoPath);
}

/**
 * Creates the local directories for raw and processed videos.
 */
function ensureDirectoryExistence(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // recursive: true enables creating nested directories
    console.log(`Directory created at ${dirPath}`);
  }
}