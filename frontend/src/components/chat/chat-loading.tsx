import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const thresholdTime = 750;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, thresholdTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 transition-opacity duration-1000 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      {isLoading && (
        <div className="max-w-md text-center space-y-4">
          <div className="flex justify-center gap-4 mb-4 ">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Loading Conversation!</h2>
          <p className="text-base-content/60">
            Loading your conversation. Please wait...
          </p>
        </div>
      )}
    </div>
  );
};

export default Loading;
