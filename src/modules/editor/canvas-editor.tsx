import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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

        <div className="w-full h-full">
          <img
            src={processedImage || originalImage}
            alt={processedImage ? "Processed" : "Original"}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      <div className="text-center">
        {isProcessing ? (
          <p className="text-sm text-purple-400">
            Processing with AI...
          </p>
        ) : processedImage ? (
          <p className="text-sm text-purple-400">
            ✨ Magic applied! Your image is ready.
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