TECHNICAL ERA1 PROJECT LIBRARY — GITHUB PAGES

FILES
- index.html: website structure
- styles.css: visual design
- projects.js: project information (edit this to add projects)
- site.js: search and category behaviour
- projects/: place each project's downloadable files in its own folder
- technical-era1-logo.png and technical-era1-icon.svg: keep your existing logo files

HOW TO ADD A PROJECT
1. Create a folder inside projects/, for example projects/esp32-weather/
2. Upload your code file and circuit image/PDF into that folder.
3. Open projects.js and add an object inside the PROJECTS array:

{
  title: "ESP32 Weather Station",
  category: "IoT",
  icon: "🌦️",
  description: "A short project description.",
  components: "ESP32 · DHT11 · OLED",
  code: "projects/esp32-weather/code.ino",
  circuit: "projects/esp32-weather/circuit.png",
  tutorial: "https://www.youtube.com/watch?v=VIDEO_ID"
}

4. Commit the changes. GitHub Pages will publish the update.

IMPORTANT
- All files are public because the repository is public.
- Do not upload passwords, Wi-Fi credentials, API keys, private customer data, or other secrets.
- Supabase is not used.
- Keep the logo filenames exactly as they are.
