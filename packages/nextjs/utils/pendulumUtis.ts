export function secondsToDhms(seconds: number): string {
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay;
}

export function formatEthereumAddress(address: string | undefined): string {
  address = address ? address : "Default";
  const visibleParts = 3; // Number of visible parts
  const parts = address.split("");
  const formattedParts = [...parts.slice(0, visibleParts), "...", ...parts.slice(-visibleParts)];
  return formattedParts.join("");
}

export function calculateRemainingTime(endTime: Date): string {
  const now = new Date();
  const timeDifference = endTime.getTime() - now.getTime();

  if (timeDifference <= 0) {
    return "Expired";
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (timeDifference > 86400000) {
    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  } else {
    return `${hours}h : ${minutes}m : ${seconds}s`;
  }
}
