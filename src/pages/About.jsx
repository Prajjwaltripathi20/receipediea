import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaLeaf, FaSearch, FaHeart, FaUserFriends } from 'react-icons/fa';
import Footer from '../components/Footer';
import '../styles/About.css';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Founder & Head Chef',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      bio: 'With over 15 years of culinary experience, Alex founded Resciepe to share his passion for cooking with the world.',
    },
    {
      id: 2,
      name: 'Samantha Lee',
      role: 'Nutritionist',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      bio: 'Samantha ensures all our recipes are nutritionally balanced and provides expert dietary advice.',
    },
    {
      id: 3,
      name: 'Marcus Chen',
      role: 'Food Photographer',
      image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      bio: 'Marcus captures the beauty of our dishes, making them look as good as they taste.',
    },
    {
      id: 4,
      name: 'Priya Patel',
      role: 'Recipe Developer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      bio: 'Priya creates and tests innovative recipes, combining traditional techniques with modern flavors.',
    },
  ];

  // Features data
  const features = [
    {
      id: 'search',
      icon: <FaSearch />,
      title: 'Smart Recipe Search',
      description: 'Find recipes by ingredients, cuisine, diet, or meal type with our powerful search engine.',
    },
    {
      id: 'favorites',
      icon: <FaHeart />,
      title: 'Save Your Favorites',
      description: 'Create a personalized collection of your favorite recipes for quick access anytime.',
    },
    {
      id: 'dietary',
      icon: <FaLeaf />,
      title: 'Dietary Preferences',
      description: 'Filter recipes based on dietary needs including vegetarian, vegan, gluten-free, and more.',
    },
    {
      id: 'community',
      icon: <FaUserFriends />,
      title: 'Join Our Community',
      description: 'Connect with fellow food enthusiasts, share your creations, and get inspired.',
    },
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>About Resciepe</h1>
            <p className="hero-subtitle">Discover the story behind your favorite recipe platform</p>
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="about-mission">
          <div className="mission-content">
            <motion.div 
              className="mission-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Our Mission</h2>
              <p>
                At Resciepe, we believe that cooking should be accessible, enjoyable, and rewarding for everyone. Our mission is to inspire home cooks of all skill levels to explore new flavors, learn essential techniques, and create delicious meals that bring people together.
              </p>
              <p>
                We're committed to providing high-quality, tested recipes that are reliable and achievable, along with the tools and resources you need to succeed in the kitchen. Whether you're a beginner looking to learn the basics or an experienced cook seeking new challenges, Resciepe is here to support your culinary journey.
              </p>
            </motion.div>
            <motion.div 
              className="mission-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="People cooking together" />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="about-features">
          <h2>What Makes Us Special</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.id} 
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <div className="story-content">
            <motion.div 
              className="story-image"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Kitchen with ingredients" />
            </motion.div>
            <motion.div 
              className="story-text"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Our Story</h2>
              <p>
                Resciepe began in 2020 as a small collection of family recipes shared among friends. What started as a passion project quickly grew into a comprehensive platform as more people discovered the joy of cooking with our easy-to-follow recipes.
              </p>
              <p>
                Today, we're proud to offer thousands of recipes from cuisines around the world, all tested and perfected in our test kitchen. Our community has grown to include home cooks from over 150 countries, all united by a love of good food and the desire to create memorable meals.
              </p>
              <p>
                As we continue to grow, our commitment remains the same: to make cooking more accessible, enjoyable, and rewarding for everyone, regardless of their skill level or background.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-team">
          <h2>Meet Our Team</h2>
          <p className="team-intro">The passionate individuals behind Resciepe who work tirelessly to bring you the best culinary experience.</p>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id} 
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values">
          <h2>Our Values</h2>
          <div className="values-container">
            <motion.div 
              className="value-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3>Quality</h3>
              <p>We're committed to providing thoroughly tested recipes that work every time, using ingredients that are accessible to most home cooks.</p>
            </motion.div>
            <motion.div 
              className="value-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3>Inclusivity</h3>
              <p>We celebrate the diversity of global cuisines and strive to make cooking accessible to people of all backgrounds, abilities, and dietary preferences.</p>
            </motion.div>
            <motion.div 
              className="value-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Education</h3>
              <p>We believe in empowering home cooks with knowledge, from basic techniques to advanced skills, helping everyone become more confident in the kitchen.</p>
            </motion.div>
            <motion.div 
              className="value-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3>Community</h3>
              <p>We foster a supportive community where food enthusiasts can connect, share, and learn from each other's experiences and culinary traditions.</p>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;