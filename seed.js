const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const Service = require('./models/Service');
const Blog = require('./models/Blog');
const Contact = require('./models/Contact');
const Testimonial = require('./models/Testimonial');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      Service.deleteMany({}),
      Blog.deleteMany({}),
      Contact.deleteMany({}),
      Testimonial.deleteMany({}),
    ]);

    // Create admin
    await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin',
    });
    console.log('Admin user created');

    // Create skills
    const skillData = [
      { name: 'React.js', percentage: 95, category: 'frontend' },
      { name: 'Next.js', percentage: 92, category: 'frontend' },
      { name: 'Node.js', percentage: 90, category: 'backend' },
      { name: 'Express.js', percentage: 88, category: 'backend' },
      { name: 'MongoDB', percentage: 85, category: 'database' },
      { name: 'Redux', percentage: 82, category: 'frontend' },
      { name: 'Tailwind CSS', percentage: 90, category: 'frontend' },
      { name: 'TypeScript', percentage: 85, category: 'frontend' },
      { name: 'Socket.IO', percentage: 75, category: 'backend' },
      { name: 'AWS', percentage: 70, category: 'devops' },
      { name: 'Render', percentage: 78, category: 'devops' },
      { name: 'Git/GitHub', percentage: 88, category: 'tools' },
    ];
    await Skill.insertMany(skillData);
    console.log('Skills created');

    // Create projects
    const projectData = [
      {
        title: 'Book Management System',
        description: 'A full-stack book management application with user authentication, CRUD operations, and a React-based frontend.',
        category: 'fullstack',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
        images: [{ url: 'https://res.cloudinary.com/demo/image/upload/v1/portfolio/books.png', publicId: 'books' }],
        githubLink: 'https://github.com/pankajkumar/book-management',
        liveLink: 'https://book-management.vercel.app',
        featured: true,
      },
      {
        title: 'Crypto Dashboard',
        description: 'Real-time cryptocurrency dashboard with live price tracking, charts, and portfolio management.',
        category: 'fullstack',
        techStack: ['Next.js', 'TypeScript', 'Socket.IO', 'Chart.js', 'Tailwind CSS'],
        images: [{ url: 'https://res.cloudinary.com/demo/image/upload/v1/portfolio/crypto.png', publicId: 'crypto' }],
        githubLink: 'https://github.com/pankajkumar/crypto-dashboard',
        liveLink: 'https://crypto-dashboard.vercel.app',
        featured: true,
      },
      {
        title: 'Vendor Auto Parts',
        description: 'E-commerce platform for auto parts with inventory management, payment integration, and admin panel.',
        category: 'fullstack',
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
        images: [{ url: 'https://res.cloudinary.com/demo/image/upload/v1/portfolio/autoparts.png', publicId: 'autoparts' }],
        githubLink: 'https://github.com/pankajkumar/vendor-autoparts',
        liveLink: 'https://vendor-autoparts.vercel.app',
        featured: false,
      },
      {
        title: 'Fire Safety Equipment Website',
        description: 'Product catalog website for fire safety equipment with search, filtering, and contact form.',
        category: 'frontend',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        images: [{ url: 'https://res.cloudinary.com/demo/image/upload/v1/portfolio/firesafety.png', publicId: 'firesafety' }],
        githubLink: 'https://github.com/pankajkumar/fire-safety',
        liveLink: 'https://fire-safety.vercel.app',
        featured: false,
      },
      {
        title: 'School Management System',
        description: 'Comprehensive school management system with student records, attendance, grades, and reporting.',
        category: 'fullstack',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Ant Design'],
        images: [{ url: 'https://res.cloudinary.com/demo/image/upload/v1/portfolio/school.png', publicId: 'school' }],
        githubLink: 'https://github.com/pankajkumar/school-management',
        liveLink: 'https://school-management.vercel.app',
        featured: true,
      },
    ];
    await Project.insertMany(projectData);
    console.log('Projects created');

    // Create experiences
    const experienceData = [
      {
        company: 'Tech Corp',
        role: 'Senior MERN Stack Developer',
        description: 'Leading development of enterprise web applications using MERN stack. Mentoring junior developers and implementing best practices.',
        type: 'experience',
        techUsed: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
        startDate: new Date('2024-01-01'),
        current: true,
      },
      {
        company: 'Web Solutions Inc',
        role: 'Full Stack Developer',
        description: 'Built and maintained multiple client projects. Implemented REST APIs and integrated third-party services.',
        type: 'experience',
        techUsed: ['Next.js', 'Express', 'PostgreSQL', 'Redis'],
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-12-31'),
        current: false,
      },
      {
        company: 'StartUp Labs',
        role: 'Intern - Full Stack Developer',
        description: 'Assisted in building SaaS platform. Learned agile development and modern web technologies.',
        type: 'internship',
        techUsed: ['React', 'Node.js', 'MongoDB', 'Git'],
        startDate: new Date('2022-06-01'),
        endDate: new Date('2022-12-31'),
        current: false,
      },
      {
        company: 'University of Technology',
        role: 'B.Tech in Computer Science',
        description: 'Focused on software engineering, data structures, algorithms, and web technologies.',
        type: 'education',
        techUsed: ['JavaScript', 'Python', 'Java', 'SQL'],
        startDate: new Date('2020-08-01'),
        endDate: new Date('2024-05-31'),
        current: false,
      },
    ];
    await Experience.insertMany(experienceData);
    console.log('Experiences created');

    // Create services
    const serviceData = [
      {
        title: 'Full Stack Development',
        description: 'End-to-end web application development using MERN stack with modern architecture and best practices.',
        icon: '🚀',
        features: ['React/Next.js Frontend', 'Node.js Backend', 'MongoDB Database', 'RESTful APIs'],
      },
      {
        title: 'REST API Development',
        description: 'Scalable and secure RESTful APIs with proper authentication, validation, and documentation.',
        icon: '🔌',
        features: ['JWT Authentication', 'API Documentation', 'Input Validation', 'Rate Limiting'],
      },
      {
        title: 'Admin Dashboard',
        description: 'Feature-rich admin panels with analytics, data tables, charts, and user management.',
        icon: '📊',
        features: ['Real-time Analytics', 'CRUD Operations', 'Data Visualization', 'Role Management'],
      },
    ];
    await Service.insertMany(serviceData);
    console.log('Services created');

    // Create blogs
    const blogData = [
      {
        title: 'Getting Started with MERN Stack',
        slug: 'getting-started-with-mern-stack',
        excerpt: 'A comprehensive guide to building your first full-stack application with MongoDB, Express, React, and Node.js.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n## Why MERN Stack?\n\nThe MERN stack is one of the most popular tech stacks for building modern web applications. It provides a complete JavaScript-based solution from frontend to backend.\n\n### MongoDB\nMongoDB is a NoSQL database that stores data in flexible, JSON-like documents.\n\n### Express.js\nExpress is a minimal and flexible Node.js web application framework.\n\n### React\nReact is a JavaScript library for building user interfaces.\n\n### Node.js\nNode.js is a JavaScript runtime built on Chrome\'s V8 engine.',
        tags: ['MERN', 'JavaScript', 'Web Development'],
        published: true,
        readTime: 8,
        coverImage: { url: 'https://res.cloudinary.com/demo/image/upload/v1/portfolio/blog-mern.png', publicId: 'blog-mern' },
      },
      {
        title: 'Understanding React Hooks',
        slug: 'understanding-react-hooks',
        excerpt: 'Deep dive into React Hooks - useState, useEffect, useContext, and custom hooks with practical examples.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. React Hooks revolutionized how we write React components. They allow you to use state and other React features without writing a class.\n\n## useState\nThe useState hook lets you add state to functional components.\n\n## useEffect\nThe useEffect hook lets you perform side effects in functional components.\n\n## Custom Hooks\nYou can create your own Hooks to reuse stateful logic between components.',
        tags: ['React', 'Hooks', 'Frontend'],
        published: true,
        readTime: 6,
        coverImage: { url: 'https://res.cloudinary.com/demo/image/upload/v1/portfolio/blog-hooks.png', publicId: 'blog-hooks' },
      },
      {
        title: 'Node.js Best Practices',
        slug: 'nodejs-best-practices',
        excerpt: 'Essential best practices for building secure and scalable Node.js applications in production.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Node.js has become a cornerstone of modern web development. Here are some best practices to follow.\n\n## Security\n- Use HTTPS\n- Validate input\n- Implement rate limiting\n\n## Performance\n- Use async/await\n- Implement caching\n- Optimize database queries\n\n## Code Organization\n- Follow MVC pattern\n- Use environment variables\n- Implement proper error handling',
        tags: ['Node.js', 'Backend', 'Best Practices'],
        published: true,
        readTime: 7,
        coverImage: { url: 'https://res.cloudinary.com/demo/image/upload/v1/portfolio/blog-nodejs.png', publicId: 'blog-nodejs' },
      },
    ];
    await Blog.insertMany(blogData);
    console.log('Blogs created');

    // Create testimonials
    const testimonialData = [
      {
        name: 'Rahul Sharma',
        role: 'CEO',
        company: 'Tech Corp',
        avatar: 'https://i.pravatar.cc/150?img=1',
        content: 'Working with Pankaj was an absolute pleasure. He delivered our project on time and exceeded our expectations. Highly recommended!',
        rating: 5,
        featured: true,
      },
      {
        name: 'Priya Patel',
        role: 'Project Manager',
        company: 'Web Solutions Inc',
        avatar: 'https://i.pravatar.cc/150?img=5',
        content: 'Excellent technical skills and great communication. He understood our requirements perfectly and implemented them flawlessly.',
        rating: 5,
        featured: true,
      },
      {
        name: 'Amit Verma',
        role: 'CTO',
        company: 'StartUp Labs',
        avatar: 'https://i.pravatar.cc/150?img=3',
        content: 'Pankaj has a deep understanding of the MERN stack. He built our entire platform from scratch and it works like a charm.',
        rating: 4,
        featured: false,
      },
      {
        name: 'Sneha Gupta',
        role: 'Product Owner',
        company: 'Digital Agency',
        avatar: 'https://i.pravatar.cc/150?img=9',
        content: 'Very professional and dedicated developer. He goes above and beyond to ensure client satisfaction. Will definitely work with him again.',
        rating: 5,
        featured: true,
      },
    ];
    await Testimonial.insertMany(testimonialData);
    console.log('Testimonials created');

    console.log('\n✓ Database seeded successfully!');
    console.log('  Admin credentials:');
    console.log(`  Email: ${process.env.ADMIN_EMAIL || 'admin@portfolio.com'}`);
    console.log(`  Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
