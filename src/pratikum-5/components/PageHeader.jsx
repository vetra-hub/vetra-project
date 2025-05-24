import React from "react";

export default function PageHeader({ title, breadcrumb = [] }) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <nav className="text-sm text-gray-500 mt-1">
        {breadcrumb.map((item, index) => (
          <span key={index}>
            {index !== 0 && " / "}
            {item.link ? <a href={item.link} className="text-blue-600 hover:underline">{item.label}</a> : item.label}
          </span>
        ))}
      </nav>
    </div>
  );
}