"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import ResumeContent from "@/components/ResumeContent";

/**
 * Download the resume element as PDF using html2canvas + jspdf.
 * Runs in browser only; saves file as "Malaika_Rizwan_Resume.pdf".
 */
async function downloadResumePdf(element: HTMLElement) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95;
  const w = imgWidth * ratio;
  const h = imgHeight * ratio;
  pdf.addImage(imgData, "PNG", (pdfWidth - w) / 2, 10, w, h);
  pdf.save("Malaika_Rizwan_Resume.pdf");
}

export default function ResumePage() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    const el = resumeRef.current;
    if (!el) return;
    setDownloading(true);
    try {
      await downloadResumePdf(el);
    } finally {
      setDownloading(false);
    }
  };

  // If opened with ?download=1 (e.g. from home "Download Résumé"), auto-download PDF once.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("download") === "1") {
      const t = setTimeout(() => {
        const el = resumeRef.current;
        if (el) downloadResumePdf(el).catch(() => {});
      }, 1500);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 py-8">
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back to portfolio
        </Link>
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={downloading}
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600 disabled:opacity-70"
        >
          {downloading ? "Downloading..." : "Download PDF"}
        </button>
      </div>

      <div className="pt-14 md:pt-12">
        <ResumeContent ref={resumeRef} />
      </div>
    </div>
  );
}
