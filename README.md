# Medeekit App

## Overview

This application is designed to simplify the management of a home pharmacy by allowing the addition of used medications and searching for potential interactions between 2 or more drugs.
It helps in minimizing errors when using medications with different names that contain similar or identical active substances. Additionally, it can be beneficial for older individuals where the issue of polypharmacy is more commonly encountered.

## Technologies Used

- **Create React App (CRA):** The project is bootstrapped with CRA for a quick and efficient setup.
- **React:** Utilized for building a dynamic and responsive user interface.
- **React Query:** Integrated React Query for efficient data fetching, caching, and state management. React Query simplifies data handling.
- **RxNorm API:** Implemented RxNorm API for searching drug interactions. RxNorm is a free API that provides standardized names for clinical drugs.
- **Prettier:** A code formatter that ensures consistent and readable code.

## Drug Interaction Search Process

The application employs RxNorm API to search for drug interactions. Due to the intricate process of querying the API from the frontend, which involves first finding the ID of the selected drug in the RxNorm database and then searching for interactions, the code is quite elaborate. Ongoing efforts include connecting a NoSQL database for medications and transferring some queries to the server-side to streamline the application.

## Getting Started

To start using the Medication Explorer app, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/akhsudop/medeekit-app.git
   ```

2. Install dependencies using npm:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

4. In a separate terminal window initialize json server by:

   ```bash
   npx json-server -p 3500 -w data/db.json
   ```

- **Note** Use 0.17.4 version of the json-server.

## Next

- **Database Integration:** Currently working on integrating a NoSQL database for medication information.
- **Server-Side Queries:** Exploring the transition of some queries to the server-side for improved efficiency.

Feel free to explore the application and provide any feedback!
