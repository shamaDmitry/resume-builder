import { toast } from "sonner";

export const clipboardFallback = (text: string) => {
  try {
    // Create temporary input element
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    // Execute copy command
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (successful) {
      toast("Resume saved and link copied to clipboard!");
    } else {
      toast("Resume saved! URL: " + text);
    }
  } catch (err) {
    console.error("Fallback clipboard method failed:", err);
    toast("Resume saved! URL: " + text);
  }
};
