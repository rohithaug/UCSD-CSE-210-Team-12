// REQUIRE PACKAGES
const httpStatus = require('http-status');

// REQUIRE SERVICES
const { analyticsService } = require('../services');

// REQUIRE UTILS
const catchAsync = require('../utils/catchAsync');
const isAuth = require('../utils/isAuth');

/**
 * Get SHS Dashboard Analytics Metrics.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves with metric details.
 * @throws {Error} If there is an issue getting metric details or sending the response.
 */
const getMetrics = async (req, res) => {
    try {
        isAuth(req, res, async () => {
            const metrics = await analyticsService.getMetrics();
            if (!metrics) {
                res.status(httpStatus.BAD_REQUEST).send({
                    message: 'Error fetching dashboard metrics',
                    description: 'Unexpected server error in getting metrics for dashboard. If the issue persists contact the system administrator'           
                });
            } else {
                res.status(httpStatus.OK).send(metrics);
            }
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            message: 'Error fetching dashboard metrics',
            description: 'Unexpected server error in getting metrics for dashboard. If the issue persists contact the system administrator'           
        });
    }
};

module.exports = {
    getMetrics
};