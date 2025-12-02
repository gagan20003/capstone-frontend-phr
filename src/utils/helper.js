export const features = [
    {
        heading: "Appointments",
        feature: "Schedule and Manage your doctor visits peacefully.",
    },
    {
        heading: "Medical Records",
        feature: "Access your health history anytime anywhere.",
    },
    {
        heading: "Secure Platform",
        feature: "Your data is encrypted and protected with top security standards.",
    }
]




/**
 * Extracts and formats date and time from an ISO-like string.
 * @param {string} isoString - The input string (e.g., "2025-12-02T10:33:57.391").
 * @returns {{formattedDate: string | null, formattedTime: string | null}}
 */
export const extractFormattedDateTime = (isoString) => {
  if (!isoString) {
    return { formattedDate: null, formattedTime: null };
  }

  const dateObject = new Date(isoString);

  // Check if the date object is valid
  if (isNaN(dateObject.getTime())) {
    console.error("Invalid date string provided:", isoString);
    return { formattedDate: null, formattedTime: null };
  }

  // --- 1. Format the Date to "YYYY-MM-DD" ---
  // Using methods to ensure consistency regardless of local timezone
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(dateObject.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;


  // --- 2. Format the Time to "hh:mm am/pm" ---
  // Using Intl.DateTimeFormat for robust locale-aware time formatting
  const timeFormatOptions = {
    hour: '2-digit',   // '10'
    minute: '2-digit', // '33'
    hour12: true,      // 'AM' / 'PM' indicator
    // weekday: 'short', // Optional: adds day of week
  };

  // Using 'en-US' locale gives "10:33 AM" style output
  const formattedTime = new Intl.DateTimeFormat('en-US', timeFormatOptions).format(dateObject);

  return {
    formattedDate,
    formattedTime
  };
};

export const getTodayDateString = () => {
    const today = new Date();
    // Use ISO string and slice to ensure correct YYYY-MM-DD format regardless of user's timezone settings
    return today.toISOString().split('T')[0]; 
};



export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
}