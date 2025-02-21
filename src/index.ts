import { run } from "@oclif/core";

async function main() {
  try {
    await run(process.argv.slice(2));
  } catch (error) {
    console.error("Errore durante l'esecuzione del comando:", error);
    process.exit(1);
  }
}

main();
