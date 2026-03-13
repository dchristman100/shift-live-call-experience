import { Phone, X } from "lucide-react";
import { useRetellCall } from "@/hooks/useRetellCall";
import { Button } from "@/components/ui/button";

export default function CallWidget() {
  const {
    callStatus,
    startCall,
    hangUpCall,
    isAgentTalking,
  } = useRetellCall();

  const isCallActive =
    callStatus === "connecting" || callStatus === "in_call";

  const handleCallToggle = async () => {
    if (isCallActive) {
      await hangUpCall();
    } else {
      await startCall();
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-[9999] flex justify-center px-4 sm:bottom-6 sm:px-6">
      <Button
        type="button"
        variant="ghost"
        className="relative flex items-center justify-between w-full max-w-[300px] px-4 py-3 rounded-full bg-white shadow-[0_16px_32px_rgba(10,16,40,0.35)] hover:bg-white h-20"
        onClick={handleCallToggle}
      >
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <img
              src="https://images.leadconnectorhq.com/image/f_webp/q_100/r_180/u_https://assets.cdn.filesafe.space/ASYI07d4Xt8ifUCwVZyT/media/68b45b84cc1c1a1d42f9ff63.png"
              alt="AI Avatar"
              className="w-full h-full object-cover"
            />

            {callStatus === "in_call" && isAgentTalking && (
              <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-30" />
            )}
          </div>

          <div className="text-left">
            <div className="text-base font-semibold text-[#1D2548]">
              {callStatus === "connecting"
                ? "Connecting..."
                : callStatus === "in_call"
                ? "Live Call"
                : "Click to Talk"}
            </div>
            <div className="text-xs text-[#6C77A8]">
              {callStatus === "in_call"
                ? isAgentTalking
                  ? "AI is speaking..."
                  : "Listening..."
                : "Live demo call"}
            </div>
          </div>
        </div>

        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: isCallActive ? "#EF4444" : "#fa982f",
          }}
        >
          {isCallActive ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Phone className="w-5 h-5 text-white" />
          )}
        </div>
      </Button>
    </div>
  );
}

export { CallWidget };
