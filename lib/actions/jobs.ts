import { JobInput } from "@/app/dashboard/recruiter/jobs/new/page";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000' 

export const createJob = async (data: JobInput) => {
          const res = await fetch(`${BASE_URL}/jobs`, {
                    method: "POST",
                    headers: {
                      'content-type': 'application/json',
                    },
                    body: JSON.stringify(data),
          });
          if (!res.ok) {
                    // server may return JSON error or plain text/html — don't crash parsing
                    let message = `Request failed with status ${res.status}`;
                    try {
                              const body = await res.json();
                              if (body?.error) message = body.error;
                    } catch { /* non-JSON response, keep default message */ }
                    throw new Error(message);
          }
          return res.json();
}