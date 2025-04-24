const { spawn } = require("child_process");
const waitOn = require("wait-on");

// Start backend
const backend = spawn("npm", ["run", "dev"], {
  cwd: "./apps/backend",
  stdio: "inherit",
  shell: true,
});

// Wait for backend to be ready
waitOn({ resources: ["http://localhost:5000"], timeout: 40000 })
  .then(() => {
    console.log("✅ Backend is up! Starting frontend...");
    const frontend = spawn("npm", ["run", "dev"], {
      cwd: "./apps/frontend-web",
      stdio: "inherit",
      shell: true,
    });
  })
  .catch((err) => {
    console.error("❌ Failed to wait for backend:", err);
    backend.kill();
    process.exit(1);
  });
