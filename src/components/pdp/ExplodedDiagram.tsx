import { useState } from "react";
import { ZoomIn, ZoomOut, Move, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface DiagramHotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  partNumber: string;
}

interface ExplodedDiagramProps {
  diagramUrl: string;
  hotspots: DiagramHotspot[];
  onHotspotClick?: (partNumber: string) => void;
}

const ExplodedDiagram = ({ diagramUrl, hotspots, onHotspotClick }: ExplodedDiagramProps) => {
  const [zoom, setZoom] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <div className="card-industrial overflow-hidden">
      <div className="bg-secondary px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-bold text-foreground">Exploded Diagram</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm font-mono text-muted-foreground w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(Math.min(2, zoom + 0.25))}
            disabled={zoom >= 2}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Move className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative bg-muted/30 overflow-auto" style={{ height: "400px" }}>
        <div 
          className="relative transition-transform duration-200 origin-top-left"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Diagram Image */}
          <img
            src={diagramUrl}
            alt="Exploded parts diagram"
            className="w-full h-auto min-h-[400px] object-contain"
          />
          
          {/* Hotspots */}
          {hotspots.map((hotspot) => (
            <Tooltip key={hotspot.id}>
              <TooltipTrigger asChild>
                <button
                  className={`absolute w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    activeHotspot === hotspot.id
                      ? "bg-accent border-accent text-accent-foreground scale-125"
                      : "bg-primary border-primary text-primary-foreground hover:scale-110"
                  }`}
                  style={{ 
                    left: `${hotspot.x}%`, 
                    top: `${hotspot.y}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  onClick={() => {
                    setActiveHotspot(hotspot.id);
                    onHotspotClick?.(hotspot.partNumber);
                  }}
                >
                  <span className="text-xs font-bold">{hotspot.id}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">
                  <p className="font-semibold">{hotspot.label}</p>
                  <p className="font-mono text-xs text-muted-foreground">{hotspot.partNumber}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
      
      {/* Hotspot Legend */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-muted-foreground">Parts Reference</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              className={`text-left p-2 rounded text-sm transition-colors ${
                activeHotspot === hotspot.id
                  ? "bg-primary/10 border border-primary/30"
                  : "hover:bg-muted"
              }`}
              onClick={() => {
                setActiveHotspot(hotspot.id);
                onHotspotClick?.(hotspot.partNumber);
              }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold mr-2">
                {hotspot.id}
              </span>
              <span className="font-medium">{hotspot.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplodedDiagram;
