import React from 'react';
import './ProjectSpherecss.css'; // Ensure you have this CSS file for styling
// import logo from './Logo.png'; // Commented out due to missing file
// import profile from './profile.png'; // Commented out due to missing file
// import img1 from './img-1.jpg'; // Commented out due to potential error
// import img2 from './img-2.avif'; // Commented out due to potential error
// import img3 from './img-3.avif'; // Commented out due to potential error
// import img4 from './img-4.png'; // Commented out due to potential error

const LibraryManagementSystem = () => {
  return (
    <div style={{ backgroundImage: 'linear-gradient(#BCFFEF,#DEFAFF,white, #DEFAFF,#BCFFEF)' }}>
      <header className="header">
        <img id="logo" src="/logo.png" alt="Logo" /> {/* Using logo from public folder */}

        <div id="rightprofile">
          <img id="profile" src="/profile.png" alt="Profile Icon" /> {/* Using profile image from public folder */}
          <p>Profile</p>
        </div>
      </header>

      <div id="title">
        <h2>Library Management System</h2>
      </div>

      <div id="description">
        <h3 className="subtitles">Creators:</h3>
        <ol id="names">
          <li>David Almeida</li>
          <li>Joshua Jaison</li>
          <li>Anurodh Chandanshiv</li>
          <li>Stavan Kalkumbe</li>
        </ol>

        <p className="subtitles">
          <strong id="manage">Domain:</strong> Management
        </p>

        <h3 className="subtitles">Technologies used:</h3>
        <ul id="tech">
          <li>Front-end: HTML, CSS, JavaScript</li>
          <li>Back-end: PHP</li>
          <li>Database: SQL</li>
        </ul>
      </div>

      <div className="scroll-container">
        {/* <img src={img1} alt="Image 1" /> // Commented out due to potential error */}
        {/* <img src={img2} alt="Image 2" /> // Commented out due to potential error */}
        {/* <img src={img3} alt="Image 3" /> // Commented out due to potential error */}
        {/* <img src={img4} alt="Image 4" /> // Commented out due to potential error */}
      </div>

      <p className="body">
        A <b>Library Management System (LMS)</b> is a digital solution for managing and organizing a library's operations efficiently. It includes features for cataloging, tracking inventory, managing book lending and returns, and maintaining user records.
        <ul className="body">
          <h4>Features:</h4>
          <li>Catalog Management: Add, update, or remove books from the library catalog.</li>
          <li>Inventory Tracking: Monitor stock levels and check for available/issued books.</li>
          <li>User Management: Manage member accounts, track user activity, and view borrowing history.</li>
          <li>Book Lending and Returns: Streamlined borrowing and return process with automated reminders.</li>
          <li>Reports and Analytics: Generate reports on usage trends and library statistics.</li>
        </ul>
      </p>

      <div id="ref">
        <h3>Similar Reference Links</h3>
        <a href="https://www.researchgate.net/publication/373137554_Library_Management_System_Mini_Project_Report">
          https://www.researchgate.net/publication/373137554_Library_Management_System_Mini_Project_Report
        </a>
      </div>

      <button id="downloadbutton">Download Report</button>

      <div id="rate">
        <h3>Rate this Project</h3>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </div>

      <div id="comment">
        <h3>Comments</h3>
        <textarea
          name="feedback"
          id="commentbox"
          placeholder="Type here"
          rows="14"
          cols="50"
        ></textarea>
        <br />
        <input id="submit " type="submit" value="Submit" />
      </div>

      <div id="commentview">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="commentview-1">
            This website makes managing my library account a breeze! I can search for books, check availability, and even reserve titles from home. It’s great to get notifications about due dates and overdue items, so I don’t have to worry about missing returns. A perfect resource for book lovers and students alike!
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryManagementSystem;