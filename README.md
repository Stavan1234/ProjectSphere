# ProjectSphere 🚀

**The ultimate student project showcase—discover, upload, and get inspired across all domains.**

ProjectSphere is a web application designed for students to showcase their projects across various domains, allowing them to upload, manage, and share multimedia content such as documents, images, and videos. It serves as a platform for inspiration, learning, and preventing plagiarism in academic projects.

---

## 🌍 Features

- **Student Project Showcase**: Upload and display your project with rich multimedia content.
- **Bookmark Projects**: Save interesting projects for later review, just like a "Watch Later" feature.
- **Search Projects**: Discover projects based on domains, technologies, and keywords.
- **Domain-based Sorting**: Categorized project display, from web development to robotics and more.
- **Multimedia Storage**: Upload images, documents, videos, and more to AWS S3.
- **Responsive Design**: Optimized for both desktop and mobile users with NextUI.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, NextUI, JavaScript
- **Backend**: Supabase (Auth & Database)
- **Multimedia Storage**: AWS S3 Bucket
- **Styling**: TailwindCSS

---

## ⚙️ Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Stavan1234/ProjectSphere.git
   cd ProjectSphere
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create an `.env.local` file**:
   - Set up your environment variables for Supabase and AWS S3 (check `config/ProjectSphereClient.js` for variable names).

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Usage

Once the project is up and running, you can:
- **Sign up / Log in** to access the dashboard.
- **Upload your project**: Add details like title, description, domain, technologies used, and upload multimedia.
- **Search and filter projects** by domain or keywords to discover new ideas.
- **Bookmark** projects you find inspiring.

---

## 🔑 Project Structure

Here's a breakdown of the important folders and files in the project:

```
project-sphere/
├── app/
│   ├── api/                 # API routes for project upload and management
│   ├── bookmarks/           # Bookmark button functionality
│   ├── components/          # Reusable components (UI elements)
│   ├── myprojects/          # User's uploaded projects
│   ├── project_page/        # Individual project detail pages
│   ├── SearchProject/       # Search functionality for projects
├── public/                  # Static files like images and icons
├── lib/                     # Utility functions
├── utils/                   # Miscellaneous helpers
└── README.md                # This file!
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

🏗️ Future Enhancements
- Live Demo: Once deployed, a link will be added here.
- AI Chatbot: An AI chatbot to guide users through the website, answer queries, and help with project uploads and features.
- Community & Threads: A community feature allowing users to interact, share ideas, and discuss projects through threaded discussions.
- AI Suggestions: AI-powered suggestions when a user opens a project, offering related research papers, tools, and resources from the web. These will be displayed like smart search engine results with links to relevant content.
- Gamification: Introduce gamified elements like achievement badges, XP points, leaderboards, and rewards to enhance user engagement and motivation.

---

## 🏆 Status

This project is a **work in progress**, and we’re constantly adding new features and improving the platform.

---

## 📸 Screenshots

![Group 3](https://github.com/user-attachments/assets/b515301f-b3e1-4754-82ca-8a409de71c7a)
![Group 4](https://github.com/user-attachments/assets/38693e27-970d-44d8-9c26-6ed04bc15520)
![Group 5](https://github.com/user-attachments/assets/424dfc82-3152-4005-881d-3fbfb49ddbb1)
![Group 6](https://github.com/user-attachments/assets/0805e2f4-ac25-4844-91d8-c71c591945da)



---

**Ready to explore and contribute? Let's build something awesome together! 🚀**
