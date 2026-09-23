const { chromium } = require('playwright');

(async () => {
  console.log("Starting validation of 11 filter tests...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Helper to get count and locations text
  async function getCounts() {
    await page.waitForTimeout(500); // allow render
    const h1Text = await page.locator('h1').innerText();
    const pText = await page.locator('h1 + p').innerText();
    return { title: h1Text.trim(), subtitle: pText.trim() };
  }

  // Helper to click category tab
  async function clickTab(label) {
    console.log(`Clicking tab: "${label}"`);
    await page.locator(`button:has-text("${label}")`).first().click();
    await page.waitForTimeout(600);
  }

  try {
    // TEST 1: Open /rooms directly
    console.log("\n--- TEST 1: Open /rooms directly ---");
    await page.goto('http://localhost:3000/rooms', { waitUntil: 'networkidle' });
    let counts = await getCounts();
    console.log(`Result: ${counts.title} | ${counts.subtitle}`);

    // TEST 2: Click All Rooms
    console.log("\n--- TEST 2: Click All Rooms ---");
    await clickTab("All Rooms");
    counts = await getCounts();
    console.log(`Result: ${counts.title} | ${counts.subtitle}`);

    // TEST 3: Single -> Double
    console.log("\n--- TEST 3: Single -> Double ---");
    await clickTab("Single Rooms");
    counts = await getCounts();
    console.log(`Single: ${counts.title} | ${counts.subtitle}`);
    await clickTab("Double Sharing");
    counts = await getCounts();
    console.log(`Double: ${counts.title} | ${counts.subtitle}`);

    // TEST 4: Single -> Four
    console.log("\n--- TEST 4: Single -> Four ---");
    await clickTab("Single Rooms");
    await clickTab("Four Sharing");
    counts = await getCounts();
    console.log(`Four: ${counts.title} | ${counts.subtitle}`);

    // TEST 5: Double -> Five
    console.log("\n--- TEST 5: Double -> Five ---");
    await clickTab("Double Sharing");
    await clickTab("Five Sharing");
    counts = await getCounts();
    console.log(`Five: ${counts.title} | ${counts.subtitle}`);

    // TEST 6: Four -> Five -> Double -> Triple -> All
    console.log("\n--- TEST 6: Four -> Five -> Double -> Triple -> All ---");
    await clickTab("Four Sharing");
    await clickTab("Five Sharing");
    await clickTab("Double Sharing");
    await clickTab("Triple Sharing");
    await clickTab("All Rooms");
    counts = await getCounts();
    console.log(`All Rooms: ${counts.title} | ${counts.subtitle}`);

    // TEST 7: Rapidly click All -> Single -> Double -> Triple -> Four -> Five
    console.log("\n--- TEST 7: Rapid click sequence (All -> Single -> Double -> Triple -> Four -> Five) ---");
    await page.locator('button:has-text("All Rooms")').first().click();
    await page.locator('button:has-text("Single Rooms")').first().click();
    await page.locator('button:has-text("Double Sharing")').first().click();
    await page.locator('button:has-text("Triple Sharing")').first().click();
    await page.locator('button:has-text("Four Sharing")').first().click();
    await page.locator('button:has-text("Five Sharing")').first().click();
    await page.waitForTimeout(1500); // wait for network requests to complete
    counts = await getCounts();
    console.log(`Rapid final result: ${counts.title} | ${counts.subtitle}`);

    // TEST 8: All Rooms + budget filter
    console.log("\n--- TEST 8: All Rooms + budget filter ---");
    await clickTab("All Rooms");
    // open filter modal
    await page.locator('button:has-text("Filter")').click();
    await page.waitForSelector('text=Filter Options');
    // adjust budget max slider if available or apply
    // Let's click Apply Filters
    await page.locator('button:has-text("Apply Filters")').click();
    await page.waitForTimeout(500);
    counts = await getCounts();
    console.log(`All Rooms + Budget: ${counts.title} | ${counts.subtitle}`);

    // TEST 9: All Rooms + location filter
    console.log("\n--- TEST 9: All Rooms + location filter ---");
    await page.locator('button:has-text("Filter")').click();
    await page.waitForSelector('text=Filter Options');
    // select Ramapuram location checkbox
    const ramapuram = page.locator('label:has-text("Ramapuram")');
    if (await ramapuram.count() > 0) {
      await ramapuram.click();
    }
    await page.locator('button:has-text("Apply Filters")').click();
    await page.waitForTimeout(500);
    counts = await getCounts();
    console.log(`All Rooms + Ramapuram: ${counts.title} | ${counts.subtitle}`);

    // TEST 10: All Rooms + amenities
    console.log("\n--- TEST 10: All Rooms + amenities filter ---");
    await page.locator('button:has-text("Filter")').click();
    await page.waitForSelector('text=Filter Options');
    const wifi = page.locator('label:has-text("Wi-Fi")');
    if (await wifi.count() > 0) {
      await wifi.click();
    }
    await page.locator('button:has-text("Apply Filters")').click();
    await page.waitForTimeout(500);
    counts = await getCounts();
    console.log(`All Rooms + Amenities: ${counts.title} | ${counts.subtitle}`);

    // TEST 11: Reset Filters
    console.log("\n--- TEST 11: Reset Filters ---");
    await page.locator('button:has-text("Filter")').click();
    await page.waitForSelector('text=Filter Options');
    await page.locator('button:has-text("Reset All")').click();
    await page.locator('button:has-text("Apply Filters")').click();
    await page.waitForTimeout(500);
    counts = await getCounts();
    console.log(`Reset Filters: ${counts.title} | ${counts.subtitle}`);

  } catch (err) {
    console.error("Test execution error:", err);
  } finally {
    await browser.close();
  }
})();
