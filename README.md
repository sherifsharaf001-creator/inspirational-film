# HTML to MP4 — iPad-friendly workflow

This repository uses GitHub Actions to open `index.html`, press its existing **Play** button, record the film at **1080 × 1920**, and convert it to an Instagram-ready H.264 MP4.

## Upload these files to GitHub

Upload the complete contents of this folder while preserving the `.github/workflows` folders:

- `index.html`
- `package.json`
- `render.mjs`
- `.github/workflows/generate-mp4.yml`

## Generate the MP4

1. Open the repository.
2. Tap **Actions**.
3. Select **Generate MP4**.
4. Tap **Run workflow**.
5. Keep the duration at `100` seconds unless the film is longer.
6. Tap the green **Run workflow** button.
7. Wait approximately 3–8 minutes.
8. Open the completed workflow run.
9. Scroll to **Artifacts**.
10. Download **inspirational-film-mp4**.
11. Open the downloaded ZIP in the iPad Files app.
12. Tap it once to extract `inspirational-film.mp4`.

## Notes

- The script preserves the supplied HTML and uses its own Play button.
- Output: 1080 × 1920, 30 fps, H.264 MP4.
- The current workflow exports video without audio. Music or narration can be added afterward in CapCut, VN, or iMovie.
- If the ending is cut off, run the workflow again with a higher duration such as `110`.
