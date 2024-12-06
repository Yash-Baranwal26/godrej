require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const users = require('./users');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 2626;

app.use(express.json());

app.use(cors({
    origin: ['https://godrejsector44project.in', 'http://localhost:5173'], // Replace with your actual frontend domain
    optionsSuccessStatus: 200,
    credentials: true // If you are using cookies, you need to set credentials to true
  }));

  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log("DB Connected");
  })                  
  .catch(err => {
      console.log(err);
  });

  app.post("/userEnquiry", async (req, res) => {
    try {
        const { name, mobile, requirement, budget } = req.body;

        let check = await users.findOne({ mobile: mobile });
        if (!check) {

            let send = await users.create({
                name:name,
                mobile:mobile,
                requirement:requirement,
                budget:budget
            });

            if (send) {
                res.status(200).json({ msg: "Your query is registered. We will contact you soon." });
            } else {
                res.status(400).json({ error: "Invalid arguments" });
            }
        } else {

            res.status(400).json({ error: "This number is already registered" });
        }
    } catch (err) {
        console.error('Error in /userEnquiry:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));