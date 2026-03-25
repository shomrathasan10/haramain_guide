import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import db from "./db.js";
import auth from "./middleware/auth.js";
import { signToken } from "./utils/token.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const schema = fs.readFileSync("./schema.sql", "utf-8");
db.exec(schema);

app.get("/", (req, res) => {
  res.send("Haramain Guide Backend is running");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const admin = db
    .prepare("SELECT * FROM admins WHERE username = ? AND password = ?")
    .get(username, password);

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ id: admin.id, username: admin.username });
  res.json({ token, user: { username: admin.username } });
});

app.get("/api/admin/stats", auth, (req, res) => {
  const places = db.prepare("SELECT COUNT(*) as count FROM historical_places").get().count;
  const hajjSteps = db.prepare("SELECT COUNT(*) as count FROM hajj_steps").get().count;
  const umrahSteps = db.prepare("SELECT COUNT(*) as count FROM umrah_steps").get().count;
  const messages = db.prepare("SELECT COUNT(*) as count FROM messages").get().count;
  res.json({ places, hajjSteps, umrahSteps, messages });
});

/* ---------------- LIVE ---------------- */

app.get("/api/live", (req, res) => {
  res.json(db.prepare("SELECT * FROM live_streams ORDER BY id DESC").all());
});

app.post("/api/live", auth, upload.single("video"), (req, res) => {
  const { name, url } = req.body;
  const video = req.file ? `/uploads/${req.file.filename}` : "";
  const finalUrl = video || url || "";

  const result = db
    .prepare("INSERT INTO live_streams (name, url) VALUES (?, ?)")
    .run(name, finalUrl);

  res.json({ success: true, id: result.lastInsertRowid });
});

