PRO-HIRE JOB PORTAL 

A comprehensive job portal ProHire built using React, enabling seamless interactions between job seekers and recruiters. This application includes features for account creation, job searching, application tracking, and more, catering to candidates and recruiters.

Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

For Candidates:
- Account Creation: Sign up and log in securely using Clerk for authentication.
- Job Search: Easily search for jobs using various filters.
- Job Profile Creation: Build a personalized job profile to attract recruiters.
- Job Applications: Apply for jobs with a simple click.
- Application Status Tracking**: Check the status of applications (Rejected, Selected, Interviewing, In Queue).
- Bookmark Jobs: Save jobs for future reference.
- View Applied Jobs: Access a list of all jobs applied for.

## For Recruiters:
- Company Account Creation**: Create and manage a company account.
- Candidate Preferences**: Set preferences for candidate profiles.
- Job Posting**: Post job openings to attract potential candidates.
  Application Management**: Receive and manage applications from candidates.
- Resume Download**: Download resumes submitted by candidates.
- Job Management**: View, edit, pause, or delete job postings.
- Vacancy Management**: Limit the vacancies available for each job posting.
- Candidate Profile Access**: Review candidate profiles to make informed decisions.

## Technologies Used

- React: Frontend library for building user interfaces.
- Clerk: Authentication solution for secure sign-up and login.
- Supabase: Backend-as-a-service for database management.
- Shadcn: UI components for building a responsive and modern interface.
- Tailwind CSS: Utility-first CSS framework for styling.
- Axios: Promise-based HTTP client for data fetching.
- React Hook Form: Library for managing form state and validation.
- Zod: Type-safe schema validation for form data.
- Markdown: For documentation and formatted text.


## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/job-portal.git
   cd job-portal
2. **Install dependencies**
   ```bash
   npm install
4. **Set up environment variables**
   Create a .env file in the root directory and add the following variables (update with your actual credentials):
   ```bash
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   REACT_APP_CLERK_FRONTEND_API=your_clerk_frontend_api

## Usage
After running the application, you can:
- For Candidates: Create an account, complete your profile, search for jobs, and apply directly.
- For Recruiters: Register your company, post job listings, and manage applications from candidates.



