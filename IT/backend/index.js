const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret";
const app = express();
const PORT = 8081;

// --- FOLDERS ---
const uploadsDir = path.join(__dirname, "uploads");
const resumesDir = path.join(uploadsDir, "resumes");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(resumesDir)) fs.mkdirSync(resumesDir);

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// Optional: Request logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// --- MYSQL CONNECTION ---
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Manoj@2505",
  database: "db",
  port:3307
});
db.connect(err => {
  if (err) console.error("❌ Database connection failed:", err);
  else console.log("✅ Connected to MySQL database");
});

// --- MULTER CONFIGURATION ---
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `photo-${Date.now()}${path.extname(file.originalname)}`)
});
const uploadPhoto = multer({ storage: photoStorage });

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, resumesDir),
  filename: (req, file, cb) => cb(null, `resume-${Date.now()}${path.extname(file.originalname)}`)
});
const uploadResume = multer({ storage: resumeStorage });

// --- ADMIN TOKEN VERIFICATION ---
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    if (decoded.role.toLowerCase() !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    req.user = decoded;
    next();
  });
}

// --- REGISTER ---
app.post("/api/register", uploadPhoto.single("photo"), async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const photoPath = req.file ? `uploads/${req.file.filename}` : null;
  const table = role.toLowerCase() === "admin" ? "admin" : "employee1";

  db.query(`INSERT INTO ${table} (name, email, password, photo) VALUES (?, ?, ?, ?)`,
    [name, email, hashedPassword, photoPath],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: `${role} registered successfully` });
    });
});

// --- LOGIN ---
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ error: "Email, password and role are required" });
  }

  const table = role.toLowerCase() === "admin" ? "admin" : "employee1";

  db.query(`SELECT * FROM ${table} WHERE email=?`, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const normalizedRole = table === "admin" ? "Admin" : "Employee";
    const token = jwt.sign({ id: user.id, email: user.email, role: normalizedRole }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      role: normalizedRole,
      name: user.name,
      email: user.email,
      photo: user.photo ? `http://localhost:8081/${user.photo}` : null
    });
  });
});

// --- FORGOT PASSWORD ---
app.post("/api/forgot-password", async (req, res) => {
  const { email, newPassword, confirmNewPassword, role } = req.body;

  if (!email || !newPassword || !confirmNewPassword || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  const table = role.toLowerCase() === "admin" ? "admin" : "employee1";
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  db.query(`SELECT * FROM ${table} WHERE email = ?`, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Internal server error." });

    if (results.length === 0) {
      return res.status(404).json({ message: `No ${role} found with this email.` });
    }

    db.query(`UPDATE ${table} SET password = ? WHERE email = ?`, [hashedPassword, email], (err2) => {
      if (err2) return res.status(500).json({ message: "Failed to update password." });
      return res.json({ message: "✅ Password updated successfully." });
    });
  });
});

// --- EMPLOYEE CRUD ---
const employeeStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `emp-${Date.now()}${path.extname(file.originalname)}`)
});
const uploadEmployeePhoto = multer({ storage: employeeStorage });

app.get("/api/employees", (req, res) => {
  db.query("SELECT * FROM employee1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/api/employees", uploadEmployeePhoto.single("photo"), (req, res) => {
  const { name, email, department, contact, hire_date } = req.body;
  const photo = req.file ? `uploads/${req.file.filename}` : null;

  db.query(
    "INSERT INTO employee1 (name, email, department, contact, hire_date, photo) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, department, contact, hire_date, photo],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee added successfully." });
    }
  );
});

app.put("/api/employees/:id", uploadEmployeePhoto.single("photo"), (req, res) => {
  const { name, email, department, contact, hire_date } = req.body;
  const { id } = req.params;
  const photo = req.file ? `uploads/${req.file.filename}` : null;

  let query = `UPDATE employee1 SET name=?, email=?, department=?, contact=?, hire_date=?`;
  const values = [name, email, department, contact, hire_date];

  if (photo) {
    query += `, photo=?`;
    values.push(photo);
  }

  query += ` WHERE id=?`;
  values.push(id);

  db.query(query, values, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee updated successfully." });
  });
});

app.delete("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employee1 WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee deleted successfully." });
  });
});

// --- JOB ROUTES ---
app.get("/api/jobs", (req, res) => {
  db.query("SELECT * FROM jobs ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

app.post("/api/jobs", verifyAdmin, (req, res) => {
  const { title, location, type, description } = req.body;
  db.query("INSERT INTO jobs (title, location, type, description) VALUES (?, ?, ?, ?)",
    [title, location, type, description], (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to create job" });
      res.status(201).json({ message: "Job created successfully", id: result.insertId });
    });
});

app.delete("/api/jobs/:id", verifyAdmin, (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM jobs WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete job" });
    res.json({ message: "Job deleted successfully" });
  });
});

// --- PUBLIC JOB ROUTES ---
app.get("/api/public/jobs", (req, res) => {
  db.query("SELECT id, title, location, type, description FROM jobs ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

app.get("/api/public/jobs/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM jobs WHERE id=?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Job not found" });
    res.json(results[0]);
  });
});

// --- APPLICATIONS ---
app.get("/api/applications", (req, res) => {
  const query = `
    SELECT 
      a.id,
      a.full_name AS name,
      a.email,
      a.resume_path AS resume,
      a.submitted_at AS created_at,
      a.admin_message,
      j.title AS job_title
    FROM applications a
    LEFT JOIN jobs j ON a.job_id = j.id
    ORDER BY a.submitted_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Failed to fetch applications:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.get("/api/public/track-application", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const sql = `
    SELECT 
      a.id AS application_id,
      a.full_name,
      a.email,
      a.resume_path,
      a.submitted_at,
      a.admin_message,
      j.id AS job_id,
      j.title AS job_title,
      j.location AS job_location,
      j.type AS job_type,
      j.description AS job_description
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE LOWER(a.email) = LOWER(?)
    ORDER BY a.submitted_at DESC
    LIMIT 1
  `;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("❌ track-application DB error:", err);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No application found for this email." });
    }

    return res.json(results[0]);
  });
});
app.put("/api/applications/:id/message", (req, res) => {
  const { id } = req.params;
  const { admin_message } = req.body;

  if (!admin_message || admin_message.trim() === "") {
    return res.status(400).json({ message: "Message cannot be empty." });
  }

  const sql = `UPDATE applications SET admin_message = ? WHERE id = ?`;
  db.query(sql, [admin_message, id], (err) => {
    if (err) {
      console.error("❌ Failed to update admin message:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.json({ message: "Admin message updated successfully." });
  });
});
;



// --- SERVE REACT CLIENT (if deployed) ---
const clientPath = path.join(__dirname, "client", "build");
if (fs.existsSync(clientPath)) {
  app.use(express.static(clientPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
