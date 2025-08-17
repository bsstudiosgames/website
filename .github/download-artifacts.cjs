const fs = require("node:fs/promises");
const path = require("node:path");

/**
 * @this {typeof import('@actions/github').context}
 * @param {import('@octokit/rest').Octokit} github
 * @param {object} params
 * @param {string} params.outdir
 */
async function downloadArtifacts(github, { outdir }) {
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
  if (!(await fs.exists(outdir))) {
    await fs.mkdir(outdir);
  }

  // Write artifact to target directory
  const filename = path.join(outdir, "dist.zip");
  const data = Buffer.from(downloadResult.data);
  await fs.writeFile(filename, data);
}

module.exports = downloadArtifacts;
