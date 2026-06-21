import { collection, addDoc, serverTimestamp, query, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";

export interface ActivityLog {
  id?: string;
  type: "visit" | "click";
  timestamp: any;
  userAgent: string;
  referrer: string;
  path: string;
  screenSize: string;
  language: string;
  elementId?: string;
  elementText?: string;
  href?: string;
}

// Global sessionStorage flag to avoid recording duplicate visits from same user in the current tab session
const VISIT_TRACKED_KEY = "silencioso_tracked_visit";

export async function trackVisit(): Promise<void> {
  try {
    // Check if tracked already in this exact tab session to prevent excessive write spam on fast reloads
    if (sessionStorage.getItem(VISIT_TRACKED_KEY)) {
      return;
    }

    const activity: Omit<ActivityLog, "id"> = {
      type: "visit",
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent || "Unknown",
      referrer: document.referrer || "Direct",
      path: window.location.pathname + window.location.search,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language || "es",
    };

    await addDoc(collection(db, "site_activity"), activity);
    sessionStorage.setItem(VISIT_TRACKED_KEY, "true");
  } catch (error) {
    console.warn("Failed to log visit:", error);
  }
}

export async function trackClick(elementId: string, elementText: string, href?: string): Promise<void> {
  try {
    const activity: Omit<ActivityLog, "id"> = {
      type: "click",
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent || "Unknown",
      referrer: document.referrer || "Direct",
      path: window.location.pathname + window.location.search,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language || "es",
      elementId,
      elementText: elementText.substring(0, 100), // truncate if too long
      href,
    };

    await addDoc(collection(db, "site_activity"), activity);
  } catch (error) {
    console.warn("Failed to log click:", error);
  }
}

// Fetch all activity for the admin panel in descending order
export async function fetchAllActivity(limitCount = 2000): Promise<ActivityLog[]> {
  try {
    const q = query(
      collection(db, "site_activity"),
      orderBy("timestamp", "desc"),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const logs: ActivityLog[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Handle Firebase timestamp or fallback to normal date
      let tsDate: Date;
      if (data.timestamp && typeof data.timestamp.toDate === "function") {
        tsDate = data.timestamp.toDate();
      } else if (data.timestamp && data.timestamp.seconds) {
        tsDate = new Date(data.timestamp.seconds * 1000);
      } else {
        tsDate = new Date();
      }

      logs.push({
        id: doc.id,
        type: data.type,
        timestamp: tsDate,
        userAgent: data.userAgent || "Desconocido",
        referrer: data.referrer || "Directo",
        path: data.path || "/",
        screenSize: data.screenSize || "FHD",
        language: data.language || "es",
        elementId: data.elementId,
        elementText: data.elementText,
        href: data.href,
      });
    });
    return logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
}
