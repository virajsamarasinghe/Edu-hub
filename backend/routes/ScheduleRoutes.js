const express = require('express');
const Schedule = require('../models/Schedule'); // Import Schedule model
const router = express.Router();


router.post('/schedule', async (req, res) => {
    const { title, lesson, location, date, time } = req.body;
  
    console.log('Received data:', req.body); // Log the request body for debugging
  
    if (!title || !lesson || !location || !date || !time) {
      console.error('Validation error: Missing fields');
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const newSchedule = new Schedule({ title, lesson, location, date, time });
      await newSchedule.save();
      console.log('Schedule saved:', newSchedule); // Log the saved schedule
      res.status(201).json(newSchedule);
    } catch (err) {
      console.error('Error saving schedule:', err.message);
      res.status(500).json({ error: 'Failed to save schedule' });
    }
  });

  router.get('/schedules', async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch schedules' });
    }
});

router.delete('/schedule/:id', async (req, res) => {
    const { id } = req.params; // Retrieve id from the URL
    console.log('Received data:', req.body);
    try {
        const schedule = await Schedule.findByIdAndDelete(id); // Use the id to delete
        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }
        console.log('Schedule deleted:', schedule);
        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (err) {
        console.error('Error deleting schedule:', err.message);
        res.status(500).json({ error: 'Failed to delete schedule' });
    }
});



module.exports = router;