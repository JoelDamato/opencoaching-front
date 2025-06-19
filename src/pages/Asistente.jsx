import React from "react";

export default function CoachProPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="h-[calc(100vh-4rem)] w-full">
        <iframe
          src="https://chatgpt.com/g/g-684438832f4c8191b275416769926328-coachpro-ai-tu-asistente-de-opencoaching"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allow="clipboard-write; clipboard-read; fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups"
          title="CoachPro AI"
        />
      </div>
    </div>
  );
}
