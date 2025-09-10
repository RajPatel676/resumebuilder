import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://wellcinema1999:ZtPdnesBe8HG6Hge@cluster0.8yxoj1c.mongodb.net/resume_builder?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('📡 MongoDB URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials in logs

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Increased timeout for better cluster connectivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      bufferCommands: false, // Disable mongoose buffering
    });

    console.log('✅ MongoDB connected successfully');
    console.log('🗄️ Database name:', mongoose.connection.name);
    console.log('🌐 Database host:', mongoose.connection.host);

    // Test the connection with a simple operation
    const admin = mongoose.connection.db.admin();
    const serverStatus = await admin.serverStatus();
    console.log('📊 MongoDB server version:', serverStatus.version);

    // List collections
    const collections = await mongoose.connection.db.collections();
    console.log(`📋 Available collections: ${collections.length}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected - attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected successfully');
    });

    mongoose.connection.on('close', () => {
      console.log('🔴 MongoDB connection closed');
    });

    return true;

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);

    if (error.message.includes('ENOTFOUND')) {
      console.error('💡 DNS resolution failed - check your internet connection and MongoDB cluster URL');
    } else if (error.message.includes('Authentication failed')) {
      console.error('💡 Authentication failed - check your MongoDB credentials');
    } else if (error.message.includes('MongoServerSelectionError')) {
      console.error('💡 Cannot reach MongoDB cluster - check your network and cluster status');
    } else if (error.message.includes('MongoNetworkError')) {
      console.error('💡 Network error - check your internet connection');
    }

    // Exit the process if MongoDB is not available since we require it
    console.error('🚨 MongoDB connection is required for this application');
    console.error('🔧 Please check your MongoDB Atlas cluster and connection string');

    // Don't exit in development, but make it clear that MongoDB is required
    console.error('⚠️ Application will not function properly without MongoDB connection');
    return false;
  }
};

export default mongoose;
