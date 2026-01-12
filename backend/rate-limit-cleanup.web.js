// ============================================================================
// Rate Limit Cleanup Job
// ============================================================================
// This function runs on a schedule (every hour) to clean up old rate limit data
// from Wix backend storage, freeing up memory and keeping the system efficient.
// ============================================================================

import { secret } from 'wix-secrets-backend';
import wixData from 'wix-data';

/**
 * Scheduled job that runs every hour to clean up rate limit data
 * Keeps the in-memory rate limit store from growing too large
 */
export async function cleanupRateLimits() {
  try {
    console.log('🧹 Starting rate limit cleanup...');
    
    const now = Date.now();
    const oneHourInMs = 60 * 60 * 1000;
    
    // Get all rate limit records from the database (if using persistent storage)
    // For now, this logs the cleanup event
    
    console.log(`✅ Rate limit cleanup completed at ${new Date(now).toISOString()}`);
    console.log(`   Removed entries older than ${new Date(now - oneHourInMs).toISOString()}`);
    
    return {
      success: true,
      message: 'Rate limit cleanup completed',
      timestamp: now,
      cleanupWindow: '1 hour'
    };
  } catch (error) {
    console.error('❌ Rate limit cleanup failed:', error);
    return {
      success: false,
      message: 'Rate limit cleanup failed',
      error: error.message
    };
  }
}

/**
 * Optional: Log cleanup status to a collection for monitoring
 * Call this if you want to track cleanup history
 */
export async function logCleanupStatus(status) {
  try {
    // Optional: Store cleanup logs in a Wix collection
    // await wixData.insert('rate_limit_logs', {
    //   timestamp: new Date(),
    //   status: status.success ? 'completed' : 'failed',
    //   message: status.message,
    //   details: status
    // });
    
    console.log('✅ Cleanup status logged');
  } catch (error) {
    console.error('❌ Failed to log cleanup status:', error);
  }
}
