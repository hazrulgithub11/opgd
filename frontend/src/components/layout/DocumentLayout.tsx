import { ReactNode } from "react";

interface DocumentLayoutProps {
  document: ReactNode;
  actions: ReactNode;
}

export default function DocumentLayout({ document, actions }: DocumentLayoutProps) {
  return (
    <div className="flex min-h-full min-w-0 flex-col gap-4 p-3 md:flex-row md:p-6">
      <div className="min-w-0 flex-1 rounded border border-gray-200 bg-white p-4 shadow-sm md:min-h-[500px] md:p-8">
        {document}
      </div>

      <div className="w-full flex-shrink-0 md:w-36">
        {actions}
      </div>
    </div>
  );
}
