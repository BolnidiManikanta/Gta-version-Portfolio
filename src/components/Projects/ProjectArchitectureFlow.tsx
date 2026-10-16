import React, { useState } from 'react';
import { Layers, ArrowRight, ShieldCheck, Database, Cpu, Globe, Server, Radio } from 'lucide-react';

interface ArchitectureFlowProps {
  architectureText?: string;
  technologies?: string[];
}

interface ArchNode {
  id: string;
  label: string;
  role: string;
  icon: typeof Layers;
  technologies?: string[];
}

export const ProjectArchitectureFlow: React.FC<ArchitectureFlowProps> = ({
  architectureText,
  technologies = [],
}) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  if (!architectureText && (!technologies || technologies.length === 0)) {
    return null;
  }

  // Parse architecture string if it contains arrows "→" or "->" or construct a multi-tier pipeline
  const parsePipelineNodes = (): ArchNode[] => {
    if (architectureText && (architectureText.includes('→') || architectureText.includes('->'))) {
      const separator = architectureText.includes('→') ? '→' : '->';
      const parts = architectureText.split(separator).map((s) => s.trim()).filter(Boolean);
      if (parts.length >= 2) {
        return parts.map((part, idx) => {
          let icon = Layers;
          let role = 'Processing Pipeline';
          const lower = part.toLowerCase();

          if (lower.includes('user') || lower.includes('client') || lower.includes('input') || lower.includes('ui') || lower.includes('front')) {
            icon = Globe;
            role = 'Client / Ingestion Layer';
          } else if (lower.includes('api') || lower.includes('gateway') || lower.includes('rest') || lower.includes('socket')) {
            icon = Radio;
            role = 'Gateway / Transmission';
          } else if (lower.includes('model') || lower.includes('cnn') || lower.includes('ai') || lower.includes('infer') || lower.includes('detect') || lower.includes('filter')) {
            icon = Cpu;
            role = 'AI / Core Engine';
          } else if (lower.includes('db') || lower.includes('data') || lower.includes('mongo') || lower.includes('sql') || lower.includes('store')) {
            icon = Database;
            role = 'Persistence & State';
          } else if (lower.includes('server') || lower.includes('back') || lower.includes('flask') || lower.includes('express')) {
            icon = Server;
            role = 'Backend Service';
          }

          return {
            id: `node-${idx}`,
            label: part,
            role,
            icon,
          };
        });
      }
    }

    // Default intelligent pipeline based on project technologies
    const defaultNodes: ArchNode[] = [
      {
        id: 'node-0',
        label: 'Client Ingestion / UI',
        role: 'Presentation & User Interaction',
        icon: Globe,
        technologies: technologies.filter((t) => ['React.js', 'React', 'Streamlit', 'Tailwind CSS', 'HTML5', 'TypeScript', 'JavaScript'].includes(t)),
      },
      {
        id: 'node-1',
        label: 'API & Dispatch Layer',
        role: 'Authentication & Routing Gate',
        icon: Radio,
        technologies: technologies.filter((t) => ['Node.js', 'Express.js', 'Flask', 'REST APIs', 'JWT', 'WebSockets'].includes(t)),
      },
      {
        id: 'node-2',
        label: 'Core Logic & Intelligence',
        role: 'Processing & Algorithms',
        icon: Cpu,
        technologies: technologies.filter((t) => ['Python', 'OpenCV', 'TensorFlow', 'Scikit-Learn', 'Java', 'Cryptography'].includes(t)),
      },
      {
        id: 'node-3',
        label: 'Data Storage & Vault',
        role: 'Persistence & Transaction Log',
        icon: Database,
        technologies: technologies.filter((t) => ['MongoDB', 'SQL', 'PostgreSQL', 'Cloud Storage'].includes(t)),
      },
    ];

    return defaultNodes;
  };

  const nodes = parsePipelineNodes();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>TACTICAL ARCHITECTURE TOPOLOGY</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-500">
          HOVER COMPONENT TO INSPECT
        </span>
      </div>

      {/* Interactive Node Graph */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isHovered = activeNode === node.id;
          const isNextConnected = activeNode && (parseInt(activeNode.split('-')[1]) + 1 === index || parseInt(activeNode.split('-')[1]) - 1 === index);

          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`relative p-3 rounded-sm border transition-all duration-300 cursor-pointer ${
                isHovered
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] -translate-y-0.5'
                  : isNextConnected
                  ? 'bg-neutral-900/90 border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                  : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {/* Connector line indicator */}
              {index < nodes.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-cyan-500/60 pointer-events-none">
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isHovered ? 'scale-125 text-cyan-300' : ''}`} />
                </div>
              )}

              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] text-cyan-500/70 font-bold">
                  STEP 0{index + 1}
                </span>
                <Icon className={`w-4 h-4 transition-colors ${isHovered ? 'text-cyan-300' : 'text-neutral-400'}`} />
              </div>

              <div className="mt-1 font-hud text-xs font-bold text-white tracking-wide uppercase line-clamp-2">
                {node.label}
              </div>

              <div className="text-[10px] font-mono text-neutral-400 mt-1">
                {node.role}
              </div>

              {node.technologies && node.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {node.technologies.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded-xs bg-black/60 border border-cyan-500/20 text-[9px] font-mono text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Raw Architecture Text Display */}
      {architectureText && (
        <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-sm font-mono text-xs text-neutral-300 leading-relaxed flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-cyan-400 font-bold mr-1">DATA FLOW:</span>
            <span>{architectureText}</span>
          </div>
        </div>
      )}
    </div>
  );
};
