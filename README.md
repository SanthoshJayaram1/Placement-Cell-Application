# Placement Cell Web Application

This is a web application designed to help a company manage and maintain data related to student interviews and job placements. Employees can use this application to input data into the database and download it in CSV format. This README provides an overview of the project and instructions on how to set it up on a local system.

## Deployed Application

You can access the deployed application here: [Placement Cell Web Application](https://placement-cell-web-application.onrender.com/)

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [External Jobs List (Bonus Feature)](#external-jobs-list-bonus-feature)
- [CSV Data Download](#csv-data-download)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

A company needs to maintain a database of student interviews and job placements. This web application provides an interface for employees to input data and view it later. The following details are stored in the database:
- Batch
- Student Details (including college, status: placed, not_placed)
- Course Scores (DSA Final Score, WebD Final Score, React Final Score)
- Interviews (company name and Date)
- Results (mapping between company and student, contains result: PASS, FAIL, On Hold, Didn't Attempt)

## Features

- **User Authentication**: Employees can sign up and sign in to the application.

- **Manage Students**: Users can view a list of students and add new student entries.

- **Manage Interviews**: Users can view a list of interviews and create new interview entries.

- **Allocate Students**: Users can assign students to specific interviews.

- **Mark Results**: Users can select an interview and mark result status for students who attended.

- **Bonus Feature - External Jobs List**: The application fetches real job listings in India for React and Node.js from open APIs. Users can view job listings and apply externally.

- **CSV Data Download**: Users can download a complete CSV file containing student and interview data.

### Getting Started

1. **Navigate to the project directory:**

```shell
cd placement-cell-web-application
2. **Install dependencies:**

```shell
npm install
3. **Set up a local database (e.g., MongoDB) and update the database configuration in .env:**

``shell
DB_URL=your-database-connection-url
4. **Start the development server:**

```shell
npm start
5.**Open your browser and visit http://localhost:3000 to access the application.**

### Folder Structure
The project follows a scalable folder structure:
- **models**:Contains database models.
- **controllers**: Contains route controllers.
- **routes**: Defines API endpoints.
- **views**: Contains HTML templates for rendering pages.
- **public**: Contains public assets (e.g., CSS, JavaScript).
- **config**: Configuration files.
- **assets**: contains scripts and css files.

### CSV Data Download
Users can download a complete CSV file containing the following columns:
- Student id
- Student name
- Student college
- Student status
- DSA Final Score
- WebD Final Score
- React Final Score
- Interview date
- Interview company
- student result

