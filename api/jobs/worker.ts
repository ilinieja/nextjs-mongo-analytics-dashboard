import * as dotenv from "dotenv";
dotenv.config();

import commandLineArgs from 'command-line-args';
const optionDefinitions = [
  { name: 'run-jobs', alias: 'r', type: Boolean },
]
const options = commandLineArgs(optionDefinitions)



import logger from "../shared/logger";

import setupQueue from "./setup-queue";
import scheduleDbViewUpdates from "./db-view-updates";

(async function () {
  const queue = await setupQueue();

  const jobs = await scheduleDbViewUpdates(queue);
  logger.info("Jobs worker started");

  if (options['run-jobs']) {
    logger.info("Running all jobs");
    await Promise.all(jobs.map(job => job.run()));
  }
})();
