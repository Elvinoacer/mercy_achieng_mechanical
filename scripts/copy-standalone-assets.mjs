import { cp, mkdir } from "node:fs/promises";

const standalone = ".next/standalone";
const staticDir = `${standalone}/.next/static`;

await mkdir(staticDir, { recursive: true });
await cp(".next/static", staticDir, { recursive: true, force: true });
await cp("public", `${standalone}/public`, { recursive: true, force: true });
