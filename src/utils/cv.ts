import { capture } from "@/lib/posthog";
import { profile } from "@/data/profile";

/**
 * Single place that pulls the CV down. The file is served from our own origin,
 * so `download` actually takes effect and the visitor gets a sensibly named
 * file instead of a browser tab pointed at a PDF viewer.
 */
export const downloadCV = (source: string) => {
  capture("resume_downloaded", { source });

  const link = document.createElement("a");
  link.href = profile.cvUrl;
  link.download = "Khaled_Salleh_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
