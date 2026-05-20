const cron = require('node-cron');
const ScrapingService = require('./src/services/scrapingService');
const Internship = require('./src/models/Internship');
const Hackathon = require('./src/models/Hackathon');

/**
 * Scraping Cron Jobs
 * Automatically update opportunities from various sources
 */

/**
 * Run internship scraping every 6 hours
 */
const internshipScrapingJob = cron.schedule('0 */6 * * *', async () => {
  try {
    console.log('🔄 Starting Internship Scraping Job...');
    const internships = await ScrapingService.scrapeInternshala();

    // Save or update internships
    for (const internship of internships) {
      await Internship.updateOne(
        { sourceId: internship.sourceId },
        { $set: internship },
        { upsert: true }
      );
    }

    console.log(`✅ Scraped ${internships.length} internships`);
  } catch (error) {
    console.error('❌ Internship scraping error:', error);
  }
});

/**
 * Run hackathon scraping every 6 hours
 */
const hackathonScrapingJob = cron.schedule('0 */6 * * *', async () => {
  try {
    console.log('🔄 Starting Hackathon Scraping Job...');
    const hackathons = await ScrapingService.scrapeDevfolio();

    for (const hackathon of hackathons) {
      await Hackathon.updateOne({ sourceId: hackathon.sourceId }, { $set: hackathon }, { upsert: true });
    }

    console.log(`✅ Scraped ${hackathons.length} hackathons`);
  } catch (error) {
    console.error('❌ Hackathon scraping error:', error);
  }
});

/**
 * Deactivate expired opportunities every day at midnight
 */
const deactivateExpiredJob = cron.schedule('0 0 * * *', async () => {
  try {
    console.log('🔄 Deactivating expired opportunities...');

    const now = new Date();

    await Internship.updateMany({ deadline: { $lt: now }, isActive: true }, { isActive: false });
    await Hackathon.updateMany({ registrationDeadline: { $lt: now }, isActive: true }, { isActive: false });

    console.log('✅ Expired opportunities deactivated');
  } catch (error) {
    console.error('❌ Error deactivating expired opportunities:', error);
  }
});

module.exports = {
  internshipScrapingJob,
  hackathonScrapingJob,
  deactivateExpiredJob,
};
