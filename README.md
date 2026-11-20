# Technical ERA1 Website

A responsive, single-page website matching the supplied Technical ERA1 brand card: dark engineering aesthetic, electric blue accents and orange highlights.

## Included
- Responsive desktop, tablet and mobile layout
- Technical ERA1 branding using the supplied card artwork
- Services for School Projects, B.Tech Projects, Customised Projects and Industrial Projects
- YouTube latest-upload integration, search, thumbnails, descriptions and embedded playback
- About, project CTA, clickable phone-call and WhatsApp contact links for 7310100077

## Run locally
You can open `index.html` directly for the website layout. For best results, run a local web server from this folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000

## Update your contact number

The website contact section is configured for **7310100077** for both phone calls and WhatsApp. The call button uses `tel:+917310100077`; the WhatsApp button opens `https://wa.me/917310100077`.

To change it later, open `index.html` in a code editor (Visual Studio Code is recommended), find `7310100077`, and update both the displayed number and the phone/WhatsApp links. Keep the country code `91` in the link values for India.

## Add or edit YouTube videos

You do **not** upload video files directly to this website. Upload each video to your Technical Skill YouTube channel using [YouTube Studio](https://studio.youtube.com/). Add the title, full description, thumbnail and visibility there. Once the YouTube API key is configured below, the website automatically displays the channel's latest 24 uploads, including their YouTube title, description, thumbnail and publish date. To edit a video later, edit it in YouTube Studio; the website picks up the updated YouTube details when it reloads its data.

To find YouTube Studio: sign in with the Google account that owns the channel → open YouTube Studio → Create → Upload videos. For an existing upload, open Content and select the video to edit its title, description, thumbnail or visibility.

## Edit the website itself

- Open the extracted `technical-era1-website` folder in Visual Studio Code.
- `index.html` controls page text, sections, contact links and navigation.
- `styles.css` controls colours, layout, fonts and spacing.
- `app.js` controls the YouTube video loading, search and playback behaviour.
- `config.js` holds the YouTube API key and channel handle.
- `assets/` contains the website artwork.

After saving changes, refresh the browser to see them. Keep a backup copy before making edits.

## Enable automatic YouTube videos
The site uses the official YouTube Data API v3.

1. Open Google Cloud Console: https://console.cloud.google.com/
2. Create or select a project.
3. Enable **YouTube Data API v3**.
4. Create an API key under APIs & Services → Credentials.
5. Paste the key into `config.js` in `youtubeApiKey`.
6. Keep `channelHandle: "technicalskiil"` as configured.
7. Reload the website. The latest 24 uploads should appear automatically.

For a public production website, restrict the API key to your website's HTTP referrers and restrict API access to YouTube Data API v3. Do not commit a broadly unrestricted API key to a public repository.

## Publish online
This is a static site and can be hosted on GitHub Pages, Netlify, Cloudflare Pages or any standard web host. Upload the contents of this folder (not the ZIP itself) to your hosting provider. Add your final domain to the API key's website referrer restrictions.

## Before launch
- Contact number is set to 7310100077 for both calls and WhatsApp.
- Add the YouTube API key to enable automatic video loading.
- Add project-specific source-code files and circuit diagrams as they become available.
