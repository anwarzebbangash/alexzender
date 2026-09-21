import sequelize from '../src/lib/database';
import { User, Article, Subscriber, Comment } from '../src/models';

// Ensure models are loaded before sync
const models = [User, Article, Subscriber, Comment];

async function initializeDatabase() {
  try {
    console.log('🔄 Connecting to database...');
    
    // Database connection test
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
    
    console.log('🔄 Creating tables...');
    
    // Create/sync all tables
    await sequelize.sync({ alter: true });
    
    console.log('✅ All tables created/updated successfully!');
    console.log('📊 Tables created:');
    console.log('   ├── users');
    console.log('   ├── articles');
    console.log('   ├── subscribers');
    console.log('   └── comments');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();