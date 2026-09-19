"use client";

import { useEffect } from "react";

export function CodeCopyButtons() {
  useEffect(() => {
    const preBlocks = document.querySelectorAll<HTMLPreElement>(
      ".blog-content pre"
    );

    preBlocks.forEach((pre) => {
      const wrapper = pre.parentElement;
      if (!wrapper) return;

      // Avoid adding a duplicate button if this effect runs more than once
      if (wrapper.querySelector(".copy-code-btn")) return;

      wrapper.classList.add("group", "relative");

      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "copy-code-btn absolute top-3 right-3 rounded-md border border-gray-700 bg-gray-800/90 px-2.5 py-1 text-xs font-medium text-gray-300 opacity-0 transition-opacity duration-200 hover:bg-gray-700 group-hover:opacity-100";
      button.textContent = "Copy";

      button.addEventListener("click", async () => {
        const code = pre.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "Copied!";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 2000);
        } catch {
          button.textContent = "Failed";
        }
      });

      wrapper.appendChild(button);
    });
  }, []);

  return null;
}