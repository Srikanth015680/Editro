"use client";
import {
 
  Crop,
  Download,
  Expand,
  Loader2,
  Scissors,
  Type,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import UploadZone from "./upload-zone";
import { Button } from "@/components/ui/button";
import CanvasEditor from "./canvas-editor";
import { saveAs } from "file-saver";

type JobStatus = "idle" | "queued" | "processing" | "completed" | "error";

interface ProcessingJob {
  id: string;
  type: string;
  status: JobStatus;
  progress: number;
  result?: string;
}

const primaryTools = [
  {
    id: "e-bgremove",
    name: "Remove Background",
    icon: Scissors,
    color: "primary",
    description: "Remove background with AI",
  },
  {
    id: "e-removedotbg",
    name: "Remove Background (Pro)",
    icon: Scissors,
    color: "secondary",
    description: "High-quality background removal",
  },
  {
    id: "e-changebg",
    name: "Change Background",
    icon: Expand,
    color: "primary",
    description: "Replace background with AI",
    hasPrompt: true,
  },
  {
    id: "e-edit",
    name: "AI Edit",
    icon: Type,
    color: "secondary",
    description: "Edit image with text prompts",
    hasPrompt: true,
  },
  {
    id: "bg-genfill",
    name: "Generative Fill",
    icon: Expand,
    color: "primary",
    description: "Fill empty areas with AI",
    hasPrompt: true,
  },
];

const secondaryTools = [
  {
    id: "e-dropshadow",
    name: "AI Drop Shadow",
    icon: Zap,
    color: "secondary",
    description: "Add realistic shadows",
  },
  {
    id: "e-retouch",
    name: "AI Retouch",
    icon: Zap,
    color: "primary",
    description: "Enhance and retouch image",
  },
  {
    id: "e-upscale",
    name: "AI Upscale 2x",
    icon: Zap,
    color: "secondary",
    description: "Upscale image quality",
  },
  {
    id: "e-genvar",
    name: "Generate Variations",
    icon: Type,
    color: "primary",
    description: "Create image variations",
    hasPrompt: true,
  },
  {
    id: "e-crop-face",
    name: "Face Crop",
    icon: Crop,
    color: "secondary",
    description: "Smart face-focused cropping",
  },
  {
    id: "e-crop-smart",
    name: "Smart Crop",
    icon: Crop,
    color: "primary",
    description: "AI-powered intelligent cropping",
  },
];

const allTools = [...primaryTools, ...secondaryTools];

const Editor = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [currentJob, setCurrentJob] = useState<ProcessingJob | null>(null);
  const [editHistory, setEditHistory] = useState<ProcessingJob[]>([]);
  const [activeEffects, setActiveEffects] = useState<Set<string>>(new Set());
  const [promptText, setPromptText] = useState<string>("");
  const [showPromptInput, setShowPromptInput] = useState<boolean>(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setProcessedImage(null);
    setCurrentJob(null);
  };

  const handlePromptSubmit = async () => {
    if (!promptText.trim()) return;
    const tool = allTools.find((t) => t.hasPrompt && !activeEffects.has(t.id));
    if (!tool) return;
    await applyEffect(tool.id, promptText);
    setShowPromptInput(false);
    setPromptText("");
  };

  const getImageKitTransform = (tooldId: string, prompt?: string): string => {
    const transforms: Record<string, string> = {
      "e-bgremove": "e-bgremove",
      "e-removedotbg": "e-removedotbg",
      "e-changebg": prompt
        ? `e-changebg-prompt-${encodeURIComponent(prompt)}`
        : "e-changebg",
      "e-edit": prompt ? `e-edit:${encodeURIComponent(prompt)}` : "e-edit",
      "bg-genfill": prompt
        ? `bg-genfill:${encodeURIComponent(prompt)}`
        : "bg-genfill",
      "e-dropshadow": "e-dropshadow",
      "e-retouch": "e-retouch",
      "e-upscale": "e-upscale",
      "e-genvar": prompt
        ? `e-genvar:${encodeURIComponent(prompt)}`
        : "e-genvar",
      "e-crop-face": "e-crop-face",
      "e-crop-smart": "e-crop-smart",
    };
    return transforms[tooldId] || "";
  };

  const handleToolClick = async (toolId: string) => {
    if (!uploadedImage) return;
    const tool = allTools.find((t) => t.id === toolId);
    if (!tool) return;

    const newActiveEffects = new Set(activeEffects);

    if (newActiveEffects.has(toolId)) {
      newActiveEffects.delete(toolId);
      setActiveEffects(newActiveEffects);

      const remainingEffects = Array.from(newActiveEffects);
      const newImageUrl =
        remainingEffects.length > 0
          ? `${uploadedImage}?tr=${remainingEffects
              .map((effect) => getImageKitTransform(effect))
              .join(",")}`
          : uploadedImage;

      setProcessedImage(newImageUrl);
      return;
    }

    if (tool.hasPrompt) {
      setShowPromptInput(true);
      setPromptText("");
      return;
    }

    await applyEffect(toolId);
  };

  const applyEffect = async (toolId: string, prompt?: string) => {
    if (!uploadedImage) return;

    const newJob: ProcessingJob = {
      id: Date.now().toString(),
      type: toolId,
      status: "queued",
      progress: 0,
    };

    setCurrentJob(newJob);

    const newActiveEffects = new Set(activeEffects);
    newActiveEffects.add(toolId);
    setActiveEffects(newActiveEffects);

    const allEffects = Array.from(newActiveEffects);
    const transforms = allEffects.map((effect) =>
      getImageKitTransform(effect, effect === toolId ? prompt : undefined)
    );

    const newImageUrl = `${uploadedImage}?tr=${transforms.join(",")}`;

    try {
      setCurrentJob((prev) =>
        prev ? { ...prev, status: "processing", progress: 10 } : null
      );

      let attempts = 0;
      const maxAttempts = 60;//minutes max
      const pollInterval = 5000;//5seconds 5kms

      const pollImageKit = async (): Promise<boolean> => {
        attempts++;

        try {
          const response = await fetch(newImageUrl, {
            method: "HEAD",
            cache: "no-cache",
          });

          if (response.ok) {
            setProcessedImage(newImageUrl);
            setCurrentJob((prev) =>
              prev ? { ...prev, progress: 100, status: "completed" } : null
            );

            const completedJob = {
              ...newJob,
              status: "completed" as JobStatus,
              progress: 100,
              result: newImageUrl,
            };

            setEditHistory((prev) => [completedJob, ...prev.slice(0, 2)]);
            return true;
          }
        } catch {}

        const progress = Math.min(10 + attempts * 1.5, 90);
        setCurrentJob((prev) => (prev ? { ...prev, progress } : null));

        if (attempts >= maxAttempts) {
          setProcessedImage(newImageUrl);
          setCurrentJob((prev) =>
            prev ? { ...prev, progress: 100, status: "completed" } : null
          );

          const completedJob = {
            ...newJob,
            status: "completed" as JobStatus,
            progress: 100,
            result: newImageUrl,
          };

          setEditHistory((prev) => [completedJob, ...prev.slice(0, 2)]);
          return true;
        }

        await new Promise((r) => setTimeout(r, pollInterval));
        return pollImageKit();
      };

      await pollImageKit();
    } catch {
      setCurrentJob((prev) => (prev ? { ...prev, status: "error" } : null));
    }
  };

  const handleExport = (format: string) => {
    if (!processedImage) return;
    saveAs(processedImage, `Editra-${Date.now()}.${format}`);
  };

  return (
    <section id="editor" className="py-24 relative overflow-hidden bg-black">

      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      <div className="container mx-auto px-4 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              Magic
            </span>
            <span className="text-white"> Studio</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Upload your photo and transform it with AI-powered tools. See the magic happen in real-time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">

          <div className="lg:col-span-1">
            <UploadZone onImageUpload={handleImageUpload} />

            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-semibold text-white mb-4">AI Tools</h3>

              {showPromptInput && (
                <div className="space-y-3 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <textarea
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="w-full p-3 bg-black border border-white/10 rounded-md text-white placeholder:text-gray-500 resize-none"
                    rows={3}
                  />

                  <div className="flex gap-2">
                    <Button onClick={handlePromptSubmit} className="flex-1 bg-gradient-to-r from-red-500 to-purple-600 text-white">
                      Apply
                    </Button>
                    <Button onClick={() => setShowPromptInput(false)} className="border border-white/10 text-white">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {primaryTools.map((tool) => {
                const isActive = activeEffects.has(tool.id);

                return (
                  <Button
                    key={tool.id}
                    className={`w-full justify-start ${
                      isActive
                        ? "bg-gradient-to-r from-red-500 to-purple-600 text-white"
                        : "bg-white/5 border border-white/10 text-gray-300"
                    }`}
                    onClick={() => handleToolClick(tool.id)}
                  >
                    <tool.icon className="h-4 w-4 mr-2" />
                    {tool.name}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <CanvasEditor
              originalImage={uploadedImage}
              processedImage={processedImage}
              isProcessing={currentJob?.status === "processing"}
            />

            <div className="grid grid-cols-2 gap-2 mt-6">
              {secondaryTools.map((tool) => (
                <Button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className="bg-white/5 border border-white/10 text-gray-300"
                >
                  <tool.icon className="h-3 w-3 mr-2" />
                  {tool.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl p-6 bg-white/5 backdrop-blur-xl border border-white/10">

              <h3 className="text-white mb-4">Job Status</h3>

              {currentJob ? (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <Loader2 className="animate-spin text-purple-400" />
                    {currentJob.status}
                  </div>

                  <div className="mt-3 w-full h-2 bg-white/10 rounded">
                    <div
                      className="h-2 bg-gradient-to-r from-red-500 to-purple-600"
                      style={{ width: `${currentJob.progress}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-sm">No job running</p>
              )}

              {processedImage && (
                <Button
                  onClick={() => handleExport("jpg")}
                  className="mt-6 w-full bg-gradient-to-r from-red-500 to-purple-600 text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Editor;