import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    callback(null, `${uuidv4()}${ext}`);
  },
});

const upload = multer({ storage });

export const productUpload = upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 },
]);

export default upload;
