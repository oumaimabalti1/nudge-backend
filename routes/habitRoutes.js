const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// GET all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new habit
router.post('/', async (req, res) => {
  try {
    const newHabit = new Habit({
      title: req.body.title,
      category: req.body.category || 'Productivity'
    });
    const savedHabit = await newHabit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT toggle habit completion
router.put('/:id/toggle', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    habit.streak += 1;
    habit.completedDates.push(new Date());
    const updated = await habit.save();
    res.json({ ...updated._doc, completed: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  THIS IS THE CRITICAL LINE:
module.exports = router;