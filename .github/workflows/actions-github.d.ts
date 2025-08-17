import "@actions/github/lib/interfaces";

declare module "@actions/github/lib/interfaces" {
  export interface WorkflowRunEventPayload {
    id: number;
    conclusion: "success" | "failure" | null;
    status: "in_progress" | "completed" | "pending" | "waiting";
  }

  export interface WebhookPayload {
    workflow_run: WorkflowRunEventPayload;
  }
}
