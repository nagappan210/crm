import puppeteer from "puppeteer";
import fs from "fs";

export async function generatePDF(htmlPath: string, outputPath: string) {
  const htmlContent = fs.readFileSync(htmlPath, "utf-8");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", bottom: "20mm" },
  });

  await browser.close();
  console.log("PDF Generated Successfully:", outputPath);
}
