"use client";

import { useEffect, useState, useCallback } from "react";

const TeensyUpdater = () => {
  const [devices, setDevices] = useState<string[]>([]);
  const [selectedDevicePort, setSelectedDevicePort] = useState<string | null>(null);

  // Function to detect devices and update the list
  const detectDevices = useCallback(async () => {
    try {
      const response = await fetch("/api/devices");
      const data = await response.json();

      if (data.ports && data.ports.length > 0) {
        setDevices(data.ports);
        if (!selectedDevicePort || !data.ports.includes(selectedDevicePort)) {
          setSelectedDevicePort(data.ports[0]);
        }
      } else {
        setDevices([]);
        setSelectedDevicePort(null);
      }
    } catch (error) {
      console.error("Device Detection Error:", error);
    }
  }, [selectedDevicePort]); // Include selectedDevicePort as a dependency

  // Poll for device changes every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      detectDevices();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [detectDevices]); // Now detectDevices is correctly included

  const handleDeviceSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevicePort(event.target.value);
  };

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
              value={selectedDevicePort || ""}
              onChange={handleDeviceSelect}
            >
              {devices.map((devicePort, index) => (
                <option key={index} value={devicePort}>
                  {devicePort}
                </option>
              ))}
            </select>
          </label>
          {selectedDevicePort && (
            <p className="text-blue-500 mt-2">Selected Port: {selectedDevicePort}</p>
          )}
        </>
      ) : (
        <p className="text-red-500">No Teensy LC devices detected ❌</p>
      )}
    </div>
  );
};

export default TeensyUpdater;
