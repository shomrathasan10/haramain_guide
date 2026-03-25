import fs from "fs";
import db from "./db.js";

const schema = fs.readFileSync("./schema.sql", "utf-8");
db.exec(schema);

[
  "admins",
  "live_streams",
  "hajj_steps",
  "umrah_steps",
  "hospitals",
  "hotels",
  "historical_places",
  "messages",
  "lost_found",
  "donations",
].forEach((table) => db.prepare(`DELETE FROM ${table}`).run());

db.prepare("INSERT INTO admins (username, password) VALUES (?, ?)").run("admin", "123456");

[
  ["Makkah Live", "https://www.youtube.com/embed/6fqVdH6oRYc"],
  ["Madinah Live", "https://www.youtube.com/embed/9Auq9mYxFEE"]
].forEach((row) =>
  db.prepare("INSERT INTO live_streams (name, url) VALUES (?, ?)").run(...row)
);

[
  ["Ihram", "Enter the state of Ihram with intention and Talbiyah."],
  ["Mina", "Proceed to Mina and prepare for the days of Hajj."],
  ["Arafat", "Stand at Arafat and make dua."]
].forEach((row) =>
  db.prepare("INSERT INTO hajj_steps (title, description) VALUES (?, ?)").run(...row)
);

[
  ["Ihram", "Make intention and wear Ihram properly."],
  ["Tawaf", "Complete 7 rounds around the Kaaba."],
  ["Sa'i", "Walk between Safa and Marwah."]
].forEach((row) =>
  db.prepare("INSERT INTO umrah_steps (title, description) VALUES (?, ?)").run(...row)
);

db.prepare(`
  INSERT INTO hospitals (name, location, phone, image1, image2, image3)
  VALUES (?, ?, ?, ?, ?, ?)
`).run(
  "Makkah Hospital",
  "Central Makkah",
  "+966111111",
  "",
  "",
  ""
);

db.prepare(`
  INSERT INTO hotels (
    name, location, room_count,
    haram_distance_value, haram_distance_unit,
    nabawi_distance_value, nabawi_distance_unit,
    image1, image2, image3, image4
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`).run(
  "Al Safwah Hotel",
  "Near Haram",
  250,
  "350",
  "m",
  "",
  "km",
  "",
  "",
  "",
  ""
);

console.log("Database seeded successfully.");