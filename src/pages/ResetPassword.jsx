import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, AlertTriangle } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { useTranslatedContent } from "@/lib/i18n/useTranslatedContent";

const CONTENT = {
  title: "New password",
  subtitle: "Enter your new password below",
  password: "New Password",
  confirm: "Confirm Password",
  resetting: "Resetting...",
  reset: "Reset password",
  passwordMismatch: "Passwords do not match",
  resetFailed: "Failed to reset password",
  invalidTitle: "Invalid reset link",
  invalidSubtitle: "This password reset link is missing or invalid",
  requestNew: "Request a new link",
  invalidMessage: "The link you used appears to be incomplete. Please request a new password reset email.",
};

export default function ResetPassword() {
  const { content: c } = useTranslatedContent("reset-password", CONTENT);
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError(c.passwordMismatch);
      return;
    }
    setLoading(true);
    try {
      await base44.auth.resetPassword({ resetToken, newPassword });
      window.location.href = "/login";
    } catch (err) {
      setError(err.message || c.resetFailed);
    } finally {
      setLoading(false);
    }
  };

  if (!resetToken) {
    return (
      <AuthLayout
        icon={AlertTriangle}
        title={c.invalidTitle}
        subtitle={c.invalidSubtitle}
        footer={
          <Link to="/forgot-password" className="text-primary font-medium hover:underline">
            {c.requestNew}
          </Link>
        }
      >
        <p className="text-sm text-foreground text-center">
          {c.invalidMessage}
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={Lock}
      title={c.title}
      subtitle={c.subtitle}
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">{c.password}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              autoFocus
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">{c.confirm}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {c.resetting}
            </>
          ) : (
            c.reset
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}