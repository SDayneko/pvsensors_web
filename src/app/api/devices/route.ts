import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execPromise("ls /dev/cu.*");
    const ports = stdout.split("\n").filter((port) => port.includes("usbmodem"));

    return NextResponse.json({ ports });
  } catch (error) {
    console.error("Error detecting USB:", error);
    return NextResponse.json({ error: "Failed to detect USB devices" }, { status: 500 });
  }
}
