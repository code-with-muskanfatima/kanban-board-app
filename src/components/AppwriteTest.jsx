// // src/components/AppwriteTest.jsx
// import React from 'react';
// import { databases, ID, DATABASE_ID, COLLECTION_ID } from '../appwriteConfig';

// function AppwriteTest() {
//   const handleTest = async () => {
//     try {
//       const payload = {
//         title: 'Portfolio Website',
//         description:
//           'Creating a portfolio website is one of the essential web development project ideas for beginners.',
//         date: '2025-07-10', // stored as string
//         image: 'https://via.placeholder.com/300', // must be string (URL)
//         links: [
//           'https://github.com/yourrepo',
//           'https://linkedin.com/in/yourprofile',
//           'https://figma.com/file/yourfigmafile',
//         ],
//         status: 'todo',
//       };

//       const response = await databases.createDocument(
//         DATABASE_ID,
//         COLLECTION_ID,
//         ID.unique(),
//         payload
//       );

//       console.log('✅ Document successfully created:', response);
//       alert('✅ Document created! Check your Appwrite dashboard.');
//     } catch (error) {
//       console.error('❌ Error creating document:', error.message);
//       alert('❌ Failed to create document. Check console.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>📦 Appwrite Test</h2>
//       <p>Click below to send a test document to your Appwrite database.</p>
//       <button onClick={handleTest}>🚀 Create Test Document</button>
//     </div>
//   );
// }

// export default AppwriteTest;
