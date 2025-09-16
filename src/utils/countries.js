import { useCallback, useEffect, useState } from "react";

/**
 * useCountries - React hook to fetch countries and provide a function to get states for a country.
 *
 * Exposes:
 * - countries: [{ name, code, region, flag }]
 * - loading: boolean
 * - error: Error | null
 * - fetchCountries(): Promise<array>
 * - getStates(countryNameOrCode): Promise<array>
 *
 * Notes:
 * - Countries are fetched from https://restcountries.com/v3.1/all
 * - States are fetched via https://countriesnow.space/api/v0.1/countries/states (POST with { country })
 */
export function useCountries(options = { autoFetch: true }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // normalize autoFetch to a stable primitive so callers can pass an object inline
  const autoFetch = options?.autoFetch ?? true;

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // request only required fields to satisfy the API and reduce payload
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,ccn3,region,flags"
      );
      if (!res.ok) throw new Error(`Failed to fetch countries: ${res.status}`);
      const data = await res.json();
      const list = data
        .map((c) => ({
          name: c?.name?.common || c.name || "",
          code: c?.cca2 || c?.cca3 || c?.ccn3 || "",
          region: c?.region || "",
          // flags can be an object with png/svg or sometimes an array/string; prefer png then svg then first array entry
          flag:
            (c?.flags &&
              (typeof c.flags === "string"
                ? c.flags
                : c.flags.png ||
                  c.flags.svg ||
                  (Array.isArray(c.flags) ? c.flags[0] : ""))) ||
            "",
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setCountries(list);
      return list;
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getStates = useCallback(
    async (countryNameOrCode) => {
      setLoading(true);
      setError(null);
      try {
        if (!countryNameOrCode) return [];

        // The countriesnow API expects a country name (e.g. "United States")
        // We'll try to find a matching name from the fetched countries first.
        let countryName = countryNameOrCode;
        if (countries && countries.length) {
          const found = countries.find(
            (c) =>
              c.name.toLowerCase() ===
                String(countryNameOrCode).toLowerCase() ||
              c.code.toLowerCase() === String(countryNameOrCode).toLowerCase()
          );
          if (found) countryName = found.name;
        }

        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ country: countryName }),
          }
        );

        if (!res.ok) throw new Error(`Failed to fetch states: ${res.status}`);
        const json = await res.json();
        // expected shape: { error: false, msg: '...', data: { name: 'Country', iso3: '...', states: [{name: 'State'}] } }
        if (json.error) {
          // API returns error boolean; when true, return empty
          return [];
        }
        const states = (json.data?.states || []).map((s) => s.name || s);
        return states;
      } catch (err) {
        setError(err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [countries]
  );

  useEffect(() => {
    // only auto fetch if enabled and we don't already have countries
    if (autoFetch && countries.length === 0) {
      fetchCountries();
    }
  }, [fetchCountries, autoFetch, countries.length]);

  return {
    countries,
    loading,
    error,
    fetchCountries,
    getStates,
  };
}
