# Medication Management App

## Overview

I have developed an application that facilitates the management of medications. The app allows user to search for drugs from a medication database (stored using JSON Server) based on their names and active substances. User can add selected medications to personal 'pharmacy' and explore potential interactions between them.

## Technologies Used

- **Create React App (CRA):** The project is bootstrapped with CRA for a quick and efficient setup.
- **React:** Utilized for building a dynamic and responsive user interface.
- **React Query:** Integrated React Query for efficient data fetching, caching, and state management. React Query simplifies data handling.
- **RxNorm API:** Implemented RxNorm API for searching drug interactions. RxNorm is a free API that provides standardized names for clinical drugs.

## Drug Interaction Search Process

The application employs RxNorm API to search for drug interactions. Due to the intricate process of querying the API from the frontend, which involves first finding the ID of the selected drug in the RxNorm database and then searching for interactions, the code is quite elaborate. Ongoing efforts include connecting a NoSQL database for medications and transferring some queries to the server-side to streamline the application.

## Using app

- **Before npm start** initialize json server by **npx json-server data/db.json**
- **Warning!** You should have the latest version of json-server installed globally

## Work in Progress

- **Database Integration:** Currently working on integrating a NoSQL database for medication information.
- **Server-Side Queries:** Exploring the transition of some queries to the server-side for improved efficiency.

Feel free to explore the application and provide any feedback!
