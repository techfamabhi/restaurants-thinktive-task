# Ranch Management System
Overview
This project is a simple Ranch Management System built using React.js. It allows users to add ranch data, store it locally using localStorage, and display the ranch data with pagination.

# Features 

 Add Ranch: Users can enter details about a ranch including name, contact information, location, etc., and save it.
 ![add](https://github.com/user-attachments/assets/4d93cb81-268b-4efb-9607-686f89ee1acd)

Display Ranch: View all entered ranches with pagination to manage large datasets effectively.
![Home Screen](https://github.com/user-attachments/assets/b816c772-7e1c-4c92-a26e-501011984c91)

Validation 
![validation](https://github.com/user-attachments/assets/c5a01c7b-01f5-4c4f-87d4-a7bc6f0f7ff6)

LocalStorage: Utilizes browser's localStorage for data persistence between sessions.

# Technologies Used
Frontend: React.js
Routing: React Router
Styling: Bootstrap for CSS framework
Data Persistence: localStorage for storing ranch data locally


# Setup Instructions
Clone the repository:

bash
Copy code
git clone <repository-url>
cd ranch-management-system
Install dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
npm start
# This will start the development server. Open http://localhost:3000 to view it in the browser.

# Usage
Adding Ranch Data
Navigate to the Add Ranch page by clicking on the "Add Ranch" button in the navigation bar.
Fill in the required details for the ranch.
Click on the "Add Ranch" button to save the ranch data.
Success message will be displayed using toast message.
Displaying Ranch Data
Navigate to the Display Ranch page by clicking on the "Display Ranch" link in the navigation bar.
Ranch data will be displayed in a table with pagination.
Pagination allows navigating through multiple pages of ranch data, with each page displaying up to 4 records.
Data Persistence
Ranch data is stored locally using localStorage. This allows the application to maintain data between browser sessions.



# Folder Structure
src/components: Contains React components for different parts of the application (Add Ranch, Display Ranch, Sidebar, TopNav).
src/App.js: Main component where routing is defined.
src/DisplayRanch.js: Entry point of the React application.
src/AddData.js:To Add New Ranch.


