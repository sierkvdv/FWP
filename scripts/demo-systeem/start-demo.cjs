// Start het uren-systeem lokaal op poort 3005 tegen de database uren_demo (verzonnen data).
const { spawn } = require("child_process");
const fs = require("fs");
const dir = "C:/Users/Herstel/Desktop/Claude/uren";
const regel = fs.readFileSync(dir + "/.env", "utf8").split(/\r?\n/).find((l) => l.startsWith("DATABASE_URL="));
const url = regel.slice("DATABASE_URL=".length).replace(/^"|"$/g, "").replace("/uren_test", "/uren_demo");
if (!url.includes("/uren_demo")) throw new Error("geen uren_demo");
const p = spawn("npx next dev -p 3005", { cwd: dir, shell: true, stdio: "inherit", env: { ...process.env, DATABASE_URL: url } });
p.on("exit", (c) => process.exit(c ?? 0));
