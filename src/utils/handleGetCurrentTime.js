export const handleGetCurrentTime = () => {
    const now = new Date();
   let hours = now.getHours();
   const amPm = hours >= 12 ? "PM" : "AM";
   hours = hours % 12 || 12;
   const minutes = now.getMinutes().toString().padStart(2, "0");
   const seconds = now.getSeconds().toString().padStart(2, "0");
   return `${hours}:${minutes}:${seconds} ${amPm}`;
  };