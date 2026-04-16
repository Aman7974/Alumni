/**
 * Seed Data Script
 * Populates MongoDB with sample data for testing
 * - Engineering courses
 * - 5 sample alumnus users
 * - Sample events
 * - Sample forum topics and comments
 * - Sample gallery images
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni_db';

// Engineering courses to seed
const courses = [
  { course: 'B.Tech - Computer Science Engineering', about: '4 year undergraduate program in Computer Science' },
  { course: 'B.Tech - Electronics & Communication Engineering', about: '4 year undergraduate program in ECE' },
  { course: 'B.Tech - Mechanical Engineering', about: '4 year undergraduate program in Mechanical Engineering' },
  { course: 'B.Tech - Civil Engineering', about: '4 year undergraduate program in Civil Engineering' },
  { course: 'B.Tech - Electrical Engineering', about: '4 year undergraduate program in Electrical Engineering' },
  { course: 'B.Tech - Information Technology', about: '4 year undergraduate program in IT' },
  { course: 'M.Tech - Computer Science Engineering', about: '2 year postgraduate program in Computer Science' },
  { course: 'M.Tech - Electronics & Communication Engineering', about: '2 year postgraduate program in ECE' },
  { course: 'MBA - Master of Business Administration', about: '2 year postgraduate program in Management' },
  { course: 'MCA - Master of Computer Applications', about: '3 year postgraduate program in Computer Applications' }
];

// Sample alumnus users
const alumnusData = [
  {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    password: 'password123',
    gender: 'Male',
    batch: 2020,
    courseIndex: 0, // B.Tech - Computer Science
    avatar: 'https://i.pravatar.cc/150?img=11',
    status: true
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@gmail.com',
    password: 'password123',
    gender: 'Female',
    batch: 2019,
    courseIndex: 0, // B.Tech - Computer Science
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: true
  },
  {
    name: 'Amit Kumar',
    email: 'amit.kumar@gmail.com',
    password: 'password123',
    gender: 'Male',
    batch: 2021,
    courseIndex: 2, // B.Tech - Mechanical
    avatar: 'https://i.pravatar.cc/150?img=13',
    status: true
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@gmail.com',
    password: 'password123',
    gender: 'Female',
    batch: 2018,
    courseIndex: 5, // B.Tech - IT
    avatar: 'https://i.pravatar.cc/150?img=9',
    status: true
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@gmail.com',
    password: 'password123',
    gender: 'Male',
    batch: 2020,
    courseIndex: 1, // B.Tech - ECE
    avatar: 'https://i.pravatar.cc/150?img=15',
    status: false
  }
];

// Sample events
const events = [
  {
    title: 'Annual Alumni Meet 2026',
    content: 'Join us for the annual alumni meet featuring networking sessions, campus tours, and cultural programs. All alumni are invited to reconnect with classmates and professors.',
    schedule: new Date('2026-06-15T10:00:00'),
    banner: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800'
  },
  {
    title: 'Tech Talk: AI & Machine Learning',
    content: 'Interactive session on latest trends in AI and ML with industry experts. Learn about career opportunities and emerging technologies.',
    schedule: new Date('2026-05-20T14:00:00'),
    banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800'
  },
  {
    title: 'Career Guidance Workshop',
    content: 'Workshop for current students by successful alumni. Topics include resume building, interview preparation, and career planning.',
    schedule: new Date('2026-05-28T11:00:00'),
    banner: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800'
  },
  {
    title: 'Sports Day - Alumni Edition',
    content: 'Cricket, Football, and Basketball tournaments for alumni. Form your teams and register now for a day of fun and competition.',
    schedule: new Date('2026-07-10T09:00:00'),
    banner: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800'
  },
  {
    title: 'Entrepreneurship Summit',
    content: 'Connect with alumni entrepreneurs and investors. Pitch your startup ideas and learn from successful business owners.',
    schedule: new Date('2026-08-05T10:00:00'),
    banner: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800'
  }
];

// Sample forum topics
const forumTopics = [
  {
    title: 'Job Opportunities in Bangalore',
    description: 'Sharing some great job openings in Bangalore for CS graduates. Please share your experiences and referrals.',
    userIndex: 0
  },
  {
    title: 'Higher Studies - GRE Preparation Tips',
    description: 'Completed my GRE with 325. Happy to share preparation tips and answer questions about applying for MS programs.',
    userIndex: 1
  },
  {
    title: 'Startup Ideas - Looking for Co-founders',
    description: 'Working on an EdTech startup. Looking for technical co-founders from CS/IT background. DM if interested!',
    userIndex: 2
  },
  {
    title: 'Alumni Mentorship Program',
    description: 'Proposing a mentorship program where senior alumni can guide current students. What do you think?',
    userIndex: 3
  },
  {
    title: 'Reunion Plan for Batch of 2020',
    description: 'Planning a reunion for our batch. Please share your availability and suggestions for activities.',
    userIndex: 4
  }
];

// Sample forum comments
const forumComments = [
  { topicIndex: 0, comment: 'Great initiative! I know of few openings at my company. Will share the referral links.', userIndex: 1 },
  { topicIndex: 0, comment: 'Thanks for sharing! Just applied for the SDE position.', userIndex: 2 },
  { topicIndex: 1, comment: 'Would love to know your study plan for Quant section.', userIndex: 0 },
  { topicIndex: 1, comment: 'Congrats on the score! Did you take any coaching or self-study?', userIndex: 3 },
  { topicIndex: 2, comment: 'Sounds interesting! What domain is the startup in?', userIndex: 0 },
  { topicIndex: 3, comment: 'This is a great idea! Count me in as a mentor.', userIndex: 4 },
  { topicIndex: 4, comment: 'Awesome! I am available in August. Let me know the plan.', userIndex: 1 }
];

// Sample gallery images
const galleryImages = [
  { about: 'Campus Main Building - Heritage Architecture', image_path: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800' },
  { about: 'Annual Sports Fest 2025', image_path: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800' },
  { about: 'Computer Lab - New Block', image_path: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800' },
  { about: 'Library - Central Library', image_path: 'https://images.unsplash.com/photo-1568667256549-0943457ab62a?w=800' },
  { about: 'Alumni Meet 2025 Group Photo', image_path: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800' },
  { about: 'Technical Symposium - Robot War', image_path: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800' }
];

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB...\n');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;

    // 1. Seed Courses
    console.log('📚 Seeding Courses...');
    const coursesCollection = db.collection('courses');
    await coursesCollection.deleteMany({});
    const insertedCourses = await coursesCollection.insertMany(courses);
    console.log(`   ✅ Inserted ${Object.keys(insertedCourses.insertedIds).length} courses\n`);

    // 2. Seed AlumnusBio and Users
    console.log('👥 Seeding Users and Alumnus Bio...');
    const usersCollection = db.collection('users');
    const alumnusBioCollection = db.collection('alumnus_bio');
    await usersCollection.deleteMany({ email: { $ne: 'admin@gmail.com' } });
    await alumnusBioCollection.deleteMany({});

    const courseIds = Object.values(insertedCourses.insertedIds);
    const insertedBios = [];

    for (const alumnus of alumnusData) {
      const courseId = courseIds[alumnus.courseIndex];
      const hashedPassword = await bcrypt.hash(alumnus.password, 10);

      const bio = {
        name: alumnus.name,
        gender: alumnus.gender,
        batch: alumnus.batch,
        course_id: courseId,
        email: alumnus.email,
        avatar: alumnus.avatar,
        status: alumnus.status,
        date_created: new Date()
      };
      const bioResult = await alumnusBioCollection.insertOne(bio);
      insertedBios.push(bioResult.insertedId);

      const user = {
        name: alumnus.name,
        email: alumnus.email,
        password: hashedPassword,
        type: 'Alumnus',
        alumnus_id: bioResult.insertedId
      };
      await usersCollection.insertOne(user);
    }
    console.log(`   ✅ Inserted ${alumnusData.length} users and ${insertedBios.length} alumnus bios\n`);

    // Get all user IDs for forum data
    const allUsers = await usersCollection.find({ email: { $in: alumnusData.map(a => a.email) } }).toArray();
    const userIds = allUsers.map(u => u._id);

    // 3. Seed Events
    console.log('📅 Seeding Events...');
    const eventsCollection = db.collection('events');
    await eventsCollection.deleteMany({});
    const insertedEvents = await eventsCollection.insertMany(events);
    console.log(`   ✅ Inserted ${Object.keys(insertedEvents.insertedIds).length} events\n`);

    // 4. Seed Forum Topics
    console.log('💬 Seeding Forum Topics...');
    const forumTopicsCollection = db.collection('forum_topics');
    await forumTopicsCollection.deleteMany({});
    const topicsData = forumTopics.map(t => ({
      title: t.title,
      description: t.description,
      user_id: userIds[t.userIndex],
      date_created: new Date()
    }));
    const insertedTopics = await forumTopicsCollection.insertMany(topicsData);
    const topicIds = Object.values(insertedTopics.insertedIds);
    console.log(`   ✅ Inserted ${topicIds.length} forum topics\n`);

    // 5. Seed Forum Comments
    console.log('💭 Seeding Forum Comments...');
    const forumCommentsCollection = db.collection('forum_comments');
    await forumCommentsCollection.deleteMany({});
    const commentsData = forumComments.map(c => ({
      topic_id: topicIds[c.topicIndex],
      comment: c.comment,
      user_id: userIds[c.userIndex],
      date_created: new Date()
    }));
    const insertedComments = await forumCommentsCollection.insertMany(commentsData);
    console.log(`   ✅ Inserted ${Object.keys(insertedComments.insertedIds).length} forum comments\n`);

    // 6. Seed Gallery
    console.log('🖼️  Seeding Gallery...');
    const galleryCollection = db.collection('gallery');
    await galleryCollection.deleteMany({});
    const insertedGallery = await galleryCollection.insertMany(galleryImages);
    console.log(`   ✅ Inserted ${Object.keys(insertedGallery.insertedIds).length} gallery images\n`);

    console.log('===========================================');
    console.log('🎉 Database seeded successfully!');
    console.log('===========================================');
    console.log('\n📝 Test Credentials:');
    console.log('   Admin: admin@gmail.com / admin123');
    console.log('\n   Alumnus accounts (password: password123):');
    alumnusData.forEach(a => console.log(`   - ${a.email}`));
    console.log('\n===========================================\n');

  } catch (err) {
    console.error('❌ Error:', err);
    throw err;
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

seedDatabase().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
