import express from 'express';
import {setupDirectories, downloadRawVideo, uploadProcessedVideo, convertVideo, deleteRawVideo, deleteProcessedVideo} from './storage'


// Create the local directories for videos
setupDirectories();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/process-video', async (req, res) => {
// Get the bucket and filename from the Cloud Pub/Sub message
  let data;
  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error('Invalid message payload received.');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send('Bad Request: missing filename.');
  }

  const inputFileName = data.name
  const outputFileName = `processed-${inputFileName}`

  //Download raw video from clud storage
  await  downloadRawVideo(inputFileName)


  //convert vid
  try{
    await convertVideo(inputFileName, outputFileName)
  }
  catch(err){
    // await deleteRawVideo(inputFileName)
    // await deleteProcessedVideo(outputFileName)
    await Promise.all([deleteRawVideo(inputFileName), deleteProcessedVideo(outputFileName)])// awaiting concurrently - to delete the corrupted files locally
    return res.status(500).send('Internal server error')
  }

  
  //upload processed vid to cloud storage
  await uploadProcessedVideo(outputFileName)

  await Promise.all([deleteRawVideo(inputFileName), deleteProcessedVideo(outputFileName)])// awaiting concurrently - to delete the corrupted files locally

   
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});