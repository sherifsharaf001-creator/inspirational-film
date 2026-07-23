import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const seconds = Number(process.env.RECORD_SECONDS || "100");
const outDir = path.resolve("output");
const videoDir = path.resolve("raw-video");
await rm(outDir, { recursive: true, force: true });
await rm(videoDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await mkdir(videoDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: [
    "--autoplay-policy=no-user-gesture-required",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--disable-backgrounding-occluded-windows"
  ]
});

const context = await browser.newContext({
  viewport: { width: 420, height: 747 },
  deviceScaleFactor: 1,
  recordVideo: {
    dir: videoDir,
    size: { width: 1080, height: 1920 }
  }
});

const page = await context.newPage();
await page.goto(`file://${path.resolve("index.html")}`, {
  waitUntil: "networkidle"
});

await page.evaluate(() => {
  document.documentElement.style.margin = "0";
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
});

// Start from the beginning using the existing Play control.
// Record the full film.
await page.waitForTimeout(seconds * 1000);

const video = page.video();
await context.close();
await browser.close();

const rawPath = await video.path();
const mp4Path = path.join(outDir, "inspirational-film.mp4");

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("close", code => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

await run("ffmpeg", [
  "-y",
  "-i", rawPath,
  "-vf", "fps=30,format=yuv420p",
  "-c:v", "libx264",
  "-preset", "medium",
  "-crf", "18",
  "-movflags", "+faststart",
  "-an",
  mp4Path
]);

console.log(`MP4 created: ${mp4Path}`);
