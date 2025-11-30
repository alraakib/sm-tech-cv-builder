"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { RootState } from "@/utils/store";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { Download, FileText } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const ReviewDownloadForm = () => {
  const router = useRouter();
  const { generatedResume } = useSelector((state: RootState) => state.resume);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const targetRef = useRef(null);
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      html2canvas(targetRef.current!).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(
          imgData,
          "JPEG",
          10,
          10,
          pdf.internal.pageSize.getWidth() - 20,
          canvas.height * ((pdf.internal.pageSize.getWidth() - 20) / canvas.width)
        );
        pdf.save("download.pdf");
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to download PDF";
      setDownloadError(errorMessage);
      console.error("Error downloading PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!generatedResume) {
    return (
      <motion.div
        key="review-download"
        initial={{ x: "50vw", opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-5 items-center justify-center py-12"
      >
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <FileText className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold">No Resume Generated</h3>
          <p className="text-muted-foreground max-w-md">
            Please generate your resume first before reviewing and downloading.
          </p>
          <Button onClick={() => router.push("/onboarding/resume-generation")}>
            Go to Resume Generation
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="review-download"
      initial={{ x: "50vw", opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5"
    >
      <h2 className="text-4xl font-semibold">
        Review Your AI-Generated Resume
      </h2>
      <p className="text-muted-foreground">
        Take a moment to review your resume. You can make changes and regenerate
        if needed. When you're ready, download it and start applying!
      </p>

      <div className="flex flex-col gap-6">
        {/* Resume Preview */}
        <div
          ref={targetRef}
          className="leading-loose"
          dangerouslySetInnerHTML={{
            __html: generatedResume
              .replaceAll("```html", "")
              .replaceAll("```", ""),
          }}
        ></div>

        {/* Download Status Messages */}
        {downloadError && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-destructive text-sm">{downloadError}</p>
          </div>
        )}

        {/* Download Options */}
        <div className="grid grid-cols-2 gap-5">
          <Button
            size="lg"
            variant="filled"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Spinner className="mr-2" />
                Downloading...
              </>
            ) : (
              <>
                <Download />
                Download Resume
              </>
            )}
          </Button>
          <Button size="lg" asChild>
            <Link href="/">Find Your Favorite Job</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewDownloadForm;
