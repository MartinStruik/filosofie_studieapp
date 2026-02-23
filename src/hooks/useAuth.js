import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase.js";

export function useAuth() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile from profiles table
  const fetchProfile = useCallback(async (userId) => {
    console.log("[Auth] Fetching profile for:", userId);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    console.log("[Auth] Profile result:", { data, error });
    if (error) {
      console.error("[Auth] Profile fetch error:", error.message, error.code);
    }
    setProfile(data);
  }, []);

  useEffect(() => {
    // Safety timeout: if auth takes >5s, stop loading and show login
    const timeout = setTimeout(() => {
      setLoading(prev => {
        if (prev) console.warn("[Auth] Timeout — forcing login screen");
        return false;
      });
    }, 5000);

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      clearTimeout(timeout);
      setSession(s);
      if (s?.user) fetchProfile(s.user.id);
      setLoading(false);
    }).catch((err) => {
      clearTimeout(timeout);
      console.error("[Auth] getSession failed:", err);
      setLoading(false);
    });

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, s) => {
        setSession(s);
        if (s?.user) {
          fetchProfile(s.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const login = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  }, []);

  return {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    login,
    logout,
    isDocent: profile?.role === "docent",
  };
}
