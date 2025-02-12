"use client";

import { useEffect, useState, useRef } from "react";

const IntegratedCameraViewer = () => {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect cameras and request access
  useEffect(() => {
    const detectCameras = async () => {
      try {
        // Request permission first (removing unused stream variable)
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraAccess(true);

        // Enumerate video input devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");

        setCameras(videoDevices);

        // Auto-focus on the second camera if available
        if (videoDevices.length > 1) {
          setSelectedDeviceId(videoDevices[1].deviceId);
        } else if (videoDevices.length === 1) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        } else {
          setSelectedDeviceId(null);
        }
      } catch (error) {
        console.error("Camera Access Error:", error);
        setErrorMessage("Error accessing the camera. Please check permissions.");
      }
    };

    detectCameras();
    navigator.mediaDevices.addEventListener("devicechange", detectCameras);

    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", detectCameras);
    };
  }, []);

  // Start the camera stream
  useEffect(() => {
    const startCamera = async () => {
      if (selectedDeviceId && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: selectedDeviceId } },
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Camera Stream Error:", error);
          setErrorMessage("Could not access selected camera.");
        }
      }
    };

    startCamera();
  }, [selectedDeviceId]);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Integrated Multi-Camera Viewer</h2>

      {hasCameraAccess ? (
        cameras.length > 0 ? (
          <>
            <p className="text-yellow-400">
              Auto-selected: {cameras[1] ? cameras[1].label : cameras[0].label}
            </p>

            <label className="block mt-2">
              <span className="text-gray-300">Select Camera:</span>
              <select
                className="mt-1 block w-full bg-gray-800 text-white p-2 rounded"
                value={selectedDeviceId || ""}
                onChange={(e) => setSelectedDeviceId(e.target.value)}
              >
                {cameras.map((camera) => (
                  <option key={camera.deviceId} value={camera.deviceId}>
                    {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                  </option>
                ))}
              </select>
            </label>

            <video ref={videoRef} autoPlay playsInline className="w-full max-w-lg mt-3 rounded-lg shadow-md" />
          </>
        ) : (
          <p className="text-red-500">No Cameras Detected ❌</p>
        )
      ) : (
        <p className="text-red-500">Camera Access Denied ❌</p>
      )}

      {errorMessage && <p className="text-red-400 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default IntegratedCameraViewer;
