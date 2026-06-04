import { useState, useCallback } from "react";
import { endpoints, useApi } from "../Utils/Api.tsx";
import type { Device } from "../Utils/Common.tsx";


interface UseDevicesReturn {
  devices: Device[] | null;
  loading: boolean;
  error: string | null;
  fetchDevices: (searchString?: string) => Promise<void>;
  fetchDevice: (deviceId: string) => Promise<Device | null>;
  storeDevice: (formData: any) => Promise<any>;
  reportStatus: (formData: any) => Promise<any>;
}

export const useDevices = (): UseDevicesReturn => {
  const [devices, setDevices] = useState<Device[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getDBList, getDBItem, postServerRequest } = useApi();

  const fetchDevices = useCallback(async (searchString?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDBList({endPoint: endpoints.allDevices, searchString: searchString });
      setDevices((response.data as unknown) as Device[]);
    } catch (err) {
      console.error("Error fetching devices:", err);
      setError("Failed to fetch devices. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [getDBList]);

  const fetchDevice = useCallback(async (deviceId: string): Promise<Device | null> => {
    try {
      setLoading(true);
      setError(null);
      const device = await getDBItem({endPoint: endpoints.getDevice, id: deviceId});
      return device.data as Device || null;
    } catch (err) {
      console.error("Error fetching device:", err);
      setError("Failed to fetch device details. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [getDBItem]);

  const storeDevice = useCallback(async (formData: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await postServerRequest({url: endpoints.registerDevice.url, formdata: formData});
      return response;
    } catch (err) {
      console.error("Error creating device:", err);
      setError("Failed to create device. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reportStatus = useCallback(async (formData: any):Promise<any> => {
    try {
      setLoading(true);
      setError(null);
      const response = await postServerRequest({url: endpoints.reportStatus.url, formdata: formData});
      return response;
    } catch (err) {
      console.error("Error reporting device status:", err);
      setError("Failed to report the device status. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    devices,
    loading,
    error,
    fetchDevices,
    fetchDevice,
    storeDevice,
    reportStatus
  };
}; 
