// export default function ProjectContent({content}) {
//   return (
//     <div className="w-[1250px] ml-4 mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
// {/* BookNest is an innovative library management system designed to simplify and enhance the way libraries function. It offers a user-friendly platform where librarians, readers, and administrators can seamlessly interact with the library’s resources. With a blend of technology and simplicity, BookNest transforms traditional library operations into a modern, efficient, and enjoyable experience.  
// <br />
// <b>A Centralized Platform for Library Management:</b>  
// BookNest serves as a central hub where all library operations are streamlined. From cataloging books to managing user records, everything can be done with just a few clicks. Its intuitive interface allows librarians to organize their collections effectively, ensuring that every resource is easily accessible. The platform supports various media types, including books, journals, e-books, and digital files, making it a versatile choice for libraries of all sizes.  
// <br />
// <b>Effortless Cataloging and Organization:</b> 
// With BookNest, cataloging library resources becomes a breeze. The system enables librarians to input detailed metadata about each item, including title, author, publication date, genre, and more. Advanced search and filter options make it easy for users to locate specific resources, even in extensive collections. The software also supports barcode scanning, further simplifying the process of adding or checking out materials.  
// <br />
// <b>Seamless Borrowing and Returns:</b> 
// BookNest is designed to make borrowing and returning library resources effortless for both readers and librarians. Users can view available books, reserve titles, and even receive reminders about due dates. The automated system tracks all transactions, reducing the likelihood of errors and ensuring transparency. Librarians can monitor overdue items and generate reports to maintain accountability.  
// <br />
// <b>Reader Engagement and Insights:</b>
// BookNest goes beyond basic management by offering features that engage readers and encourage participation. Personalized user dashboards allow readers to track their borrowing history, create wishlists, and receive recommendations based on their preferences. Additionally, the system generates insights and analytics, helping librarians understand trends in resource usage and make data-driven decisions.  
// <br />
// <b>Scalability and Adaptability:</b> 
// Whether you're managing a small community library or a large institutional collection, BookNest adapts to meet your needs. Its scalable architecture ensures that it can handle growing collections and user bases without compromising performance. Cloud integration allows for remote access, ensuring that BookNest remains a reliable tool for modern libraries.  
// <br />
// <b>Secure and Reliable:</b> 
// BookNest places a high priority on data security and privacy. With encrypted databases and secure user authentication, the system ensures that sensitive information remains protected. Regular backups and updates further enhance the platform's reliability, providing peace of mind to librarians and administrators.  
// <br />
// <b>An Eco-Friendly Solution:</b>
// By digitizing library operations, BookNest contributes to a greener planet. It reduces the need for paper-based systems, minimizing waste and promoting sustainability. With its digital reservation system, users can access resources without the need for physical forms or notices.  
// <br />
// <b>Conclusion:</b>
// BookNest is more than just a library management system—it’s a comprehensive solution that creates a cozy digital environment for managing books, engaging readers, and optimizing library operations. By combining simplicity with powerful features, BookNest empowers libraries to thrive in the digital age while staying true to their mission of fostering knowledge and learning. */}
//     {content}
//     </div>
//   );
// }

export default function ProjectContent({ content }) {
  return (
    <div className="w-[1250px] ml-4 mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
      {content ? (
        <p className="text-lg text-gray-800">{content}</p>
      ) : (
        <p className="text-gray-500 italic">No description available.</p>
      )}
    </div>
  );
}
