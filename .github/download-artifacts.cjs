/**
 * @this {typeof import('@actions/github').context}
 * @param {import('@octokit/rest').Octokit} github
 * @param {object} params
 * @param {string} params.outdir
 */
async function downloadArtifacts(github, { outdir }) {
  const fs = require("node:fs");
  const path = require("node:path");

  // List artifacts from the triggering workflow
  const artifactResult = await github.rest.actions.listWorkflowRunArtifacts({
    owner: this.repo.owner,
    repo: this.repo.repo,
    run_id: this.payload.workflow_run.id,
  });

  console.debug("listed %d total artifacts", artifactResult.data.total_count);

  // Find `dist` artifact
  const match = artifactResult.data.artifacts.find(
    (artifact) => artifact.name === "dist"
  );

  console.debug("found target artifact: %s", match.url);

  // Download `dist` artifact
  const downloadResult = await github.rest.actions.downloadArtifact({
    owner: this.repo.owner,
    repo: this.repo.repo,
    artifact_id: match.id,
    archive_format: "zip",
  });

  const data = Buffer.from(downloadResult.data);
  console.debug("downloaded artifact: %d bytes", data.length);

  // Make target directory
  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir);
    console.debug("created directory: %s", outdir);
  }

  // Write artifact to target directory
  const filename = path.join(outdir, "dist.zip");
  fs.writeFileSync(filename, data);
  console.info("done! wrote file: %s", filename);
}

module.exports = downloadArtifacts;
