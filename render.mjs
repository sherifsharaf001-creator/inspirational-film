import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
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
  viewport: { width: 1080, height: 1920 },
  deviceScaleFactor: 1,
  recordVideo: {
    dir: videoDir,
    size: { width: 1080, height: 1920 }
  }
});

const page = await context.newPage();

await page.goto(`file://${path.resolve("index.html")}`, {
  waitUntil: "domcontentloaded"
});

await page.waitForSelector("#root", { timeout: 30000 });

await page.evaluate(() => {
  const stage = Array.from(document.querySelectorAll("div")).find(
    element =>
      typeof element.className === "string" &&
      element.className.includes("aspect-[9/16]")
  );

  if (!stage) {
    throw new Error("The 9:16 animation container could not be found.");
  }

  const originalWidth = 420;
  const originalHeight = 747;
  const scaleX = 1080 / originalWidth;
  const scaleY = 1920 / originalHeight;

  const wrapper = stage.parentElement;
  const pageShell = wrapper?.parentElement;
  const root = document.getElementById("root");

  Object.assign(document.documentElement.style, {
    margin: "0",
    padding: "0",
    width: "1080px",
    height: "1920px",
    overflow: "hidden",
    background: "#000"
  });

  Object.assign(document.body.style, {
    margin: "0",
    padding: "0",
    width: "1080px",
    height: "1920px",
    overflow: "hidden",
    background: "#000"
  });

  Object.assign(root.style, {
    margin: "0",
    padding: "0",
    width: "1080px",
    height: "1920px",
    overflow: "hidden",
    background: "#000"
  });

  if (pageShell) {
    Object.assign(pageShell.style, {
      margin: "0",
      padding: "0",
      width: "1080px",
      height: "1920px",
      minHeight: "0",
      maxWidth: "none",
      display: "block",
      overflow: "hidden",
      background: "#000"
    });
  }

  if (wrapper) {
    Object.assign(wrapper.style, {
      margin: "0",
      padding: "0",
      width: "1080px",
      height: "1920px",
      maxWidth: "none",
      overflow: "hidden",
      position: "relative"
    });
  }

  // Keep the original 420Ã747 design intact and scale the whole composition.
  // This preserves the approved subtitle sizes and proportions.
  Object.assign(stage.style, {
    position: "absolute",
    left: "0",
    top: "0",
    margin: "0",
    padding: "0",
    width: `${originalWidth}px`,
    height: `${originalHeight}px`,
    maxWidth: "none",
    aspectRatio: "auto",
    borderRadius: "0",
    boxShadow: "none",
    overflow: "hidden",
    transformOrigin: "top left",
    transform: `scale(${scaleX}, ${scaleY})`
  });
});

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
