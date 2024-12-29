import multer from "multer";

const upload = multer({
  dest: "uploads", // Directory where files will be stored
  fileFilter: (req, file, cb) => {
    // Allowed MIME types for images and PDFs
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Only image files (JPEG, PNG, GIF) and PDFs are allowed!"), false); // Reject the file
    }
  },
});

export default upload;
