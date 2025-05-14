// import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Github, 
  Linkedin, 
  Mail,
  FileText
} from 'lucide-react/dist/esm/icons';
import BlockchainBackground from './components/BlockchainBackground';
import CodeEditor from './components/CodeEditor';
import './fireText.css';
import { useState } from 'react';
import ContactChain from './components/ContactChain';

const projects = [
  {
    title: "Arnacon Protocol",
    desc: "Web3 Telecom Infrastructure - Decentralized Communication Protocol",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    link: "https://www.arnacon.com"
  },
  {
    title: "Cellact Integration",
    desc: "Enterprise-grade VoIP solutions with blockchain security",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    link: "https://github.com/daBatmanCoder"
  },
  {
    title: "ZK Inheritance",
    desc: "Privacy-preserving inheritance solution using zero-knowledge proofs",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
    link: "https://github.com/daBatmanCoder"
  }
];

function ProjectCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = () => {
    setActiveIndex((current) => (current + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden relative h-[500px] rounded-2xl">
        <div className="absolute flex transition-transform duration-500 ease-out w-full h-full"
             style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="w-full h-full flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-full bg-gray-900 overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 
                           transition-all duration-500 scale-105 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                      <p className="text-lg text-gray-200">{project.desc}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600/80 backdrop-blur-sm hover:bg-blue-700 
                                 text-white px-6 py-3 rounded-lg transition-all 
                                 duration-300 hover:scale-105"
                      >
                        View Project →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevProject}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600/80 hover:bg-blue-700 
                   text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 
                   hover:scale-110 z-10"
      >
        ←
      </button>
      <button
        onClick={nextProject}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600/80 hover:bg-blue-700 
                   text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 
                   hover:scale-110 z-10"
      >
        →
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
                      ${activeIndex === index ? 'bg-blue-600 scale-125' : 'bg-gray-400'}`}
            title={`Project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true });
  const [editorRef, editorInView] = useInView({ triggerOnce: true });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      <BlockchainBackground />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center relative"
      >
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-7xl font-bold mb-8 font-space-grotesk tracking-tight fire-text animate-float">
              <span className="relative inline-block">J</span>
              <span className="relative inline-block">o</span>
              <span className="relative inline-block">n</span>
              <span className="relative inline-block">a</span>
              <span className="relative inline-block">t</span>
              <span className="relative inline-block">h</span>
              <span className="relative inline-block">a</span>
              <span className="relative inline-block">n</span>
              <span className="relative inline-block">&nbsp;</span>
              <span className="relative inline-block">K</span>
              <span className="relative inline-block">a</span>
              <span className="relative inline-block">n</span>
              <span className="relative inline-block">d</span>
              <span className="relative inline-block">e</span>
              <span className="relative inline-block">l</span>
            </h1>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://github.com/daBatmanCoder" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Github size={32} />
              </a>
              <a 
                href="https://www.linkedin.com/in/jonathan-kandel/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Linkedin size={32} />
              </a>
              <a 
                href="mailto:jonakandel@gmail.com?subject=Let's%20Connect!&body=Hi%20Jonathan,%0D%0A%0D%0AI came across your portfolio and would love to discuss potential opportunities or collaborations.%0D%0A%0D%0ABest regards," 
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Mail size={32} />
              </a>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-blue-400 transition-colors"
              >
                <FileText size={32} />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Code Editor Section */}
      <motion.section
        ref={editorRef}
        initial="hidden"
        animate={editorInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="min-h-screen py-20 bg-black bg-opacity-50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">Expertise</h2>
          <CodeEditor />
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        ref={projectsRef}
        initial="hidden"
        animate={projectsInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">Featured Projects</h2>
          <ProjectCards />
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <ContactChain />
        </div>
      </motion.section>
    </div>
  );
}

export default App;