// packages
import chalk from "chalk";
import { DisplayProcessor, SpecReporter, StacktraceOption } from "jasmine-spec-reporter";

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(_info: jasmine.SuiteResult, log: string): string {
    return `${chalk.green("✓")} Kicon ${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    suite: {
      displayNumber: true,
    },
    spec: {
      displayStacktrace: StacktraceOption.NONE,
      displayPending: true,
    },
    customProcessors: [CustomProcessor],
  }) as jasmine.CustomReporter
);
