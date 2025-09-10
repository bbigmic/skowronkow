import { useEffect, useRef } from "react";

function WykazCen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://api.wykazcen.pl/widget.v1.js?apiKey=653d743d-0aaa-3651-4466-2aa4b951db13&investmentKey=944fcb33-f8b6-d07d-2150-011e9c60ff8f";
    script.async = true;
    
    // Dodajemy script do konkretnego kontenera zamiast do body
    containerRef.current.appendChild(script);

    return () => {
      // Cleanup - usuwamy script z kontenera
      if (containerRef.current && script.parentNode) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div id="wykazcen-widget" className="w-full"></div>
    </div>
  );
}

export default WykazCen;