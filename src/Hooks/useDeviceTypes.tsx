import { useState, useCallback } from "react";
import { endpoints, useApi } from "../Utils/Api.tsx";
import type { DeviceType } from "../Utils/Common.tsx";



interface UseDeviceTypesReturn {
  deviceTypes: DeviceType[] | null;
  loading: boolean;
  error: string | null;
  fetchDeviceTypes: (searchString?: string) => Promise<void>;
}

export const useDeviceTypes = (): UseDeviceTypesReturn => {
  const [deviceTypes, setDeviceTypes] = useState<DeviceType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getDBList } = useApi();

  const fetchDeviceTypes = useCallback(async (searchString?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDBList({endPoint: endpoints.types, searchString: searchString });
      setDeviceTypes((response as unknown) as DeviceType[]);
    } catch (err) {
      console.error("Error fetching device types:", err);
      setError("Failed to fetch device types. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [getDBList]);

  return {
    deviceTypes,
    loading,
    error,
    fetchDeviceTypes
  };
}; 

