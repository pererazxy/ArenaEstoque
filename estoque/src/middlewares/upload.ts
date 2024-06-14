import multer from "multer";
import path from "path";

const storage = (folder: string) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folder}/`);
    },
    filename: function (req, file, cb) {
      const fileName = path.join(Date.now() + "-" + file.originalname);
      cb(null, fileName.replace(/\\/g, "/"));
    },
  });

export const uploadUser = multer({ storage: storage("users") });
export const uploadCategory = multer({ storage: storage("categories") });
export const uploadProduct = multer({ storage: storage("products") });
