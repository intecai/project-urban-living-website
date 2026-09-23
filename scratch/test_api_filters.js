const BASE_URL = "http://localhost:3000/api-proxy/rooms";

const categoryMapping = {
  all: "",
  single: "Single Rooms",
  double: "Double Rooms",
  triple: "Triple Rooms",
  four: "Four Sharing",
  five: "Five Sharing"
};

async function testCategory(categoryName, categoryKey) {
  const roomType = categoryMapping[categoryKey];
  const url = roomType ? `${BASE_URL}?roomType=${encodeURIComponent(roomType)}` : BASE_URL;
  console.log(`\nTesting Category: ${categoryName}`);
  console.log(`URL: ${url}`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    const rooms = Array.isArray(data) ? data : (data.value || data.data || []);
    const locations = new Set(rooms.map(r => r.location?.name || r.location).filter(Boolean));
    console.log(`Status: ${res.status}`);
    console.log(`Rooms returned: ${rooms.length}`);
    console.log(`Unique locations (${locations.size}):`, Array.from(locations));
    return rooms;
  } catch (e) {
    console.error(`Error fetching category ${categoryName}:`, e.message);
  }
}

(async () => {
  console.log("=== API FILTER & PARAMETER INTEGRITY VERIFICATION ===");
  await testCategory("All Rooms", "all");
  await testCategory("Single Rooms", "single");
  await testCategory("Double Sharing", "double");
  await testCategory("Triple Sharing", "triple");
  await testCategory("Four Sharing", "four");
  await testCategory("Five Sharing", "five");
})();
