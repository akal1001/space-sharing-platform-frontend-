# Space Sharing Rental Platform – Frontend (Angular)

## Overview
This repository contains the **frontend web application** for the Space Sharing Rental Platform, built using **Angular**.

The frontend provides a user-friendly interface for browsing rental spaces, creating and managing listings, saving favorites, and interacting with a backend REST API. It enhances the user experience by automatically displaying region-relevant listings and contextual city information.

---

## Tech Stack

- **Framework:** Angular  
- **Language:** TypeScript  
- **UI Technologies:** HTML, CSS  
- **API Communication:** RESTful APIs  
- **Authentication:** Token-based authentication (via backend API)  
- **External Services:** Ipinfo (IP-based geolocation), OpenAI  

---

## My Role
I built this frontend application **end-to-end as a solo developer**.

My responsibilities included:
- Designing and implementing the user interface using Angular
- Integrating frontend components with backend REST APIs
- Implementing authentication flows and protected routes
- Managing application state and user interactions
- Integrating external services for location-aware and AI-generated content
- Ensuring responsive and user-friendly design

---

## Key Features
- User registration and login
- Create, update, and delete rental space listings
- Save favorite listings for quick access
- Responsive UI optimized for different screen sizes
- **Location-aware search** using IP-based geolocation (Ipinfo) to display listings relevant to the user’s **country, state, and city**
- **Hierarchical region filtering** based on country → state → city
- **Contextual city information display** by passing location data to OpenAI to generate basic, user-friendly descriptions of the area

---

## Architecture

**High-level flow:**  
Angular Frontend → Backend REST API (separate repository) → AWS Lambda → SQL Server  

The frontend is implemented as a **single-page application (SPA)** that communicates with the backend through HTTP requests and dynamically updates content based on user location and API responses.

---

## Backend API
This frontend consumes a **separate backend REST API** built with **.NET Core** and deployed using **AWS serverless services**.

> Note: This repository focuses exclusively on frontend functionality.

---

## Setup & Running the Project
- This project is **not configured for local execution**.
- The application requires backend API endpoints to be available.
- Environment-specific configuration (such as API base URLs) is required.

> This repository is intended to demonstrate frontend architecture, UI design, API integration, and external service usage rather than provide a runnable demo.

---

## Demo & Media
- Live demo: Not available  
- Screenshots: Not available  

---

## Key Learnings
- Building modular and maintainable Angular applications
- Integrating frontend applications with RESTful backend services
- Managing authentication and protected routes in Angular
- Implementing **location-aware filtering** using IP-based geolocation and hierarchical region data
- Integrating **OpenAI** to generate contextual, location-based content for improved user experience
- Structuring a scalable SPA for real-world applications

---

## Future Improvements
- Improve UI/UX design and accessibility
- Add advanced filtering and sorting options
- Enhance performance and loading behavior
- Introduce caching for location and AI-generated content

---

## Final Notes
This project demonstrates practical frontend development using Angular, real-world API integration, location-aware UX design, and responsible use of AI-generated content.
