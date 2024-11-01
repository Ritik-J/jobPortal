import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const UseFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const supbaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const response = await cb(supbaseAccessToken, options, ...args);

      setData(response);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { fn, data, loading, error };
};

export default UseFetch;
