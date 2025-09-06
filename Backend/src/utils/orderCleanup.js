// Utility function to clean up abandoned pending orders
const cleanupAbandonedOrders = async () => {
  try {
    const cutoffTime = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago
    
    const result = await Order.deleteMany({
      paymentStatus: 'pending',
      status: 'pending',
      createdAt: { $lt: cutoffTime }
    });
    
    if (result.deletedCount > 0) {
      console.log(`Cleaned up ${result.deletedCount} abandoned pending orders`);
    }
    
    return result.deletedCount;
  } catch (error) {
    console.error('Error cleaning up abandoned orders:', error);
    return 0;
  }
};

module.exports = { cleanupAbandonedOrders };