app.delete("/api/live/:id", auth, (req, res) => {
  db.prepare("DELETE FROM live_streams WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

/* ---------------- HAJJ ---------------- */

app.get("/api/hajj", (req, res) => {
  res.json(db.prepare("SELECT * FROM hajj_steps ORDER BY id ASC").all());
});

app.post("/api/hajj", auth, (req, res) => {
  const { title, description } = req.body;
  const result = db
    .prepare("INSERT INTO hajj_steps (title, description) VALUES (?, ?)")
    .run(title, description);
  res.json({ success: true, id: result.lastInsertRowid });
});

app.put("/api/hajj/:id", auth, (req, res) => {
  const { title, description } = req.body;
  db.prepare("UPDATE hajj_steps SET title = ?, description = ? WHERE id = ?").run(
    title,
    description,
    req.params.id
  );
  res.json({ success: true });
});

app.delete("/api/hajj/:id", auth, (req, res) => {
  db.prepare("DELETE FROM hajj_steps WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

/* ---------------- UMRAH ---------------- */

app.get("/api/umrah", (req, res) => {
  res.json(db.prepare("SELECT * FROM umrah_steps ORDER BY id ASC").all());
});

app.post("/api/umrah", auth, (req, res) => {
  const { title, description } = req.body;
  const result = db
    .prepare("INSERT INTO umrah_steps (title, description) VALUES (?, ?)")
    .run(title, description);
  res.json({ success: true, id: result.lastInsertRowid });
});

app.put("/api/umrah/:id", auth, (req, res) => {
  const { title, description } = req.body;
  db.prepare("UPDATE umrah_steps SET title = ?, description = ? WHERE id = ?").run(
    title,
    description,
    req.params.id
  );
  res.json({ success: true });
});

app.delete("/api/umrah/:id", auth, (req, res) => {
  db.prepare("DELETE FROM umrah_steps WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

/* ---------------- HOSPITALS ---------------- */

app.get("/api/hospitals", (req, res) => {
  res.json(db.prepare("SELECT * FROM hospitals ORDER BY id DESC").all());
});

app.post(
  "/api/hospitals",
  auth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      const { name, location, phone } = req.body;

      const img1 = req.files?.image1?.[0] ? `/uploads/${req.files.image1[0].filename}` : "";
      const img2 = req.files?.image2?.[0] ? `/uploads/${req.files.image2[0].filename}` : "";
      const img3 = req.files?.image3?.[0] ? `/uploads/${req.files.image3[0].filename}` : "";

      const result = db.prepare(`
        INSERT INTO hospitals (name, location, phone, image1, image2, image3)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(name, location, phone, img1, img2, img3);

      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

app.delete("/api/hospitals/:id", auth, (req, res) => {
  db.prepare("DELETE FROM hospitals WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

/* ---------------- HOTELS ---------------- */

app.get("/api/hotels", (req, res) => {
  res.json(db.prepare("SELECT * FROM hotels ORDER BY id DESC").all());
});

app.post(
  "/api/hotels",
  auth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      const {
        name,
        location,
        room_count,
        haram_distance_value,
        haram_distance_unit,
        nabawi_distance_value,
        nabawi_distance_unit,
      } = req.body;

      const img1 = req.files?.image1?.[0] ? `/uploads/${req.files.image1[0].filename}` : "";
      const img2 = req.files?.image2?.[0] ? `/uploads/${req.files.image2[0].filename}` : "";
      const img3 = req.files?.image3?.[0] ? `/uploads/${req.files.image3[0].filename}` : "";
      const img4 = req.files?.image4?.[0] ? `/uploads/${req.files.image4[0].filename}` : "";

      const result = db.prepare(`
        INSERT INTO hotels (
          name, location, room_count,
          haram_distance_value, haram_distance_unit,
          nabawi_distance_value, nabawi_distance_unit,
          image1, image2, image3, image4
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        name,
        location,
        room_count || 0,
        haram_distance_value || "",
        haram_distance_unit || "m",
        nabawi_distance_value || "",
        nabawi_distance_unit || "km",
        img1,
        img2,
        img3,
        img4
      );

      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

app.delete("/api/hotels/:id", auth, (req, res) => {
  db.prepare("DELETE FROM hotels WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

/* ---------------- HISTORICAL PLACES ---------------- */

app.get("/api/historical-places", (req, res) => {
  res.json(db.prepare("SELECT * FROM historical_places ORDER BY area, name ASC").all());
});

app.post(
  "/api/historical-places",
  auth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  (req, res) => {
    const { area, name, description } = req.body;

    const img1 = req.files?.image1?.[0] ? `/uploads/${req.files.image1[0].filename}` : "";
    const img2 = req.files?.image2?.[0] ? `/uploads/${req.files.image2[0].filename}` : "";
    const img3 = req.files?.image3?.[0] ? `/uploads/${req.files.image3[0].filename}` : "";
    const img4 = req.files?.image4?.[0] ? `/uploads/${req.files.image4[0].filename}` : "";

    const result = db
      .prepare(`
        INSERT INTO historical_places (area, name, description, image1, image2, image3, image4)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
      .run(area, name, description || "", img1, img2, img3, img4);

    res.json({ success: true, id: result.lastInsertRowid });
  }
);

app.delete("/api/historical-places/:id", auth, (req, res) => {
  db.prepare("DELETE FROM historical_places WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

/* ---------------- CONTACT ---------------- */

app.post("/api/messages", (req, res) => {
  const { name, email, subject, message } = req.body;
  const result = db
    .prepare("INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)")
    .run(name, email, subject, message);
  res.json({ success: true, id: result.lastInsertRowid });
});

app.get("/api/messages", auth, (req, res) => {
  res.json(db.prepare("SELECT * FROM messages ORDER BY id DESC").all());
});

app.post("/api/messages/:id/reply", auth, (req, res) => {
  const { reply } = req.body;
  res.json({
    success: true,
    message: "Reply saved. You can later connect real email sending here.",
    reply,
  });
});

/* ---------------- LOST FOUND ---------------- */

app.get("/api/lost-found", (req, res) => {
  res.json(db.prepare("SELECT * FROM lost_found ORDER BY id DESC").all());
});

app.post("/api/lost-found", (req, res) => {
  const { type, title, description, contact } = req.body;
  const result = db
    .prepare(`
      INSERT INTO lost_found (type, title, description, contact)
      VALUES (?, ?, ?, ?)
    `)
    .run(type, title, description, contact);
  res.json({ success: true, id: result.lastInsertRowid });
});

/* ---------------- DONATIONS ---------------- */

app.get("/api/donations", auth, (req, res) => {
  res.json(db.prepare("SELECT * FROM donations ORDER BY id DESC").all());
});

app.post("/api/donate", (req, res) => {
  const { title, amount, donor_name, donor_email } = req.body;
  const result = db
    .prepare(`
      INSERT INTO donations (title, amount, donor_name, donor_email, status)
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(title, amount, donor_name, donor_email, "pending");
  res.json({
    success: true,
    id: result.lastInsertRowid,
    message: "Donation request stored successfully.",
  });
});

/* ---------------- PRAYER TIMES ---------------- */

app.get("/api/prayer-times", async (req, res) => {
  const city = req.query.city || "Makkah";
  const country = req.query.country || "Saudi Arabia";
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
        city
      )}&country=${encodeURIComponent(country)}&method=4`
    );
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ message: "Failed to fetch prayer times" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});