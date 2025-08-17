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

  // Find `dist` artifact
  const match = artifactResult.data.artifacts.find(
    (artifact) => artifact.name === "dist"
  );

  // Download `dist` artifact
  const downloadResult = await github.rest.actions.downloadArtifact({
    owner: this.repo.owner,
    repo: this.repo.repo,
    artifact_id: match.id,
    archive_format: "zip",
  });

  // Make target directory
  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir);
  }

  // Write artifact to target directory
  const filename = path.join(outdir, "dist.zip");
  const data = Buffer.from(downloadResult.data);
  fs.writeFileSync(filename, data);
}

module.exports = downloadArtifacts;
