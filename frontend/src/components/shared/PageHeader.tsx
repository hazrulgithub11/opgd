import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="px-6 pt-6 pb-4">
      <h1 className="text-lg font-bold text-gray-800 tracking-wide uppercase mb-4">
        {title}
      </h1>
      {children}
    </div>
  );
}
