const Member = require('../models/Member');
const Booking = require('../models/Booking');
const Transaction = require('../models/Transaction');
const Venue = require('../models/Venue');

const getDashboardMetrics = async (req, res) => {
    try {
        const { venue_id } = req.query; // Venue filter from query (optional)
        const venueId = venue_id ? parseInt(venue_id) : null;

        // Active and inactive members (not affected by venue filter)
        const activeMembers = await Member.countDocuments({ status: 'Active' });
        const inactiveMembers = await Member.countDocuments({ status: 'Inactive' });

        // Trial conversion rate (not affected by venue filter)
        // Count all members who are trial users
        const trialUsers = await Member.countDocuments({ is_trial_user: true });
        // Count trial users who have been converted (converted_from_trial: true)
        const convertedTrialUsers = await Member.countDocuments({ is_trial_user: true, converted_from_trial: true });
        const trialConversionRate = trialUsers > 0 ? (convertedTrialUsers / trialUsers) * 100 : 0;

        // Bookings (filter by venue if venue_id is provided)
        const bookingsFilter = venueId ? { venue_id: venueId } : {};
        const bookingsCount = await Booking.countDocuments(bookingsFilter);

        // Build match condition for transactions
        const transactionMatch = { status: 'Success' };
        if (venueId) {
            transactionMatch['booking.venue_id'] = venueId;
        }

        // Booking revenue (filter by venue if venue_id is provided)
        const bookingRevenueAggregation = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'booking_id',
                    foreignField: 'booking_id',
                    as: 'booking'
                }
            },
            { $unwind: '$booking' },
            { $match: { ...transactionMatch, type: 'Booking' } },
            { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
        ]);
        const bookingRevenue = bookingRevenueAggregation[0]?.totalRevenue || 0;

        // Coaching revenue (filter by venue if venue_id is provided)
        const coachingRevenueAggregation = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'booking_id',
                    foreignField: 'booking_id',
                    as: 'booking'
                }
            },
            { $unwind: '$booking' },
            { $match: { ...transactionMatch, type: 'Coaching' } },
            { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
        ]);
        const coachingRevenue = coachingRevenueAggregation[0]?.totalRevenue || 0;

        // Total revenue (filter by venue if venue_id is provided)
        const totalRevenueAggregation = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'booking_id',
                    foreignField: 'booking_id',
                    as: 'booking'
                }
            },
            { $unwind: '$booking' },
            { $match: transactionMatch },
            { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
        ]);
        const totalRevenue = totalRevenueAggregation[0]?.totalRevenue || 0;

        // Refunds and disputes (filter by venue if venue_id is provided)
        const refundMatch = { status: 'Refunded' };
        const disputeMatch = { status: 'Dispute' };
        
        if (venueId) {
            refundMatch['booking.venue_id'] = venueId;
            disputeMatch['booking.venue_id'] = venueId;
        }
        
        const refundsCount = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'booking_id',
                    foreignField: 'booking_id',
                    as: 'booking'
                }
            },
            { $unwind: '$booking' },
            { $match: refundMatch },
            { $count: 'count' }
        ]);
        const refunds = refundsCount.length > 0 ? refundsCount[0].count : 0;

        const disputesCount = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'booking_id',
                    foreignField: 'booking_id',
                    as: 'booking'
                }
            },
            { $unwind: '$booking' },
            { $match: disputeMatch },
            { $count: 'count' }
        ]);
        const disputes = disputesCount.length > 0 ? disputesCount[0].count : 0;

        // Return aggregated metrics as response
        res.status(200).json({
            activeMembers,
            inactiveMembers,
            trialConversionRate: trialConversionRate.toFixed(2), // Format to two decimals
            bookings: bookingsCount,
            bookingRevenue,
            coachingRevenue,
            refundsAndDisputes: refunds + disputes,
            totalRevenue
        });
    } catch (error) {
        console.error("Error in getDashboardMetrics:", error);
        res.status(500).json({ message: 'Error fetching dashboard metrics', error: error.message });
    }
};

// Function to get revenue data by venue for chart visualization
const getRevenueByVenue = async (req, res) => {
    try {
        const revenueByVenue = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'booking_id',
                    foreignField: 'booking_id',
                    as: 'booking'
                }
            },
            { $unwind: '$booking' },
            { $match: { status: 'Success' } },
            {
                $group: {
                    _id: '$booking.venue_id',
                    totalRevenue: { $sum: '$amount' },
                    bookingCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'venues',
                    localField: '_id',
                    foreignField: 'venue_id',
                    as: 'venueInfo'
                }
            },
            { $unwind: '$venueInfo' },
            {
                $project: {
                    _id: 0,
                    venueId: '$_id',
                    venueName: '$venueInfo.name',
                    totalRevenue: 1,
                    bookingCount: 1
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]);

        res.status(200).json(revenueByVenue);
    } catch (error) {
        console.error("Error in getRevenueByVenue:", error);
        res.status(500).json({ message: 'Error fetching revenue by venue', error: error.message });
    }
};

module.exports = { getDashboardMetrics, getRevenueByVenue };