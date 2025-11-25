import fs from "fs";
import path from "path";
import multer from "multer";

// Create folder if not exist
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Map mimetype → subfolder
const getFileTypeFolder = (mimetype: string) => {
  if (mimetype.startsWith("image/")) return "images";
  if (mimetype.startsWith("audio/")) return "audios";
  if (mimetype === "application/pdf") return "pdfs";
  if (
    mimetype === "application/msword" ||
    mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "docs";
  if (
    mimetype === "application/vnd.ms-excel" ||
    mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
    return "excels";
  return "others";
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const clientId = req.body.clientId || req.params.clientId;
      if (!clientId) return cb(new Error("Missing clientId"), "");

      // base folder for client
      const baseDir = path.join(process.cwd(), "uploads", clientId.toString());
      ensureDir(baseDir);

      // main folder depending on field name
      const folderMap: Record<string, string> = {
        clientFile: "client",
        paymentFile: "payments",
        followupFile: "followups",
      };
      const mainFolder = folderMap[file.fieldname] || "others";

      // subfolder depending on file type
      const typeFolder = getFileTypeFolder(file.mimetype);

      // Final directory: uploads/<clientId>/<main>/<type>/
      const targetDir = path.join(baseDir, mainFolder, typeFolder);
      ensureDir(targetDir);

      cb(null, targetDir);
    } catch (err) {
      cb(err as Error, "");
    }
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const customName = req.body[`${file.fieldname}Name`];
    const finalName = customName
      ? `${customName}${ext}`
      : `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    cb(null, finalName);
  },
});

// Define multer fields
export const uploadClientFiles = multer({ storage }).fields([
  { name: "clientFile", maxCount: 5 },
  { name: "paymentFile", maxCount: 5 },
  { name: "followupFile", maxCount: 5 },
]);
