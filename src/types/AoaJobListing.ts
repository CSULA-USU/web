/**
 * A full-time U-SU position as published by our HR to the CSU Auxiliary
 * Organizations Association (AOA) job board, which is the system of record —
 * the postings originate here and are entered there, so we read them back
 * rather than keeping a second copy that can drift.
 */
export interface AoaJobListing {
  /** The feed's `guid`, stable across edits to the posting. */
  id: string;
  title: string;
  /** The posting's page on csuaoa.org, still linked from the modal. */
  link: string;
  /** ISO 8601. The feed carries no closing date, only this. */
  postedAt: string;
  /**
   * The full posting body, already run through `sanitizeJobDescription` in
   * `lib/aoaJobFeed`. Safe to pass to `dangerouslySetInnerHTML`.
   */
  descriptionHtml: string;
}

export interface FullTimeEmploymentResponse {
  jobs: AoaJobListing[];
  /**
   * True when AOA could not be reached and these jobs came from the last
   * successful fetch. Not surfaced in the UI — a posting a few hours stale is
   * accurate enough, and postings run for weeks.
   */
  stale: boolean;
  /** ISO 8601 timestamp of the fetch these jobs actually came from. */
  fetchedAt: string;
}
