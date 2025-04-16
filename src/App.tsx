import React, { useState, useEffect } from 'react';
import { Users, Trophy, Award, Star } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Mail, ExternalLink, Code,
  GraduationCap, MapPin, Send, Terminal,
  Mic, ChevronDown, Sun, Moon
} from 'lucide-react';
import './index.css';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
          currentSection = section.id;
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    const messageInput = form.querySelector('textarea') as HTMLTextAreaElement;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Validate inputs
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      const response = await fetch('https://my-portfolio-server-beryl.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });
      console.log(await response.json())
      if (response.ok) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  // Add scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'}`}>
      {/* Navbar */}
      <motion.nav 
        className={`fixed w-full ${darkMode ? 'bg-gray-900/20' : 'bg-white/20'} backdrop-blur-lg z-50 py-3 px-6 shadow-sm`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            BATTU ARAVIND KUMAR
          </motion.h1>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-4">
              {['home', 'about', 'experience', 'achievements', 'skills', 'projects', 'education', 'interests', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative px-3 py-1 rounded-md capitalize ${
                    activeSection === item
                      ? darkMode 
                        ? 'text-purple-400 font-medium' 
                        : 'text-purple-600 font-medium'
                      : darkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                  } transition-all duration-200`}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: darkMode ? 'rgba(107, 114, 128, 0.2)' : 'rgba(243, 244, 246, 0.8)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  {activeSection === item && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 30, opacity: 0 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -30, opacity: 0 }}
                  >
                    <Moon className="w-5 h-5 text-indigo-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>
            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full ${darkMode ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30' : 'bg-gradient-to-r from-indigo-200/50 to-purple-200/50'} blur-3xl`}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className={`absolute top-1/3 right-1/4 w-80 h-80 rounded-full ${darkMode ? 'bg-gradient-to-r from-teal-900/30 to-cyan-900/30' : 'bg-gradient-to-r from-teal-200/50 to-cyan-200/50'} blur-3xl`}
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [45, 0, 45],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className={`absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full ${darkMode ? 'bg-gradient-to-r from-rose-900/30 to-pink-900/30' : 'bg-gradient-to-r from-rose-200/50 to-pink-200/50'} blur-3xl`}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -45, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:pr-8"
          >
            <h2 className={`text-lg ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} font-semibold mb-2`}>Hello, I'm</h2>
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              BATTU ARAVIND KUMAR
            </motion.h1>
            <motion.p 
              className={`text-lg sm:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Founder and Lead of <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Placements and Career Tutelage (PACT)</span>, dedicated to mentoring and uplifting peers through tech leadership.
            </motion.p>
            <motion.div 
              className="flex space-x-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <SocialLink href="https://github.com/aravindkumar67" icon={<Github />} darkMode={darkMode} />
              <SocialLink href="https://www.linkedin.com/in/battu-aravind-kumar-02906a23b" icon={<Linkedin />} darkMode={darkMode} />
              <SocialLink href="mailto:akaravindkumar67@gmail.com" icon={<Mail />} darkMode={darkMode} />
            </motion.div>
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dfghtpoxp/image/upload/v1744737775/PassPort_Image_less_azniec.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${darkMode ? 'bg-purple-900/20' : 'bg-blue-500/10'} rounded-full`}></div>
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'} animate-bounce`} />
        </motion.div>
      </section>

      {/* About Me */}
      <section id="about" className={`py-20 ${darkMode ? 'bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h2>
          <motion.div
            className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-6 text-center`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Hello! I'm BATTU ARAVIND KUMAR, a CSE graduate from Kalasalingam University, passionate about technology, leadership, and mentoring. Hailing from Andhra Pradesh, I thrive on organizing and inspiring peer learning.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              As the Founder & Lead of PACT, I've driven initiatives like mock interviews and upskilling programs. I've proudly led teams to the SIH 2023 Grand Finale and the IDE Bootcamp, earning recognition from AICTE & MIC. Skilled in Java, SQL, and Web Development, I also enjoy motivating others, public speaking, and exploring teaching techniques.
            </motion.p>
          </motion.div>
        </div>
      </section>
            {/* Experience */}
            <section id="experience" className={`py-20 ${darkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-white via-gray-50 to-white'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            Professional Experience
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ExperienceCard 
              title="Founder and Lead"
              company="Placements and Career Tutelage (PACT)"
              period="Dec 2024 - May 2025"
              description={[
                "Founded and led PACT initiative to enhance student placement readiness",
                "Orchestrated comprehensive training programs and mock interviews",
                "Led a team of 40 members, improving placement success rates",
                "Established industry partnerships for guest lectures"
              ]}
              darkMode={darkMode}
            />
            <ExperienceCard 
              title="Student Advisor"
              company="KARE ACM-W CHAPTER"
              period="June 2024 - Dec 2024"
              description={[
                "Mentored students in professional development",
                "Organized workshops on emerging technologies",
                "Facilitated networking and knowledge sharing",
                "Promoted diversity in computing"
              ]}
              darkMode={darkMode}
            />
            <ExperienceCard 
              title="Mentor and Trainer"
              company="Personal Mentoring"
              period="Dec 2024 - Present"
              description={[
                "Mentoring 50+ students in technical skills",
                "Conducting mock interviews and coding sessions",
                "Developing structured learning paths",
                "Creating placement preparation resources"
              ]}
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>

      {/* Achievements Highlight Section */}
      <section id="achievements" className={`py-16 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Key Achievements
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AchievementCard
              title="Placement Success"
              description="Placed in 4 companies: LTIMindtree, Capgemini, TCS, and L&T Technology Services"
              icon={<Star className="w-6 h-6" />}
              darkMode={darkMode}
              link="https://www.linkedin.com/posts/battu-aravind-kumar-02906a23b_dear-all-happy-to-share-the-triple-offer-activity-7275006847911174145-Hm_t"
            />
            <AchievementCard
              title="Team Lead - SIH 2023"
              description="Led team to Top 5 position among 700+ teams in Smart India Hackathon Senior Grand Finale 2023"
              icon={<Trophy className="w-6 h-6" />}
              darkMode={darkMode}
              link="https://www.linkedin.com/posts/battu-aravind-kumar-02906a23b_kalasalingam-smartindiahackathon-grandfinale-activity-7169933731376381953-4AtN"
            />
            <AchievementCard
              title="Team Lead - IDE Bootcamp"
              description="Led team to Best Performing Team Award in Innovation Design and Entrepreneurship bootcamp by AICTE & MIC"
              icon={<Award className="w-6 h-6" />}
              darkMode={darkMode}
              link="https://www.linkedin.com/posts/cse-kare_dear-all-our-iii-year-cse-students-participated-activity-7192165558501441537-4T6u"
            />
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical Skills
          </motion.h2>
          <motion.div
            className={`p-4 sm:p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Java", level: 90 },
                { name: "Python", level: 85 },
                { name: "JavaScript", level: 80 },
                { name: "DSA", level: 85 },
                { name: "SQL", level: 90 },
                { name: "Spring & Spring Boot", level: 85 },
                { name: "Java Swing", level: 80 },
                { name: "HTML/CSS", level: 90 }
              ].map((skill) => (
                <div 
                  key={skill.name}
                  className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} flex items-center justify-between space-x-3`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                      <Code className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} truncate`}>
                      {skill.name}
                    </span>
                  </div>
                  <div className="w-20 h-1.5 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <motion.div 
                      className={`h-full rounded-full ${darkMode ? 'bg-purple-500' : 'bg-purple-600'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
            {/* Projects */}
            <section id="projects" className={`py-16 ${darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard 
              title="WildGuard: Automated Barrier System"
              description="Developed a real-time animal detection system using MobileNetV2 CNN, trained on 111,226+ augmented images. Integrated IoT-based response mechanisms for wildlife conservation."
              tech={['Deep Learning', 'Python', 'YOLO', 'IoT', 'Ultrasonic Sensors']}
              githubLink="https://github.com/aravindkumar67/WildGuard"
              image="https://res.cloudinary.com/dfghtpoxp/image/upload/v1744738224/wildguard_tjw7nx.png"
              darkMode={darkMode}
            />
            <ProjectCard 
              title="Water Footprint Calculator"
              description="Digital platform for calculating water footprints in daily usage items, helping users understand and reduce their water consumption."
              tech={['Web Development', 'JavaScript', 'React']}
              githubLink="https://aquametrics4all.onrender.com/"
              image="https://res.cloudinary.com/dfghtpoxp/image/upload/v1744738223/SIH_2023_logo_wwq7bi.webp"
              darkMode={darkMode}
            />
            <ProjectCard 
              title="Tic-Tac-Toe Game"
              description="Developed a feature-rich Tic-Tac-Toe game with MySQL database integration for player profile management and persistent gameplay."
              tech={['Java', 'JavaFX', 'MySQL', 'JDBC']}
              githubLink="https://github.com/aravindkumar67/Tic-Tac-toe-Game-using-JavaFX-"
              image="https://res.cloudinary.com/dfghtpoxp/image/upload/v1744738223/tic_tac_toe_ldxcmf.jpg"
              darkMode={darkMode}
            />
            <ProjectCard 
              title="Electricity Billing System"
              description="Developed a comprehensive electricity billing system with user interface for managing and calculating electricity consumption."
              tech={['Java', 'Swing', 'File Handling']}
              githubLink="https://github.com/aravindkumar67/Electricity-Billing-System-Using-FIle-Handling"
              image="https://res.cloudinary.com/dfghtpoxp/image/upload/v1744738223/Electricity-Bill-Management-System_ib9jmt.webp"
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className={`py-20 ${darkMode ? 'bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>
          <motion.div
            className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white/50 border-gray-100'} border shadow-lg relative overflow-hidden backdrop-blur-sm`}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Bachelor of Technology in Computer Science</h3>
                <p className="text-indigo-500 font-medium">Kalasalingam Academy of Research and Education</p>
              </div>
              <span className={`${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-500'} px-3 py-1 rounded-full text-sm`}>2021 - 2025</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>CGPA: 9.16/10</span>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Given 10+ hands-on seminars",
                "Published 2 research works",
                "Led teams in national level hackathons and bootcamps",
                "Active participation in extra and co-curricular activities"
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GraduationCap className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mt-1 flex-shrink-0`} />
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
      {/* Hobbies & Interests Section */}
<section id="interests" className={`py-20 ${darkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-white via-gray-50 to-gray-50'}`}>
  <div className="max-w-4xl mx-auto px-6">
    <motion.h2 
      className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Hobbies & Interests
    </motion.h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <InterestCard title="Mentoring" icon={<Users />} darkMode={darkMode} />
      <InterestCard title="Public Speaking" icon={<Mic />} darkMode={darkMode} />
      <InterestCard title="Coding" icon={<Code />} darkMode={darkMode} />
      <InterestCard title="Leadership" icon={<Award />} darkMode={darkMode} />
      <InterestCard title="Organizing" icon={<Terminal />} darkMode={darkMode} />
      <InterestCard title="Learning" icon={<GraduationCap />} darkMode={darkMode} />
    </div>
  </div>
</section>
      {/* Publications Section */}
      <section id="publications" className={`py-20 ${darkMode ? 'bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            Publications
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PublicationCard
              title="WildGuard: Automated Barrier System for Animal Attack Prevention"
              description="Published in SCOPUS-indexed journal. Research paper on automated wildlife detection and prevention system using deep learning and IoT."
              darkMode={darkMode}
            />
            <PublicationCard
              title="IoT-Based Pulse Rate Monitoring System with Anomaly Detection and Automated Alerts"
              description="Published in SCOPUS-indexed journal. Applied for patent and secured 4 Lakhs funding. Research on healthcare monitoring system."
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>
      {/* Contact */}
      <section id="contact" className={`py-20 ${darkMode ? 'bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold">Contact Information</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Feel free to reach out for collaborations or just a friendly hello. You can also schedule an interview, get your resume reviewed, or have an audio call through Unikcon.ai.
              </p>
              <div className="space-y-4">
                <ContactInfo icon={<Mail />} text="akaravindkumar67@gmail.com" darkMode={darkMode} />
                <ContactInfo icon={<MapPin />} text="Ongole, Andhra Pradesh, India" darkMode={darkMode} />
                <ContactInfo icon={<ExternalLink />} text="unikcon.ai/profile/aravindkumar" darkMode={darkMode} />
              </div>
              <div className="flex space-x-4 pt-4">
                <SocialLink href="https://github.com/aravindkumar67" icon={<Github />} darkMode={darkMode} />
                <SocialLink href="https://www.linkedin.com/in/battu-aravind-kumar-02906a23b" icon={<Linkedin />} darkMode={darkMode} />
                <SocialLink href="mailto:akaravindkumar67@gmail.com" icon={<Mail />} darkMode={darkMode} />
                <SocialLink href="https://unikcon.ai/profile/aravindkumar" icon={<ExternalLink />} darkMode={darkMode} />
              </div>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} shadow-lg`}
              onSubmit={handleSubmit}
            >
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    required
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-lg"
                  type="submit"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BATTU ARAVIND KUMAR</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Full Stack Developer & Tech Lead</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['home', 'about', 'experience', 'achievements', 'skills', 'projects', 'education', 'contact'].map((item) => (
                  <motion.li 
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <button
                      onClick={() => scrollToSection(item)}
                      className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} capitalize`}
                    >
                      {item}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <SocialLink href="https://github.com/aravindkumar67" icon={<Github />} darkMode={darkMode} />
                <SocialLink href="https://www.linkedin.com/in/battu-aravind-kumar-02906a23b" icon={<Linkedin />} darkMode={darkMode} />
                <SocialLink href="mailto:akaravindkumar67@gmail.com" icon={<Mail />} darkMode={darkMode} />
              </div>
            </div>
          </div>
          <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>&copy; {new Date().getFullYear()} BATTU ARAVIND KUMAR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
// Component Definitions
function SocialLink({ href, icon, darkMode }: { href: string; icon: React.ReactNode; darkMode: boolean }) {
  return (
    <motion.a
      href={href}
      className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gradient-to-r from-purple-600 to-blue-500'} text-white hover:shadow-lg transition-all`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </motion.a>
  );
}

function ExperienceCard({ title, company, period, description, darkMode }: { 
  title: string; 
  company: string; 
  period: string; 
  description: string[];
  darkMode: boolean;
}) {
  return (
    <motion.div 
      className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} border shadow-lg relative overflow-hidden group`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
      <div className="relative z-10">
        <div className="flex flex-col space-y-2 mb-4">
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <p className="text-purple-500 font-medium">{company}</p>
          <span className={`${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-500'} px-3 py-1 rounded-full text-sm w-fit`}>{period}</span>
        </div>
        <ul className="space-y-3">
          {description.map((item, index) => (
            <motion.li 
              key={index} 
              className="flex items-start space-x-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Terminal className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ProjectCard({ title, description, tech, githubLink, image, darkMode }: { 
  title: string; 
  description: string; 
  tech: string[]; 
  githubLink: string;
  image: string;
  darkMode: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(image);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc('/images/placeholder.svg');
    }
  };

  return (
    <motion.div 
      className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} border shadow-lg group h-full flex flex-col`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-auto">
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{description}</p>
        </div>
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((item, index) => (
              <span 
                key={index} 
                className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-600 text-purple-400' : 'bg-purple-100 text-purple-800'}`}
              >
                {item}
              </span>
            ))}
          </div>
          <motion.a 
            href={githubLink}
            className={`inline-flex items-center ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} text-sm`}
            whileHover={{ x: 5 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project <ExternalLink className="ml-1 w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  darkMode: boolean;
  link?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, description, icon, darkMode, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br ${darkMode ? 'from-gray-800 to-gray-900' : 'from-white to-gray-50'} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-lg`}>
          {icon}
        </div>
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      </div>
      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} transition-colors`}
        >
          View Achievement
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      )}
    </motion.div>
  );
};

function InterestCard({ title, icon, darkMode }: {
  title: string;
  icon: React.ReactNode;
  darkMode: boolean;
}) {
  return (
    <motion.div
      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} border shadow-sm text-center`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-600 text-purple-400' : 'bg-purple-100 text-purple-600'} mb-2 mx-auto w-fit`}>
        {icon}
      </div>
      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</span>
    </motion.div>
  );
}

function ContactInfo({ icon, text, darkMode }: { icon: React.ReactNode; text: string; darkMode: boolean }) {
  return (
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-600 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
        {icon}
      </div>
      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{text}</span>
    </div>
  );
}

function PublicationCard({ title, description, darkMode }: {
  title: string;
  description: string;
  darkMode: boolean;
}) {
  return (
    <motion.div
      className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white/50 border-gray-100'} border shadow-lg relative overflow-hidden backdrop-blur-sm`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-5"></div>
      <div className="relative z-10">
        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
      </div>
    </motion.div>
  );
}

export default App;