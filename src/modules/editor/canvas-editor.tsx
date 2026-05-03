import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CanvasEditorProps {
  originalImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
}

const CanvasEditor = ({
  originalImage,
  processedImage,
  isProcessing,
}: CanvasEditorProps) => {
  const [showComparison, setShowComparison] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  if (!originalImage) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl aspect-[4/3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-2xl text-white">🎨</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Ready for Magic
          </h3>
          <p className="text-gray-400">
            Upload a photo to start editing
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <motion.div
        layout
        className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden aspect-[4/3]"
      >
        {isProcessing && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-10 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 mx-auto mb-3 text-purple-400 animate-spin" />
              <p className="text-white font-medium">
                AI is working its magic...
              </p>
              <p className="text-sm text-gray-400 mt-1">
                This usually takes a few seconds
              </p>
            </div>
          </div>
        )}

        {showComparison && processedImage ? (
          <div
            className="relative w-full h-full cursor-ew-resize"
            onMouseMove={handleSliderMove}
          >
            <div className="absolute inset-0">
              <img
                src={originalImage}
                alt="Original"
                className="w-full h-full object-contain"
              />
            </div>

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={processedImage}
                alt="Processed"
                className="w-full h-full object-contain"
              />
            </div>

            <div
              className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500 to-purple-600"
              style={{
                left: `${sliderPosition}%`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <div className="w-[2px] h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 text-xs font-medium text-white bg-black/70 px-2 py-1 rounded">
              BEFORE
            </div>
            <div className="absolute bottom-4 right-4 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-purple-600 px-2 py-1 rounded">
              AFTER
            </div>
          </div>
        ) : (
          <div className="w-full h-full">
            <img
              src={processedImage || originalImage}
              alt={processedImage ? "Processed" : "Original"}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {processedImage && !isProcessing && (
          <div className="absolute top-4 right-4">
            <Button
              size="sm"
              onClick={() => setShowComparison(!showComparison)}
              className="bg-black/60 border border-white/10 text-white hover:bg-black/80 backdrop-blur-xl"
            >
              {showComparison ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide Compare
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Compare
                </>
              )}
            </Button>
          </div>
        )}
      </motion.div>

      <div className="text-center">
        {isProcessing ? (
          <p className="text-sm text-purple-400">Processing with AI...</p>
        ) : processedImage ? (
          <p className="text-sm text-purple-400">
            ✨ Magic applied! Compare or export your result
          </p>
        ) : (
          <p className="text-sm text-gray-400">
            Select a tool to start editing
          </p>
        )}
      </div>
    </div>
  );
};

export default CanvasEditor;