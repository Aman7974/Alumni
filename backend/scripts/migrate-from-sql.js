/**
 * SQL to MongoDB Migration Script
 *
 * This script migrates data from the SQL dump to MongoDB collections.
 * Run this script once to populate your MongoDB database with existing SQL data.
 *
 * Usage: node scripts/migrate-from-sql.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {
  User,
  AlumnusBio,
  Career,
  Course,
  Event,
  EventCommit,
  ForumTopic,
  ForumComment,
  Gallery,
  SystemSetting
} from '../models/Index.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni_db';

// SQL data extracted from alumni_db.sql
const sqlData = {
  courses: [
    { id: 1, course: 'BSC', about: '' },
    { id: 6, course: 'MCS', about: '' }
  ],

  alumnus_bio: [
    {
      id: 1,
      name: 'Meet Devin',
      gender: 'male',
      batch: 2022,
      course_id: 1,
      email: 'alumnus@gmail.com',
      connected_to: 'Microsoft dev',
      avatar: 'Public\\Avatar\\image_1712981521646.jpg',
      status: 1,
      date_created: '2024-03-07'
    }
  ],

  users: [
    {
      id: 1,
      name: 'Junaid Rana',
      email: 'admin@gmail.com',
      password: '$2b$10$T3AaDtVF15J2PvFAEOrKge0b6/gWShoQnqoN0gz8MLkyQSUJHqyIC',
      type: 'admin',
      auto_generated_pass: '',
      alumnus_id: 0
    },
    {
      id: 2,
      name: 'Meet Devin',
      email: 'alumnus@gmail.com',
      password: '$2b$10$KP.4g9uiF9kvTQGgRUhym.d7G8CANbljBJVNs9syiaGBT.tllzS3m',
      type: 'alumnus',
      auto_generated_pass: '',
      alumnus_id: 1
    }
  ],

  careers: [
    {
      id: 1,
      company: 'IT Company',
      location: 'Remote',
      job_title: 'Web Developer',
      description: '<p><strong><u>Lorem ipsum</u></strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ol><li><em> Sagittis eu volutpat odio facilisis mauris sit amet massa vitae.</em> In tellus integer feugiat scelerisque varius morbi enim. Orci eu lobortis elementum nibh tellus molestie nunc. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Eleifend donec pretium vulputate sapien nec. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Quam adipiscing vitae proin sagittis nisl rhoncus. Sed viverra ipsum nunc aliquet bibendum. Enim ut sem viverra aliquet eget sit amet tellus. Integer feugiat scelerisque varius morbi enim nunc faucibus.</li><li><em>Viverra justo nec ultrices dui. L</em>eo vel orci porta non pulvinar neque laoreet. Id semper risus in hendrerit gravida rutrum quisque non tellus. Sit amet consectetur adipiscing elit ut. Id neque aliquam vestibulum morbi blandit cursus risus. Tristique senectus et netus et malesuada.</li><li> <em>Amet aliquam id diam maecenas ultricies mi eget mauris. </em>Morbi tristique senectus et netus et malesuada. Diam phasellus vestibulum lorem sed risus. Tempor orci dapibus ultrices in. Mi sit amet mauris commodo quis imperdiet. Quisque sagittis purus sit amet volutpat. Vehicula ipsum a arcu cursus. Ornare quam viverra orci sagittis eu volutpat odio facilisis. Id volutpat lacus laoreet non curabitur. Cursus euismod quis viverra nibh cras pulvinar nunc. Id aliquet lectus proin nibh nisl condimentum id venenatis. Eget nulla facilisi etiam dignissim diam quis enim lobortis. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet.</li></ol>',
      user_id: 1,
      date_created: '2020-10-15 14:14:27'
    },
    {
      id: 2,
      company: 'Rana IT Company',
      location: 'ORIC, BZU',
      job_title: 'IT Specialist',
      description: '<p><strong><em> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </em></strong><u>Sagittis eu volutpat odio facilisis mauris sit </u><em>amet massa vitae. In tellus integer feugiat scelerisque varius morbi enim. Orci eu lobortis elementum nibh tellus molestie nunc. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Eleifend donec pretium vulputate sapien nec. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Quam adipiscing vitae proin sagittis nisl rhoncus. Sed viverra ipsum nunc aliquet bibendum. Enim ut sem viverra aliquet eget sit amet tellus. Integer feugiat scelerisque varius morbi enim nunc faucibus.</em></p><p>Viverra justo nec ultrices dui. Leo vel orci porta non pulvinar neque laoreet. Id semper risus in hendrerit gravida rutrum quisque non tellus. Sit amet consectetur adipiscing elit ut. Id neque aliquam vestibulum morbi blandit cursus risus. Tristique senectus et netus et malesuada. Amet aliquam id diam maecenas ultricies mi eget mauris. Morbi tristique senectus et netus et malesuada. Diam phasellus vestibulum lorem sed risus. Tempor orci dapibus ultrices in. Mi sit amet mauris commodo quis imperdiet. Quisque sagittis purus sit amet volutpat. Vehicula ipsum a arcu cursus. Ornare quam viverra orci sagittis eu volutpat odio facilisis. Id volutpat lacus laoreet non curabitur. Cursus euismod quis viv</p><ol><li>erra nibh cras pulvinar mattis nunc. Id aliquet lectus proin nibh nisl condimentum id venenatis. Eget nulla facilisi etiam dignissim</li></ol><ul><li>diam quis enim lobortis. Lacus suspendisse faucibus interdum p<em>osuere lorem ipsum dolor sit amet.</em></li></ul>',
      user_id: 1,
      date_created: '2020-10-15 15:05:37'
    }
  ],

  events: [
    {
      id: 1,
      title: 'Sports Gala Event',
      content: '<p><em>Anim elit fugiat aliquip ad est proident eiusmod ipsum ipsum ipsum. Veniam eu et esse excepteur non veniam sint dolore nulla pariatur amet nisi sunt</em>. <strong>Fugiat pariatur aliquip magna aliquip eu tempor veniam mollit. Culpa laborum culpa enim velit incididunt ut culpa labore minim eiusmod pariatur sunt duis consequat</strong>. Est magna consectetur nisi veniam cupidatat adipisicing esse anim commodo irure irure laborum id. Amet magna ex ullamco incididunt dolore do velit est id commodo veniam minim non Velit ut amet proident do. Eiusmod elit deserunt ex duis Lorem ea. Dolore minim aliqua pariatur nostrud Lorem cupidatat consectetur. Minim minim labore laborum ex dolore eu proident nostrud sint ex occaecat. Consectetur laborum laborum sint anim ut ea sint exercitation ipsum proident. Cillum exercitation elit est consectetur officia ea incididunt aute cupidatat consequat elit. Excepteur enim laborum reprehenderit tempor elit adipisicing. Ex pariatur incididunt aliquip occaecat do nostrud sunt nisi laboris.</p>',
      schedule: '2024-09-18 02:51:00',
      banner: '',
      date_created: '2024-02-01 14:52:54'
    },
    {
      id: 2,
      title: 'Tik Title',
      content: '<p><em>Event tit<u>k</u></em><u>ssss</u> j<strong>nb</strong></p>',
      schedule: '2024-02-09 06:59:00',
      banner: '',
      date_created: '2024-02-01 14:59:39'
    },
    {
      id: 3,
      title: 'BZU CS EVENT (Laptop)',
      content: '<p><strong style="color: rgba(0, 0, 0, 0.81);">PM Laptop Scheme</strong><span style="color: rgba(0, 0, 0, 0.81);">.... </span><a href="https://junaidrana.vercel.app/" rel="noopener noreferrer" target="_blank" style="color: rgba(0, 0, 0, 0.81);">Rana Junaid Hashim</a><span style="color: rgba(0, 0, 0, 0.81);"> </span><em style="color: rgba(0, 0, 0, 0.81);">velit incididunt ut culpa labore minim eiusmod </em><em>pariatur sunt duis consequat.</em> Est magna consectetur nisi veniam cupidatat adipisicing esse anim commodo irure irure laborum id. <u>Amet magna ex ullamco incididunt dolore do velit est id commodo veniam minim non Veli.</u></p>',
      schedule: '2026-06-06 10:05:00',
      banner: '',
      date_created: '2024-02-19 19:07:28'
    }
  ],

  event_commits: [
    { id: 12, event_id: 1, user_id: 2 },
    { id: 13, event_id: 1, user_id: 1 }
  ],

  forum_topics: [
    {
      id: 4,
      title: 'Lorem Ipsum Topic',
      description: '<h2><strong>Lorem Ipsum</strong></h2><p><strong><em>is simply dummy text of the printing and typesetting industry.</em></strong> <strong><em><u>Lorem Ipsum has been the industry'</u></em></strong>s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&lt;/span&gt;</p>',
      user_id: 1,
      date_created: '2020-10-16 08:31:45'
    },
    {
      id: 7,
      title: 'AI Software Engineer ',
      description: '<h2><strong><em>AI </em></strong><em>World is so</em><strong><em> </em></strong><em>dangerous</em><strong><em>.</em></strong></h2><p><span style="color: rgb(85, 85, 85);">XAMPP is meant only for development purposes. It has certain configuration settings that make it easy to develop locally but that are insecure if you want to have your installation accessible to others.</span></p><ol><li><span style="color: rgb(85, 85, 85);">You have successfully installed XAMPP on this system! Now you can start using Apache, MariaDB, PHP and other components. You can find more info in the&nbsp;</span><a href="http://localhost/dashboard/faq.html" rel="noopener noreferrer" target="_blank" style="color: rgb(94, 137, 73); background-color: rgb(255, 255, 255);">FAQs</a><span style="color: rgb(85, 85, 85);">&nbsp;section or check the&nbsp;</span><a href="http://localhost/dashboard/howto.html" rel="noopener noreferrer" target="_blank" style="color: rgb(94, 137, 73); background-color: rgb(255, 255, 255);">HOW-TO Guides</a><span style="color: rgb(85, 85, 85);">&nbsp;for getting started with PHP applications.</span></li><li><span style="color: rgb(85, 85, 85);">Start the XAMPP Control Panel to check the server status.</span></li><li><span style="color: rgb(85, 85, 85);">XAMPP has been around for more than 10 years – there is a huge community behind it. You can get involved by joining our&nbsp;</span><a href="https://community.apachefriends.org/" rel="noopener noreferrer" target="_blank" style="color: rgb(94, 137, 73); background-color: rgb(255, 255, 255);">Forums</a><span style="color: rgb(85, 85, 85);">, liking us on&nbsp;</span><a href="https://www.facebook.com/we.are.xampp" rel="noopener noreferrer" target="_blank" style="color: rgb(94, 137, 73); background-color: rgb(255, 255, 255);">Facebook</a><span style="color: rgb(85, 85, 85);">, or following our exploits on&nbsp;</span><a href="https://twitter.com/apachefriends" rel="noopener noreferrer" target="_blank" style="color: rgb(94, 137, 73); background-color: rgb(255, 255, 255);">Twitter</a><span style="color: rgb(85, 85, 85);">.</span></li></ol>',
      user_id: 2,
      date_created: '2024-03-03 08:35:04'
    }
  ],

  forum_comments: [
    {
      id: 27,
      topic_id: 4,
      comment: 'wow great... Hello world bro edited',
      user_id: 2,
      date_created: '2024-03-07 12:51:48'
    },
    {
      id: 28,
      topic_id: 4,
      comment: 'thats cool',
      user_id: 1,
      date_created: '2024-03-14 15:58:08'
    }
  ],

  gallery: [
    {
      id: 1,
      image_path: 'Public\\Images\\2_img.jpg',
      about: 'Gallery  img...',
      created: '2024-02-15 20:48:55'
    },
    {
      id: 2,
      image_path: 'Public\\Images\\3_img.jpg',
      about: '3rddd imgg',
      created: '2024-02-15 20:49:32'
    },
    {
      id: 3,
      image_path: 'Public\\Images\\4_img.jpg',
      about: 'Do nostrud adipisicing dolore irure adipisicing. Pariatur non labore ex culpa nisi mollit velit dolore minim ut in reprehenderit proident duis. Quis sint qui veniam est ut. Exercitation enim mollit dolore cillum mollit cillum cupidatat anim mollit duis duis.',
      created: '2024-02-15 20:49:47'
    },
    {
      id: 4,
      image_path: 'Public\\Images\\5_img.jpg',
      about: 'Laborum ad minim cupidatat proident do eiusmod fugiat officia ea est exercitation eu. Nulla esse ex pariatur et. Reprehenderit consectetur ullamco non commodo aliquip exercitation commodo. Ex nisi aliquip amet Lorem ut deserunt tempor occaecat nisi fugiat cupidatat. Minim reprehenderit tempor amet est tempor commodo aute.',
      created: '2024-02-15 20:50:02'
    }
  ],

  system_settings: [
    {
      id: 1,
      name: 'Alumni- BZU',
      email: 'cs@bzu.edu.pk',
      contact: '(+92) 61 9210134',
      cover_img: '1602738120_pngtree-purple-hd-business-banner-image_5493.jpg',
      about_content: 'Bahauddin Zakariya University is located in Multan, Punjab, Pakistan. It is the Largest university of South Punjab. Bahauddin Zakariya University was formerly known as Multan University. It was renamed in honour of Hazrat Baha-ud-din Zakariya (RA). Bahauddin Zakariya University has 10 Faculties, 2 Sub-Campuses (Lodhran & Vehari) and 80 Departments and it is offering 94 Undergraudate Programs, 69 Graduate(MS) Programs, 48 Graduate (PhD) Programs, 36 BS(5th Semester) Programs, 5 ADP Programs, 13 Diploma Programs and 13 Short Courses. There are total 646 faculty members, in which 494 faculty members are PhD degree holders.\r\n<br/><center><h3>Department of Computer Science</h2></center><br/>Established: 1995.\r\nThe Department provides an excellent educational environment that aims at bringing out the best. Our curriculum encompasses the recommendation of IEEE and ACM joint committee on CS Curriculum, National Curriculum Revision Committee, and duly approved by the HEC, MoE and MoST.'
    }
  ]
};

// ID mapping for SQL to MongoDB ObjectId conversion
const idMap = {
  users: new Map(),
  alumnus_bio: new Map(),
  courses: new Map(),
  events: new Map(),
  forum_topics: new Map()
};

async function migrate() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('\n🗑️  Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      AlumnusBio.deleteMany({}),
      Career.deleteMany({}),
      Course.deleteMany({}),
      Event.deleteMany({}),
      EventCommit.deleteMany({}),
      ForumTopic.deleteMany({}),
      ForumComment.deleteMany({}),
      Gallery.deleteMany({}),
      SystemSetting.deleteMany({})
    ]);
    console.log('✅ Collections cleared');

    // 1. Migrate Courses first (referenced by AlumnusBio)
    console.log('\n📚 Migrating Courses...');
    for (const course of sqlData.courses) {
      const doc = await Course.create({
        _id: course.id,
        course: course.course,
        about: course.about || ''
      });
      idMap.courses.set(course.id, doc._id);
      console.log(`   - Course: ${course.course}`);
    }

    // 2. Migrate Alumnus Bio
    console.log('\n🎓 Migrating Alumnus Bio...');
    for (const bio of sqlData.alumnus_bio) {
      const doc = await AlumnusBio.create({
        _id: bio.id,
        name: bio.name,
        gender: bio.gender.charAt(0).toUpperCase() + bio.gender.slice(1).toLowerCase(), // Normalize: 'male' -> 'Male'
        batch: bio.batch,
        course_id: idMap.courses.get(bio.course_id),
        email: bio.email,
        connected_to: bio.connected_to,
        avatar: bio.avatar.replace(/\\/g, '/'), // Normalize path separators
        status: bio.status === 1,
        date_created: new Date(bio.date_created)
      });
      idMap.alumnus_bio.set(bio.id, doc._id);
      console.log(`   - Alumnus: ${bio.name} (${bio.email})`);
    }

    // 3. Migrate Users
    console.log('\n👤 Migrating Users...');
    for (const user of sqlData.users) {
      const doc = await User.create({
        _id: user.id,
        name: user.name,
        email: user.email.toLowerCase(),
        password: user.password,
        type: user.type.charAt(0).toUpperCase() + user.type.slice(1).toLowerCase(), // Normalize: 'admin' -> 'Admin'
        alumnus_id: user.alumnus_id > 0 ? user.alumnus_id : null
      });
      idMap.users.set(user.id, doc._id);
      console.log(`   - User: ${user.name} (${user.email}) - ${doc.type}`);
    }

    // 4. Migrate Careers
    console.log('\n💼 Migrating Careers...');
    for (const career of sqlData.careers) {
      const doc = await Career.create({
        _id: career.id,
        company: career.company,
        location: career.location,
        job_title: career.job_title,
        description: career.description,
        user_id: idMap.users.get(career.user_id),
        date_created: new Date(career.date_created)
      });
      console.log(`   - Career: ${career.job_title} at ${career.company}`);
    }

    // 5. Migrate Events
    console.log('\n📅 Migrating Events...');
    for (const event of sqlData.events) {
      const doc = await Event.create({
        _id: event.id,
        title: event.title,
        content: event.content,
        schedule: new Date(event.schedule),
        banner: event.banner || '',
        date_created: new Date(event.date_created)
      });
      idMap.events.set(event.id, doc._id);
      console.log(`   - Event: ${event.title}`);
    }

    // 6. Migrate Event Commits
    console.log('\n✅ Migrating Event Commits...');
    for (const commit of sqlData.event_commits) {
      await EventCommit.create({
        _id: commit.id,
        event_id: idMap.events.get(commit.event_id),
        user_id: idMap.users.get(commit.user_id)
      });
      console.log(`   - Event Commit: User ${commit.user_id} -> Event ${commit.event_id}`);
    }

    // 7. Migrate Forum Topics
    console.log('\n💬 Migrating Forum Topics...');
    for (const topic of sqlData.forum_topics) {
      const doc = await ForumTopic.create({
        _id: topic.id,
        title: topic.title,
        description: topic.description,
        user_id: idMap.users.get(topic.user_id),
        date_created: new Date(topic.date_created)
      });
      idMap.forum_topics.set(topic.id, doc._id);
      console.log(`   - Forum Topic: ${topic.title}`);
    }

    // 8. Migrate Forum Comments
    console.log('\n📝 Migrating Forum Comments...');
    for (const comment of sqlData.forum_comments) {
      await ForumComment.create({
        _id: comment.id,
        topic_id: idMap.forum_topics.get(comment.topic_id),
        comment: comment.comment,
        user_id: idMap.users.get(comment.user_id),
        date_created: new Date(comment.date_created)
      });
      console.log(`   - Forum Comment: User ${comment.user_id} on Topic ${comment.topic_id}`);
    }

    // 9. Migrate Gallery
    console.log('\n🖼️  Migrating Gallery...');
    for (const item of sqlData.gallery) {
      await Gallery.create({
        _id: item.id,
        image_path: item.image_path.replace(/\\/g, '/'), // Normalize path separators
        about: item.about,
        created: new Date(item.created)
      });
      console.log(`   - Gallery: ${item.image_path}`);
    }

    // 10. Migrate System Settings
    console.log('\n⚙️  Migrating System Settings...');
    for (const setting of sqlData.system_settings) {
      await SystemSetting.create({
        _id: setting.id,
        name: setting.name,
        email: setting.email.toLowerCase(),
        contact: setting.contact,
        cover_img: setting.cover_img,
        about_content: setting.about_content
      });
      console.log(`   - System: ${setting.name}`);
    }

    console.log('\n✅ Migration completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Courses: ${sqlData.courses.length}`);
    console.log(`   - Alumnus Bio: ${sqlData.alumnus_bio.length}`);
    console.log(`   - Users: ${sqlData.users.length}`);
    console.log(`   - Careers: ${sqlData.careers.length}`);
    console.log(`   - Events: ${sqlData.events.length}`);
    console.log(`   - Event Commits: ${sqlData.event_commits.length}`);
    console.log(`   - Forum Topics: ${sqlData.forum_topics.length}`);
    console.log(`   - Forum Comments: ${sqlData.forum_comments.length}`);
    console.log(`   - Gallery: ${sqlData.gallery.length}`);
    console.log(`   - System Settings: ${sqlData.system_settings.length}`);

  } catch (err) {
    console.error('❌ Migration error:', err);
    throw err;
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

// Run migration
migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
