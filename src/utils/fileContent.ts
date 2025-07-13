// src/utils/fileContent.ts

/**
 * This object acts as a simple in-memory database for file contents.
 * The keys are identifiers (e.g., 'about.md') that would be stored in a
 * FileItem's `content` property. The values are the string content of the files.
 * In a real-world application, this data might be fetched from a server or a CMS.
 */
const fileContentDatabase: { [key: string]: string } = {
  // ===== Personal & Info Files =====
  'about.md': `
# About Me

Hello! I'm a passionate Full Stack Developer with over 5 years of experience building robust and scalable web applications. My expertise lies in creating seamless user experiences with React and TypeScript, powered by efficient backend services in Node.js and Python.

- **Experience**: 5+ Years
- **Projects Completed**: 50+
- **Core Technologies**: React, Node.js, TypeScript, PostgreSQL

I thrive in collaborative environments and am always eager to learn new things and tackle challenging problems. I have a proven track record of delivering high-quality code and working on projects that have served over a million users.
  `,

  'skills.md': `
# Technical Skills

Here is a summary of my technical expertise, which I continuously work to expand.

### Frontend
- **Languages/Frameworks**: TypeScript, JavaScript (ES6+), React, Next.js
- **Styling**: Tailwind CSS, CSS-in-JS, SASS
- **State Management**: Redux, Zustand, React Query
- **Testing**: Jest, React Testing Library

### Backend
- **Languages/Frameworks**: Node.js, Express.js, Python, Django
- **Databases**: PostgreSQL, MongoDB, Redis
- **APIs**: REST, GraphQL

### DevOps & Cloud
- **Cloud Platforms**: AWS (EC2, S3, Lambda, RDS), Vercel
- **Containerization**: Docker
- **CI/CD**: GitHub Actions, Jenkins
  `,

  'contact.txt': `
# Get In Touch

I am currently open to new opportunities and collaborations.

- **Email**: Khaled.Salleh@example.com
- **LinkedIn**: [linkedin.com/in/KhaledSalleh](https://linkedin.com/in/KhaledSalleh)
- **GitHub**: [github.com/KhaledSalleh](https://github.com/KhaledSalleh)

For pricing inquiries regarding freelance projects or to discuss a potential role, please reach out via email. I look forward to hearing from you.
  `,

  // ===== Project Files =====
  'project-dashboard.ts': `
/*
 * Project: Real-time Analytics Dashboard
 * Tech Stack: React, TypeScript, D3.js, Node.js, WebSocket
 *
 * This project involved building a highly interactive and performant dashboard
 * to visualize real-time user activity.
 */

import { createDashboard } from 'dashboard-lib';

/**
 * Initializes the main dashboard application.
 * It features customizable widgets and a responsive design powered by React.
 * The backend uses Node.js to push data over WebSockets.
 */
export function initializeApp(containerId: string) {
  const container = document.getElementById(containerId);
  if (container) {
    createDashboard(container, {
      apiEndpoint: 'wss://api.example.com/data',
      theme: 'dark',
      user: 'Khaled.Salleh'
    });
    console.log('Dashboard initialized with React and TypeScript.');
  }
}
  `,

  'project-api.js': `
/**
 * Project: E-commerce Platform API
 * Tech Stack: Node.js, Express, MongoDB, JWT, Docker
 * Description: A RESTful API for a full-featured e-commerce platform.
 */
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Connect to MongoDB Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// API Routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
  `,

  'readme.md': `
# Portfolio Source Code

Welcome to the source code for my personal portfolio website.

This project is built with **React** and **TypeScript** and styled with **Tailwind CSS**. It's designed to be a living document that showcases my skills, experience, and projects in an interactive way.

The file explorer and search functionality are custom-built components designed to mimic a real development environment. The search is powered by a simple, client-side search engine.
  `
};

/**
 * Provides string content for various file types (Markdown, JSON, raw code).
 * This is used by the search engine and terminal to display file contents.
 */
export const getFileContent = (contentId: string): string => {
  const contentMap: Record<string, string> = {
    'about-main': `import React from 'react';
import { Code, Coffee, Heart } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Khaled Salleh
          </h1>
          <p className="text-xl text-gray-300 mb-6">Full Stack Developer</p>
          <div className="flex justify-center items-center space-x-4 text-gray-400">
            <Code className="w-6 h-6" />
            <span>Crafting digital experiences</span>
            <Coffee className="w-6 h-6" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <p className="text-gray-300 leading-relaxed">
              I'm a passionate Full Stack Developer with 5+ years of experience 
              building scalable web applications. I love turning complex problems 
              into simple, beautiful designs.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">What I Do</h2>
            <ul className="text-gray-300 space-y-2">
              <li>• Frontend Development (React, TypeScript)</li>
              <li>• Backend Development (Node.js, Python)</li>
              <li>• Database Design (PostgreSQL, MongoDB)</li>
              <li>• Cloud Deployment (AWS, Docker)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};`,

    'projects-main': `import React from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform built with React, Node.js, and PostgreSQL",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
    github: "https://github.com/KhaledSalleh/ecommerce",
    live: "https://myecommerce.demo.com",
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    tech: ["Python", "Django", "WebSockets", "React", "PostgreSQL"],
    github: "https://github.com/KhaledSalleh/taskmanager",
    live: "https://taskmanager.demo.com",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "Weather API Service",
    description: "RESTful API service providing weather data with caching and rate limiting",
    tech: ["Node.js", "Express", "Redis", "MongoDB", "Docker"],
    github: "https://github.com/KhaledSalleh/weather-api",
    live: "https://api.weather.demo.com",
    image: "/api/placeholder/400/250"
  }
];

export const Projects = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Featured Projects</h1>
          <p className="text-xl text-gray-300">
            Here are some of my recent works that showcase my skills and experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a href={project.github} className="flex items-center text-blue-400 hover:text-blue-300">
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </a>
                  <a href={project.live} className="flex items-center text-green-400 hover:text-green-300">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`,

    'project1': `import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Heart, Filter } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  inStock: boolean;
}

export const ECommerceApp = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProducts: Product[] = [
        { id: 1, name: "Wireless Headphones", price: 99.99, rating: 4.5, image: "/headphones.jpg", category: "electronics", inStock: true },
        { id: 2, name: "Running Shoes", price: 129.99, rating: 4.8, image: "/shoes.jpg", category: "sports", inStock: true },
        { id: 3, name: "Coffee Maker", price: 79.99, rating: 4.2, image: "/coffee.jpg", category: "home", inStock: false },
        { id: 4, name: "Smartphone", price: 699.99, rating: 4.6, image: "/phone.jpg", category: "electronics", inStock: true },
      ];
      
      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">ShopEasy</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="sports">Sports</option>
              <option value="home">Home</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                </div>
                <p className="text-xl font-bold text-blue-600 mb-3">$\${product.price}</p>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className={\`w-full py-2 px-4 rounded-lg font-medium \${
                    product.inStock 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }\`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};`,

    // ...existing code...
  };

  return contentMap[contentId] || `// Content for ${contentId} not found
// This is a placeholder for the ${contentId} file content.
// Add your actual content here.

console.log("Loading ${contentId}...");`;
};