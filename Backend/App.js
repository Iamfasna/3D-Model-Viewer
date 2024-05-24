const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const Model = require('./model')

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('model'), async (req, res) => {
  try {
    // Assuming req.file.filename contains the name of the uploaded file
    const filePath = `/uploads/${req.file.filename}`;

    console.log('File uploaded:', filePath);
    // Save the file path to the database using the Mongoose model
    const model = new Model({ path: filePath });
    await model.save();

    res.send({ path: filePath });
  } catch (error) {
    console.error('Error uploading model:', error);
    res.status(500).send('Error uploading model');
  }
});
app.get('/models', async (req, res) => {
  try {
    const models = await Model.find(); // Assuming Model is your Mongoose model
    res.json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).send('Error fetching models');
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
