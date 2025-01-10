const express = require('express');
const multer = require('multer');
const { Client } = require('pg'); // Correct import
const cors = require('cors');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json()); // Handle JSON data


const CLIENT_ID = '745382712302-50snqotru2jjk9r4c5b43q1dpd2bjf9u.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04T9h6YvqPZAUCgYIARAAGAQSNwF-L9IrFQa04S5fTghHNZCAH7-gSrzDYI-5d0caoNoZY8dZvrZxs33zro7_134qCb3i8NnUZqY';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// PostgreSQL connection
const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'researchpapers',
  password: 'mass',
  port: 5432,
});

// Connect to the database
db.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Connection error', err.stack);
  });

// Multer setup for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });





// Route to get the research papers
app.get('/researchpaper/:year', async (req, res) => {
  try {
   
    let { year } = req.params;
    year = parseInt(year);
     // Debugging to verify the year

    const result = await db.query('SELECT * FROM researchpapers where paperyear=$1',[year]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No research papers found for this year' });
    }

    // Map the result to format it as desired
    const papersList = result.rows.map(paper => ({
      title: paper.papertitle,
      name: paper.papername || 'N/A',  // If papername is null, display 'N/A'
      postedAt: paper.posted_at,
      year: paper.paperyear
    }));

   // Debugging to verify the paper list
    
    res.status(200).json({ pdfs: papersList });
  } catch (error) {
    console.error('Error fetching research papers:', error);
    res.status(500).json({ error: 'Failed to fetch papers' });
  }
});

app.get('/resource/pdfview', async (req, res) => {
  const { pdftitle, resourse } = req.query;
  console.log(pdftitle, resourse);
  
  // Convert the resource name to lowercase
  const resourse1 = resourse.toLowerCase();

  try {
    // Query the database for the PDF based on the title and resource
    const response = await db.query(`SELECT paper FROM ${resourse1} WHERE papertitle = $1`, [pdftitle]);

    // Check if any rows were returned
    if (response.rows.length > 0) {
      const pdfBuffer = response.rows[0].paper; // Assuming 'paper' contains the binary data
console.log(pdfBuffer);
      // Send the PDF buffer back as a response
      res.json({ buffer: pdfBuffer });
    } else {
      // Handle case when no document is found
      res.status(404).json({ error: 'PDF not found' });
    }
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/schedule-email', async (req, res) => {
  const { email, pdfTitle } = req.body;
  const scheduledDate = new Date();
  scheduledDate.setDate(scheduledDate.getDate() ); // Set the date to one day later

  try {
    const query = `INSERT INTO email_requests (email, pdf_title, scheduled_date) VALUES ($1, $2, $3)`;
    await db.query(query, [email, pdfTitle, scheduledDate]);
    console.log("sucessfully req added to req table");
    res.status(200).json({ message: 'Email request scheduled successfully.' });
  } catch (error) {
    console.error('Error scheduling email:', error);
    res.status(500).json({ message: 'Error scheduling email.' });
  }
});


// Configure your email transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'jothimani282004@gmail.com',
//     pass: 'm@ssm@ni',
//   },
// });

// Run a cron job every hour to check for emails to send

// Cron job to run every hour
cron.schedule('0 * * * *', async () => {
  console.log('Checking for scheduled emails...');

  try {
    const result = await db.query('SELECT * FROM email_requests WHERE scheduled_date <= NOW()');
    const emailRequests = result.rows;

    for (let request of emailRequests) {
      // Fetch the PDF data from the database
      const pdfResult = await db.query('SELECT paper FROM researchpapers WHERE papertitle = $1', [request.pdf_title]);

      if (pdfResult.rows.length > 0) {
        const pdfBuffer =  pdfResult.rows[0].paper;
        console.log(pdfBuffer);
        // console.log(`PDF Buffer Size: ${pdfBuffer.length} bytes and ${pdfBuffer}`);
        // Obtain a new access token
        const accessToken = await oAuth2Client.getAccessToken();

        // Set up the email transport using OAuth2
        const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'jothimani88531@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken.token,
          },
        });

        // Email options including PDF attachment
        const mailOptions = {
          from: 'Your Name <jothimani88531@gmail.com>',
          to: request.email,
          subject: `Requested Research Paper: ${request.pdf_title}`,
          text: `Here is your requested research paper titled: ${request.pdf_title}`,
          attachments: [
            {
              filename: `${request.pdf_title}.pdf`,
              content: pdfBuffer,
              contentType: 'application/pdf',
            },
          ],
        };

        // Send the email
        const result = await transport.sendMail(mailOptions);
        console.log(`Email sent successfully to ${request.email} with PDF titled ${request.pdf_title}:`, result);

        // Delete the email request after sending
       
      } else {
        console.log(`PDF titled ${request.pdf_title} not found in the database.`);
      }
    }
      await db.query('DELETE FROM email_requests WHERE scheduled_date <= NOW()');
      console.log(`Email request for deleted from the database.`);

  } catch (error) {
    console.error('Error processing scheduled emails:', error);
  }
});



