import job from "../src/cron/cron";

export default function handler(req, res) {
  job.start();
  res.status(200).json({ message: "Cron job started" });
}
