"use client";

import { useEffect, useState, useCallback } from "react";

declare global {
  interface Navigator {
    serial: {
      getPorts(): Promise<SerialPort[]>;
      requestPort(): Promise<SerialPort>;
    };
  }

  interface SerialPort {
    open(options: { baudRate: number }): Promise<void>;
  }
}

const TeensyUpdater = () => {
  const [devices, setDevices] = useState<string[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  
  // Detect available serial ports
  const detectDevices = useCallback(async () => {
    try {
      const ports = await navigator.serial.getPorts();
      if (ports.length > 0) {
        const portNames = ports.map((_, index) => `Teensy Port ${index + 1}`);
        setDevices(portNames);
        if (!selectedDevice) {
          setSelectedDevice(portNames[0]);
        }
      } else {
        setDevices([]);
        setSelectedDevice(null);
      }
    } catch (error) {
      console.error("Error detecting Teensy devices:", error);
    }
  }, [selectedDevice]); // Include selectedDevice as a dependency

  // Request access to a serial device
  const requestDeviceAccess = async () => {
    try {
      const newPort = await navigator.serial.requestPort(); // User selects Teensy
      await newPort.open({ baudRate: 9600 }); // Adjust baud rate if needed
      setDevices(["Teensy LC Connected"]);
      setSelectedDevice("Teensy LC Connected");
    } catch (error) {
      console.error("Device access denied:", error);
    }
  };

  // Run device detection when component mounts
  useEffect(() => {
    detectDevices();
  }, [detectDevices]); // Ensure it updates correctly when detectDevices changes

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Teensy LC USB Detection & Firmware Upload</h2>

      {devices.length > 0 ? (
        <>
          <p className="text-green-500">Teensy LC Devices Detected ✅</p>
          <label className="block mt-4">
            <span className="text-gray-300">Select Teensy Device:</span>
            <select
              className="mt-1 block w-full bg-gray-800 text-white p-2 rounded"
              value={selectedDevice || ""}
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              {devices.map((device, index) => (
                <option key={index} value={device}>
                  {device}
                </option>
              ))}
            </select>
          </label>
        </>
      ) : (
        <p className="text-red-500">No Teensy LC devices detected ❌</p>
      )}

      <button
        onClick={requestDeviceAccess}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Connect to Teensy LC
      </button>
    </div>
  );
};

export default TeensyUpdater;
