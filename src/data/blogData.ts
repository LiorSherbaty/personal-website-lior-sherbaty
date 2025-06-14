
import { BlogPost, BlogData } from '../types/blog';

// This file replaces the read-only public/data/blog.json
// It makes the blog content editable.

// Since the original blog.json is not readable, I'm starting with placeholder content
// that follows the structure you requested.
export const blogData: BlogData = {
  posts: [
    {
      id: 1,
      title: "Modernizing Legacy Medical Software: A Tale of Two Microservices",
      excerpt: "An in-depth look at refactoring a monolithic legacy system in the HealthTech space into a modern, scalable microservices architecture using .NET and Azure.",
      date: "2024-05-15T12:00:00.000Z",
      readTime: "12 min read",
      tags: ["Legacy Systems", "Microservices", "HealthTech", ".NET"],
      image: "/data/Pictures/Blog/LegacyModernization.jpg",
      content: "## Executive Summary\n\nThis post details the journey of modernizing a critical legacy medical software application. We'll explore the decision-making process, the technical challenges, and the solution of moving from a monolith to a microservices architecture, highlighting key takeaways for similar projects.\n\n## Problem Statement\n\nThe existing system, while functional, was difficult to maintain, scale, and update, hindering our ability to innovate and respond to market needs. This technical debt led to slower feature development and higher operational risks.\n\n## Solution Approach\n\nWe opted for a phased migration to a microservices architecture, focusing on decoupling key functionalities into independent, containerized services deployed on Azure. This approach allowed for incremental improvements without disrupting core operations."
    },
    {
      id: 2,
      title: "Actionable Performance Tips for .NET 6 Applications",
      excerpt: "Boost your application's speed and efficiency. This post provides practical, real-world tips for optimizing .NET 6 applications, from database access to asynchronous programming.",
      date: "2024-04-22T12:00:00.000Z",
      readTime: "9 min read",
      tags: ["Performance", ".NET 6", "CSharp", "Optimization"],
      image: "/data/Pictures/Blog/DotNetPerformance.jpg",
      content: "## Executive Summary\n\nUnlock the full potential of your .NET 6 applications with these proven performance-tuning techniques. We cover everything from code-level optimizations to architectural patterns that yield significant speed improvements.\n\n## Problem Statement\n\nSlow application performance can lead to poor user experience and increased infrastructure costs. Identifying and fixing performance bottlenecks in a complex .NET application is a common challenge for development teams."
    },
    {
        "id": 3,
        "title": "From University to Team Lead: A Five-Year Journey in Tech",
        "excerpt": "A personal reflection on my career path, from a fresh graduate to leading a software development team. Learn about the key milestones, challenges, and lessons learned along the way.",
        "date": "2024-03-10T12:00:00.000Z",
        "readTime": "8 min read",
        "tags": ["Career", "Leadership", "Soft Skills", "Growth"],
        "image": "/data/Pictures/Blog/CareerPath.jpg",
        "content": "Placeholder content for From University to Team Lead."
    },
    {
        "id": 4,
        "title": "Building Secure-by-Design Defense Systems with Modern C#",
        "excerpt": "An overview of architectural patterns and best practices for developing highly secure and reliable software for the defense industry using C# and .NET.",
        "date": "2024-02-18T12:00:00.000Z",
        "readTime": "15 min read",
        "tags": ["Security", "Defense", "Architecture", "CSharp"],
        "image": "/data/Pictures/Blog/SecureSystems.jpg",
        "content": "Placeholder content for Building Secure-by-Design Defense Systems."
    },
    {
        "id": 5,
        "title": "The Art of Constructive Code Reviews",
        "excerpt": "Improve team collaboration and code quality with effective code review techniques. This guide covers how to give and receive feedback constructively.",
        "date": "2024-01-25T12:00:00.000Z",
        "readTime": "7 min read",
        "tags": ["Code Review", "Best Practices", "Teamwork", "Soft Skills"],
        "image": "/data/Pictures/Blog/CodeReview.jpg",
        "content": "Placeholder content for The Art of Constructive Code Reviews."
    },
    {
        "id": 6,
        "title": "Leading High-Performing Technical Teams",
        "excerpt": "Strategies for effective technical leadership, including fostering a positive culture, mentoring team members, and aligning technical goals with business objectives.",
        "date": "2023-12-30T12:00:00.000Z",
        "readTime": "10 min read",
        "tags": ["Leadership", "Management", "Culture", "Soft Skills"],
        "image": "/data/Pictures/Blog/Leadership.jpg",
        "content": "Placeholder content for Leading High-Performing Technical Teams."
    }
  ]
};
