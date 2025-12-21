const express = require('express');
const {
    getDashboardMetrics,
    getRevenueByVenue
} = require('../controllers/dashboardContoller');

const router = express.Router();

// Endpoint for aggregated general dashboard data
router.get('/general', getDashboardMetrics);

// Endpoint for revenue by venue data
router.get('/revenue-by-venue', getRevenueByVenue);

module.exports = router;