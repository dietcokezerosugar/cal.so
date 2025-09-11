# **App Name**: ClassCast

## Core Features:

- PRN Input & Storage: Prompt the user to enter their PRN and store it locally using localStorage. Provide a 'Change PRN' option in settings.
- Group Assignment: Use the `getGroupFromPRN(prn)` function to determine the student's group (A1, A2, etc.) based on their PRN.
- Schedule Display: Fetch and display today’s timetable for the student’s group. Show 'No lectures today 🎉' if there are no classes scheduled.
- Offline fallback: Use static file from the public folder if firestore is unreachable
- Daily Mood Analyzer: Generative AI tool leveraging LLM model to suggest the emotional sentiment (e.g. motivation for attending a lecture or fun time with friends after class) based on a class in schedule.

## Style Guidelines:

- Primary color: Teal (#008080), provides a sense of focus and serenity, creating a conducive environment for learning.
- Secondary color: Soft beige (#F5F5DC), used for backgrounds to ensure readability and reduce eye strain during prolonged use.
- Accent color: Coral (#FF7F50), used sparingly for interactive elements to draw attention without overwhelming the user.
- Font: 'Nunito Sans', sans-serif font for a clean and modern look. Optimized for readability on mobile devices.
- Mobile-first, iOS-inspired design with rounded cards, soft shadows, and ample spacing. Display today's date and group at the top for clarity.
- Smooth fade/slide transitions for loading new screens or data.