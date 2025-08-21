import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * * *", () => {
  https.get(process.env.URL, (res) => {
    if (res.statusCode === 200) {
      console.log("✅ API is up and running");
    } else {
      console.error("❌ API is down, status code:", res.statusCode);
    }
  });
});

export default job;
