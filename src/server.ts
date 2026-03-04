import { createApp } from "./app";

const PORT = process.env.PORT ?? 3000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🔍 Sherlock Holmes API                                      ║
║                                                               ║
║   Server running at http://localhost:${PORT}                     ║
║   Documentation at  http://localhost:${PORT}/docs                ║
║                                                               ║
║   Endpoints:                                                  ║
║   • GET /api/v1/health         - Health check                 ║
║   • GET /api/v1/quotes/random  - Random quote                 ║
║   • GET /api/v1/cases          - List cases                   ║
║   • GET /api/v1/characters     - List characters              ║
║   • GET /api/v1/search?q=term  - Search quotes                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});
