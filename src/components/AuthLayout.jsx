import React from "react";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-brand bg-primary mb-4">
            <Icon className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
          </div>
          <p className="font-body text-xs uppercase tracking-[0.22em] text-primary mb-3">
            Tamu Academy
          </p>
          <h1 className="font-heading text-3xl tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="font-body text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        <div className="bg-card text-card-foreground rounded-brand border border-border p-8">
          {children}
        </div>
        {footer && (
          <p className="font-body text-center text-sm text-muted-foreground mt-6">{footer}</p>
        )}
      </div>
    </div>
  );
}