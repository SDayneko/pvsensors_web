import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import HID from "node-hid";
import { exec } from "child_process";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("firmware") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const filePath = path.join("/tmp", file.name);
    await writeFile(filePath, Buffer.from(bytes));

    // Detect Teensy LC
    const devices = HID.devices();
    const teensyDevice = devices.find(d => d.product?.includes("Teensy"));

    if (!teensyDevice) {
      return NextResponse.json({ error: "No Teensy LC detected" }, { status: 404 });
    }

    // Upload firmware using Teensy CLI
    exec(`teensy_loader_cli --mcu=TEENSYLC -w -v ${filePath}`, (err, stdout, stderr) => {
      if (err) {
        console.error("Error flashing firmware:", stderr);
      }
    });

    return NextResponse.json({ success: true, message: "Firmware uploaded!" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
