# Lendsqr Frontend Engineer Assessment Documentation

🛠 What I Built

Developed a responsive Lendsqr Admin Dashboard with:

Login page (with show/hide password feature).

In the entirety of this project I used typescript, react and SCSS.

I had to create an email and password for easy access to the site. (See below)
EMAIL:- admin@lendsqr.com
PASSWORD:- admin123

Dashboard layout with topbar and sidebar. The Dashboard page shows two cards of Old and New Years Details.

Users list page with filter icons for organization, username, email, phone number, date joined, and status.

User details page accessible on click with 500 mock user from JSON.com. The back to User button, the activate and deactivate button which also works.

The pagination buttons which shows the number of pages. All working.

Responsive design for both mobile and desktop views.
The mobile views do have a quite different look from the desktop view.





🎯 Reasons for My Approach & Decisions

1. SCSS Modules:

Used SCSS for modular, clean, and maintainable styling.
Ensured variables, nesting, and media queries were easy to manage.



2. Flex and Grid Layouts:

Applied CSS Grid to the dashboard cards for easy reordering on smaller screens.
Used Flexbox for sidebar and topbar alignment and responsiveness.



3. Component-based Structure:

Broke down pages into reusable components (DashboardLayout, Sidebar, Topbar, UserCard) for scalability.



4. Responsive Design Decisions:

Ensured sidebar becomes hidden on smaller screens with a hamburger menu to enhance UX.
Reduced dashboard cards width on smaller screens to display user list and details fully.



5. Topbar Fixes:

Adjusted topbar positioning and z-index to avoid overlapping the users list on scroll.



6. Show/Hide Password:

Implemented toggle without border to improve login form aesthetics.



7. Deployment on Vercel:

Chose Vercel for its fast CI/CD integration with GitHub and ease of setup.



✅ Final Outcome

The dashboard is fully responsive, with clean UI, easy navigation between pages, and a clear, accessible login interface. All functionalities match the requirements provided in the assessment brief.



Tech Stack & Justification:

React (with Vite): React was used for building reusable UI components, and Vite was chosen for its fast build time and efficient development experience.

TypeScript: Used as required, to ensure type safety, catch bugs early during development, and improve code maintainability.

SCSS: Used for styling to provide nesting, variables, and cleaner modular CSS, making the styling more manageable across components.

React Router: For routing between views like login, dashboard, user details, and settings, ensuring a smooth SPA experience.

Component Structure: Components were broken down into small reusable parts such as DashboardCard, UserTable, and UserDetails for clarity, scalability, and ease of maintenance.

Responsive Design: Media queries and flex/grid layouts were used to ensure the layout adapts well on various screen sizes.

Deployment (Vercel): The app was deployed to Vercel for quick, scalable, and free hosting with auto-redeploy on push.




⚠ Challenges Faced

This I believe is one of the most Challenging works I've done in recent times. I faced the most issues trying to add the Media query for full responsive design.

Sidebar overlapping user details on mobile. This was about issue I faced while trying to make sure that in smaller screens everything shows up well.

Fixed with media queries and topbar positioning adjustments.


Filter icons not showing initially. But at the end of the day I was able to find out where the problem was.

Resolved by ensuring correct src path and z-index stacking.

