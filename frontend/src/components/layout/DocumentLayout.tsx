import { ReactNode } from "react";

interface DocumentLayoutProps {
  document: ReactNode;
  actions: ReactNode;
}

export default function DocumentLayout({ document, actions }: DocumentLayoutProps) {
  return (
    <div className="flex gap-4 p-6 min-h-full">
      {/* Document card */}
      <div className="flex-1 bg-white rounded shadow-sm border border-gray-200 p-8 min-h-[500px]">
        {document}
      </div>

      {/* Action sidebar */}
      <div className="w-36 flex flex-col gap-2 flex-shrink-0">
        {actions}
      </div>
    </div>
  );
}
