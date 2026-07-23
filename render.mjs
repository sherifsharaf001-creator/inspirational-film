import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import ffmpegPath from "ffmpeg-static";

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

  /*
   * Force pure-white scripts during scenes where the existing
   * dark or pale text has insufficient contrast.
   *
   * 40–47 seconds: Rumi / mountain-cloud scene
   * 58–66 seconds: man and children in the field
   * 76–84 seconds: planting / hopeful closing scenes
   */
  const whiteTextWindows = [
    [40, 47],
    [58, 66],
    [76, 84]
  ];

  const originalStyles = new WeakMap();

  function getCurrentFilmTime() {
    const elements = Array.from(stage.querySelectorAll("*"));

    const timerElement = elements.find(element => {
      const text = element.textContent?.trim() || "";

      return /^\d+(?:\.\d+)?\s*s?\s*\/\s*87\.2\s*s?$/i.test(text);
    });

    if (!timerElement) {
      return 0;
    }

    const match = timerElement.textContent
      .trim()
      .match(/^(\d+(?:\.\d+)?)/);

    return match ? Number(match[1]) : 0;
  }

  function getDirectText(element) {
    return Array.from(element.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent || "")
      .join(" ")
      .trim();
  }

  function isSubtitleElement(element) {
    if (
      element.tagName === "BUTTON" ||
      element.tagName === "IMG" ||
      element.closest("button")
    ) {
      return false;
    }

    const directText = getDirectText(element);

    if (!directText) {
      return false;
    }

    if (
      directText.includes("87.2") ||
      directText.includes("PRESERVATION ONLY") ||
      directText.includes("Instagram Safe") ||
      directText.includes("Pause") ||
      directText.includes("Play") ||
      directText.includes("Restart")
    ) {
      return false;
    }

    const containsArabic = /[\u0600-\u06FF]/.test(directText);
    const containsEnglish = /[A-Za-z]/.test(directText);

    return containsArabic || containsEnglish;
  }

  function saveOriginalStyle(element) {
    if (originalStyles.has(element)) {
      return;
    }

    originalStyles.set(element, {
      color: element.style.getPropertyValue("color"),
      colorPriority: element.style.getPropertyPriority("color"),
      opacity: element.style.getPropertyValue("opacity"),
      opacityPriority: element.style.getPropertyPriority("opacity"),
      textShadow: element.style.getPropertyValue("text-shadow"),
      textShadowPriority:
        element.style.getPropertyPriority("text-shadow")
    });
  }

  function restoreOriginalStyle(element) {
    const original = originalStyles.get(element);

    if (!original) {
      return;
    }

    if (original.color) {
      element.style.setProperty(
        "color",
        original.color,
        original.colorPriority
      );
    } else {
      element.style.removeProperty("color");
    }

    if (original.opacity) {
      element.style.setProperty(
        "opacity",
        original.opacity,
        original.opacityPriority
      );
    } else {
      element.style.removeProperty("opacity");
    }

    if (original.textShadow) {
      element.style.setProperty(
        "text-shadow",
        original.textShadow,
        original.textShadowPriority
      );
    } else {
      element.style.removeProperty("text-shadow");
    }
  }

  function updateSubtitleContrast() {
    const currentTime = getCurrentFilmTime();

    const useWhite = whiteTextWindows.some(
      ([start, end]) =>
        currentTime >= start && currentTime <= end
    );

    const elements = Array.from(stage.querySelectorAll("*"))
      .filter(isSubtitleElement);

    for (const element of elements) {
      saveOriginalStyle(element);

      if (useWhite) {
        element.style.setProperty(
          "color",
          "#FFFFFF",
          "important"
        );

        element.style.setProperty(
          "opacity",
          "1",
          "important"
        );

        element.style.setProperty(
          "text-shadow",
          "none",
          "important"
        );
      } else {
        restoreOriginalStyle(element);
      }
    }
  }

  updateSubtitleContrast();
  window.setInterval(updateSubtitleContrast, 50);
});

await page.waitForTimeout(seconds * 1000);

const video = page.video();

await context.close();
await browser.close();

const rawPath = await video.path();
const mp4Path = path.join(
  outDir,
  "inspirational-film.mp4"
);

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit"
    });

    child.on("error", reject);

    child.on("close", code => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`${command} exited with code ${code}`)
        );
      }
    });
  });
}

if (!ffmpegPath) {
  throw new Error(
    "ffmpeg-static binary was not found."
  );
}

await run(ffmpegPath, [
  "-y",
  "-i",
  rawPath,
  "-vf",
  "fps=30,format=yuv420p",
  "-c:v",
  "libx264",
  "-preset",
  "medium",
  "-crf",
  "18",
  "-movflags",
  "+faststart",
  "-an",
  mp4Path
]);

console.log(`MP4 created: ${mp4Path}`);
