# Sim Game: University Track & Field/Cross Country Simulation Game

Sim Game is a **track and field/cross country simulation game** inspired by basketball-gm. Players manage a university team, recruit high school athletes, train them, and compete in meets to score points and win championships. The game simulates real-world mechanics, including regular seasons, playoffs, and offseasons, with detailed schedules and dynamic gameplay.

---

## Features

- **Team Management**: Manage university teams with players specializing in long-distance, short-distance, and field events.
- **Recruitment**: Recruit high school athletes each offseason.
- **Schedule Simulation**: Generate yearly schedules, including regular seasons, playoffs, and offseason activities.
- **Playoff Elimination**: All teams compete in the playoffs, progressively eliminating half the teams until a winner is crowned.
- **Dynamic Seasons**: Automatically generate schedules and rosters for each new year.
- **Dark Mode**: Built-in dark mode for an immersive experience, persisted across sessions.
- **Modern UI**: Beautiful, responsive interface with customizable themes (coming soon).

---

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (with `src/app` directory structure)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) for persistent client-side storage
- **Testing**: [Jest](https://jestjs.io/) for unit testing
- **Hosting**: [Azure](https://azure.microsoft.com/) -- (future release)

---

## Directory Structure

Here's a breakdown of the major directories and files in the project (as of Nov 18, 2024):

```plaintext
src/
├── app/                        # Application pages and layouts
│   ├── games/                  # Dynamic routes for managing games
│   │   ├── [gameId]/           # Game-specific views
│   │   │   ├── schedule/       # League schedule view
│   │   │   ├── teams/          # Team-specific views
│   │   │   │   ├── [teamId]/   # Dynamic team routes
│   │   │   │   │   ├── schedule/ # Team schedule view
│   │   │   ├── players/        # Dynamic player routes
│   ├── layout.tsx              # Root layout with navigation and theme
│   ├── page.tsx                # Home page
├── components/                 # Reusable UI components
│   ├── Sidebar.tsx             # Sidebar navigation for in-game views
│   ├── Header.tsx              # Page header
├── constants/                  # Shared constants
│   ├── raceTypes.ts            # Race types by season
│   ├── seasonPhases.ts         # Weekly phases of the game
├── data/                       # IndexedDB logic
│   ├── storage.ts              # Data storage and retrieval
│   ├── idTracker.ts            # ID generation for players, teams, and meets
├── logic/                      # Game logic
│   ├── gameSetup.ts            # Initialize new games
│   ├── scheduleGenerator.ts    # Generate league and team schedules
│   ├── simulation.ts           # Weekly simulation logic
│   ├── meetGenerator.ts        # Helper for creating meets
│   ├── raceGenerator.ts        # Generate races for meets
│   ├── offseason.ts            # Handle offseason transitions
├── types/                      # TypeScript interfaces and types
│   ├── game.ts                 # Game object structure
│   ├── team.ts                 # Team object structure
│   ├── player.ts               # Player object structure
│   ├── schedule.ts             # Schedule, meet, and race structures
├── types/                      # Jest Tests

```

---

## Gameplay Workflow

### **1. Starting a New Game**
- Users create a new game by specifying the number of teams and players per team.
- The game initializes with:
  - Team schedules and rosters
  - Regular season schedules for cross-country or track & field

### **2. Simulating Weeks**
- Each week advances the game’s schedule:
  - **Regular Season**: Teams compete in weekly meets.
  - **Playoffs**: All teams participate, with progressive elimination rounds.
  - **Offseason**: Players graduate, new recruits join, and rosters are managed.

### **3. Viewing Data**
- **League Schedule**: Displays all scheduled meets for the active year.
- **Team Schedule**: Shows a team’s participation in the active year.
- **Player Details**: View individual player stats and traits.

### **4. Yearly Reset**
- At the start of a new year:
  - Old schedules are cleared.
  - New regular season schedules are generated.
  - The game advances to the next year.

---

## Key Features

### **1. Dark Mode**
- Fully integrated dark mode for all pages, with persistence across sessions.

### **2. Dynamic Routing**
- League, team, and player pages are dynamically generated based on game data.

### **3. IndexedDB Persistence**
- Game data (teams, players, schedules, IDs) is stored in IndexedDB for offline access and session continuity.

### **4. Modular Codebase**
- All major functionalities are split into reusable modules, ensuring scalability and maintainability.

---

## Future Enhancements

- **Customizable Themes**: Allow users to modify color schemes and UI elements.
- **Enhanced Playoff Logic**: Add detailed matchups and in-game strategies.
- **Player Stats**: Introduce detailed tracking for player performance across seasons.
- **Recruiting Dynamics**: Make recruiting dependent on player traits and team performance.
- **Online Multiplayer**: Enable multiple users to compete in the same league.

---


## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/wyochris/sim-game.git
   cd sim-game
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Run the Production Build**:
   ```bash
   npm start
   ```

6. **Access the Application**:
   Open your browser and go to `http://localhost:3000`.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See `LICENSE` for details.

---

## Contact

For questions or suggestions, feel free to reach out:

- **Author**: Chris - lardnece@rose-hulman.edu
- **GitHub**: [wyochris](https://github.com/wyochris)
