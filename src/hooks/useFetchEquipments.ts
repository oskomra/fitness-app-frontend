import { type Equipment } from "@/types/types";
import { useState, useEffect } from "react";

export default function useFetchEquipments() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/equipments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const equipments = await response.json();
        setEquipments(equipments);
      } catch (error) {
        console.error("Error fetching equipments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  return { equipments, loading, error };
}
