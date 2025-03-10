# hoya-devs-bounty-website

Overview

This is a Vite-powered React application that facilitates small job or code task applications from clients. The submitted jobs are displayed for club members, allowing them to claim and complete quick side jobs.

Features

Client Job Submission: Clients can fill out a form to submit coding-related tasks.

Job Listing Display: All submitted jobs are displayed in a structured format for club members.

Job Claiming System: Members can claim jobs to work on them.

Database Integration: Uses Supabase for storing and retrieving job data.

Responsive UI: Ensures smooth experience across devices.

Tech Stack

Frontend: Vite, React, Tailwind CSS

Backend: Supabase

State Management: React Hooks

Installation & Setup

Clone the repository:

git clone https://github.com/yourusername/job-board.git
cd job-board

Install dependencies:

npm install

Create a .env file and configure Supabase credentials:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

Start the development server:

npm run dev

Usage

Clients submit jobs via the form.

Jobs are displayed in a feed where club members can browse.

Members can claim a job and complete the task.
