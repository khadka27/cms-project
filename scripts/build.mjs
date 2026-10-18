import { spawnSync, spawn } from "node:child_process";
import process from "node:process";

function runStep(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (
  process.env.DATABASE_URL &&
  (process.env.DATABASE_URL.includes("sslmode=") ||
    process.env.DATABASE_URL.includes("ssl="))
) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

runStep("pnpm", ["prisma", "generate"]);
if (process.env.DATABASE_URL) {
  runStep("pnpm", ["prisma", "migrate", "deploy"]);
} else {
  console.log("[build] DATABASE_URL not provided, skipping prisma migrate deploy");
}

const buildProcess = spawn("pnpm", ["next", "build", "--turbo"], {
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});

const heartbeat = setInterval(() => {
  console.log("[build] still running");
}, 5000);

buildProcess.on("exit", (code, signal) => {
  clearInterval(heartbeat);
  process.exit(code ?? (signal ? 1 : 0));
});
