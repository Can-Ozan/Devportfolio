DevPortfolio AI is a next-generation web application that creates an AI-powered, interactive, 3D-animated, and futuristic portfolio for you in seconds—simply by entering your GitHub username.

Without having to write a single line of code, your GitHub repositories, profile data, and Dev.to articles are automatically fetched, analyzed by Google Gemini AI, and presented through a breathtaking “Glassmorphism” interface.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

✨ Why DevPortfolio AI?

While a designer might ask, “How good does it look?”, this project is built to answer the question a software engineer might ask: “How does it work under the hood?”:

🤖 Artificial Intelligence (Gemini 2.5 API): Your portfolios are analyzed to automatically generate a personalized professional biography and one-sentence “AI-Enhanced” descriptions for your open-source projects.

⚡ Ultra Performance: Smooth animations at 60 frames per second (60fps) using LocalStorage caching, Debounce (search), Throttling (scroll optimization), and requestAnimationFrame.

🪟 Premium Glassmorphism UI: Glass effects, blurred (backdrop-blur) backgrounds, neon light leaks, and a futuristic tech grid (Cyber Grid).

🎲 3D Holographic Cards: A 3D tilt effect that adjusts based on your mouse angle when hovering over project cards.

🖱️ Custom Hacker Cursor: A neon cursor that follows your mouse across the page and grows when hovering over interactive elements.

🔗 Dynamic URL Sharing: Share your site as yoursite.com/?user=yourGitHubUsername. When visitors click, your portfolio automatically loads and displays on the screen.

🖨️ PDF Export & Quick Contact: Instantly convert your portfolio into a sleek PDF with a single click, or let your visitors send you an email right away.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🎮 Easter Eggs (Hidden Features)

This portfolio doesn’t just look good—it talks to you!

1. Interactive Terminal: The terminal in the middle of the page isn’t just for show. Click on it, type the commands `whoami`, `skills`, `stats`, or `help`, and press Enter!

2. Matrix Mode: When you go to the terminal, type the “matrix” command and hit Enter, and the background completely transforms into the code rain from the movie “The Matrix.”

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🚀 Local Development

Running the project locally on your computer is very simple:

  1. Clone the repository to your computer:
  
    git clone https://github.com/Can-Ozan/Devportfolio.git

  2. Go to the project directory:
  
    cd devportfolio

  3. Install the required dependencies:

    npm install

  4. API Configuration: Add your own Google Gemini API key to the `apiKey` variable in the `src/App.jsx` file.
  </br>

  5. Start the development server:

    npm run dev
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🌍 Deployment

  This project has been optimized to go live on Vercel in a matter of seconds (production-ready).

1. Go to the Vercel dashboard and import your GitHub repository.

2. Vite will be automatically detected as the framework.

3. Click the Deploy button. (No other settings are required!)

    
