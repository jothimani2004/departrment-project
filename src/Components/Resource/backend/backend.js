const express = require('express');
const multer = require('multer');
const cors = require('cors');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Multer setup for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017';
const client = new MongoClient(mongoURI);
let db;

// Connect to MongoDB
(async () => {
  try {
    await client.connect();
    db = client.db('researchpapers');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

// OAuth2 Configuration for Gmail
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Routes

// Get research papers by year
app.get('/researchpaper/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const papers = await db.collection('researchpapers').find({ paperyear: parseInt(year) }).toArray();

    if (!papers.length) {
      return res.status(404).json({ message: 'No research papers found for this year' });
    }

    const papersList = papers.map(paper => ({
      title: paper.papertitle,
      name: paper.papername || 'N/A',
      postedAt: paper.posted_at,
      year: paper.paperyear,
    }));

    res.status(200).json({ pdfs: papersList });
  } catch (error) {
    console.error('Error fetching research papers:', error);
    res.status(500).json({ error: 'Failed to fetch papers' });
  }
});

// Upload a new research paper
app.post('/researchpapers', upload.single('pdf'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const { title, year } = req.body;

    const response = await db.collection('researchpapers').insertOne({
      paper: buffer,
      papertitle: title,
      papername: originalname,
      paperyear: parseInt(year),
      posted_at: new Date(),
    });

    res.json(response.ops[0]);
  } catch (error) {
    console.error('Error inserting research paper:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a research paper
app.delete('/delete-pdf/:title', async (req, res) => {
  const { title } = req.params;

  try {
    await db.collection('researchpapers').deleteOne({ papertitle: title });
    res.json({ message: 'Paper successfully deleted' });
  } catch (error) {
    console.error('Error deleting paper:', error);
    res.status(500).json({ error: 'Failed to delete paper' });
  }
});

// Schedule an email request
app.post('/schedule-email', async (req, res) => {
  const { email, pdfTitle } = req.body;

  try {
    await db.collection('email_requests').insertOne({
      email,
      pdfTitle,
      scheduled_date: new Date(),
    });

    res.status(200).json({ message: 'Email request scheduled successfully.' });
  } catch (error) {
    console.error('Error scheduling email:', error);
    res.status(500).json({ message: 'Error scheduling email.' });
  }
});

// Cron job to send scheduled emails
cron.schedule('0 * * * *', async () => {
  console.log('Checking for scheduled emails...');

  try {
    const emailRequests = await db.collection('email_requests').find({ scheduled_date: { $lte: new Date() } }).toArray();

    for (let request of emailRequests) {
      const paper = await db.collection('researchpapers').findOne({ papertitle: request.pdfTitle });

      if (paper) {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'your-email@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken.token,
          },
        });

        const mailOptions = {
          from: 'Your Name <your-email@gmail.com>',
          to: request.email,
          subject: `Requested Research Paper: ${request.pdfTitle}`,
          text: `Here is your requested research paper titled: ${request.pdfTitle}`,
          attachments: [
            {
              filename: `${request.pdfTitle}.pdf`,
              content: paper.paper,
              contentType: 'application/pdf',
            },
          ],
        };

        await transport.sendMail(mailOptions);
        console.log(`Email sent to ${request.email} with PDF titled ${request.pdfTitle}`);
      }
    }

    await db.collection('email_requests').deleteMany({ scheduled_date: { $lte: new Date() } });
    console.log('Processed scheduled email requests');
  } catch (error) {
    console.error('Error processing scheduled emails:', error);
  }
});

// Fetch notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await db.collection('notes').find({}).toArray();
    res.json({ notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Fetch a specific note
app.get('/notes/:noteTitle', async (req, res) => {
  const { noteTitle } = req.params;

  try {
    const note = await db.collection('notes').findOne({ notes_title: noteTitle });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const base64Data = Buffer.from(note.notes_data).toString('base64');

    res.json({
      notes_data: base64Data,
      notes_type: note.notes_type,
      notes_name: note.notes_name,
      notes_desc: note.notes_desc,
    });
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Failed to fetch the note' });
  }
});

// Upload notes
app.post('/uploadnotes', upload.single('file'), async (req, res) => {
  const { title, description, uploadedBy } = req.body;
  const file = req.file;

  try {
    const result = await db.collection('notes').insertOne({
      notes_name: file.originalname,
      notes_data: file.buffer,
      notes_type: file.mimetype,
      notes_title: title,
      notes_desc: description,
      uploaded_by: uploadedBy,
    });

    res.json({ message: 'Note uploaded successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error uploading note:', error);
    res.status(500).json({ error: 'Failed to upload note' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.delete(`/delete/notes/:notetitle`, async (req, res) => {
  const { notetitle } = req.params; // Destructure correctly to get notetitle
  console.log(notetitle);

  try {
    const result = await db.query(`DELETE FROM notes WHERE notes_title = $1`, [notetitle]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    console.log("Successfully deleted");
    res.json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Error deleting note" });
  }
});





app.post('/addlink', async (req, res) => {
  const { newLink, cookieValue } = req.body;
  
  // Check if newLink and cookieValue exist before proceeding
  if (!newLink || !cookieValue) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Insert into the database (make sure your query matches the table structure)
  try {
   
    
    // Respond with success
    res.json({ message: 'Successfully uploaded link', newLink: result.rows[0] });
  } catch (error) {
    console.error('Error inserting link:', error);
    res.status(500).json({ message: 'Error uploading link.' });
  }
});


app.get('/links', async (req, res) => {
  try {
    const linksData = await db.query('SELECT * FROM links');
    console.log(linksData.rows ); // Replace with actual query
    res.json({ links: linksData.rows });
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Failed to fetch links' });
  }
});

app.delete('/deletelinks/:linktitle', async (req, res) => {
  const { linktitle } = req.params; // Extract linktitle from URL params
  console.log(linktitle);
  try {
    await db.query(`DELETE FROM links WHERE linktitle = $1`, [linktitle]);
    res.json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ error: 'Failed to delete link' });
  }
});




app.get('/videos', async (req, res) => {
  try {
    const videosData = await db.query('SELECT * FROM videos'); // Replace with actual query
    console.log(videosData.rows);
    res.json({ videos: videosData.rows });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

app.post('/addvideo', async (req, res) => {
  const newVideo = req.body.newVideo;
  const videoUrl = newVideo.videoId;

  // Extract YouTube ID from the video URL
  function extractVideoId(videoUrl) {
    // Regular expression to match YouTube video IDs
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = videoUrl.match(regExp);
    if (match && match[2].length === 11) {
        // The video ID is the second element in the match array
        return match[2];
    } else {
        // If no match found or video ID is not 11 characters long, return null
        return null;
    }
}

  const videoID = extractVideoId(videoUrl);
  
  // Check if video ID was extracted successfully
  if (!videoID) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  const user = req.body.cookieValue;
  console.log(user);

  try {
    const response = await db.query(
      `INSERT INTO videos (videoid, videotitle, videodesc, uploaded_by) VALUES ($1, $2, $3, $4) RETURNING *`,
      [videoID, newVideo.title, newVideo.description, user]
    );

    // Respond with the newly added video or a success message
    res.json({ message: "Video added successfully", video: response.rows[0] });
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete('/videodelete/:videoid',async(req,res)=>{
  const videoid=req.params.videoid;
  console.log(videoid);
  await db.query(`delete from videos where videoid=$1`,[videoid])
  res.json("video successfully deleted")
})


// Sample route to handle research papers submission

// Start the server
app.listen(6000, () => {
  console.log('Backend server running on port 5000');
});

// NOTE: Avoid calling db.end() to keep the connection open
