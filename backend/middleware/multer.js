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

export default upload;