app.post('/researchpapers', upload.single('pdf'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    let { title, year } = req.body;

    // Check if year is provided and is a valid number
    if (isNaN(year)) {
      console.log( 'Invalid or missing year');
      return res.status(400).json({ error: 'Invalid or missing year' });
    }

    // Convert year to an integer
    year = parseInt(year, 10);
    
    console.log(typeof(year)); // To confirm it's a number

    // Insert into the database
    const response = await db.query(
      `INSERT INTO researchpapers (paper, papertitle, papername, paperyear) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [buffer, title, originalname, year]
    );
    
    // Respond with the inserted data
    res.json(response.rows[0]);

  } catch (error) {
    console.error('Error inserting research paper:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.delete('/delete-pdf/:title/:resourse',async(req,res)=>{
  let {title,resourse}=req.params;
  console.log(title,resourse);
  resourse=resourse.toLowerCase();
  await db.query(`delete from ${resourse} where papertitle=$1`,[title])
  res.json("paper successfully deleted")

});






// Implementing other routes (ensure you fill in the queries)
app.get('/notes', async (req, res) => {
  try {
    const notesData = await db.query('SELECT notes_name, notes_title, notes_desc FROM notes'); 
    console.log(notesData.rows);// Replace with actual query
    res.json({ notes: notesData.rows });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});





app.get("/notes/:noteTitle", async (req, res) => {
  const { noteTitle } = req.params;
  console.log(noteTitle);

  try {
    const result = await db.query("SELECT notes_data, notes_type, notes_name, notes_desc FROM notes WHERE notes_title = $1", [noteTitle]);
console.log(result.rows);
    if (result.rows.length > 0) {
      const note = result.rows[0];
      
      // Convert the binary data to base64
      const base64Data = Buffer.from(note.notes_data).toString("base64");
      console.log(  base64Data, 
        note.notes_type, 
        note.notes_name, 
         note.notes_desc);
      res.json({
        notes_data: base64Data, 
        notes_type: note.notes_type, 
        notes_name: note.notes_name, 
        notes_desc: note.notes_desc
      });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ error: "Failed to fetch the note" });
  }
});





app.post('/uploadnotes', upload.single('file'), async (req, res) => {
  const { title, description, uploadedBy } = req.body;
  const file = req.file;

  try {
    const query = `
      INSERT INTO notes (notes_name, notes_data, notes_type, notes_title, notes_desc, uploaded_by)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
    
    const values = [
      file.originalname,
      file.buffer,  // File binary data
      file.mimetype,  // File MIME type (e.g., 'application/pdf')
      title,
      description,
      uploadedBy
    ];

    const result = await db.query(query, values);
    res.json({ success: true, noteId: result.rows[0].id });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Server error');
  }
});

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
    const result = await db.query(
      `INSERT INTO links (url, linktitle, linkdesc, uploaded_by) VALUES ($1, $2, $3, $4) RETURNING *`, 
      [newLink.url, newLink.name, newLink.description, cookieValue]
    );
    
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
