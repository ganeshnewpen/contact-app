// text avatar
export const getStringAvatar = (name) => {
  if (!name || typeof name !== "string") return "";

  const words = name.trim().split(/\s+/);
  if (words.length === 0) return "";

  const firstInitial = words[0][0]?.toUpperCase() || "";
  const lastInitial =
    words.length > 1 ? words[words.length - 1][0]?.toUpperCase() : "";

  return `${firstInitial}${lastInitial}`;
};

//time greetings
export function getGreeting(name = null) {
  const now = new Date();
  const hour = now.getHours();
  let greeting = "";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return `${greeting}, ${name}!`;
}
