import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { useTranslatedContent } from "@/lib/i18n/useTranslatedContent";

const CONTENT = {
  title: "Reset password",
  subtitle: "We'll send you a link to reset it",
  backToLogin: "Back to log in",
  email: "Email address",
  emailPlaceholder: "you@example.com",
  sending: "Sending...",
  sendResetLink: "Send reset link",
  sentMessage: "If an account exists with that email, you'll receive a password reset link shortly.",
};

export default function ForgotPassword() {
  const { content: c } = useTranslatedContent("forgot-password", CONTENT);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.auth.resetPasswordRequest(email);
    } catch {
      // Always show success regardless
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <AuthLayout
      icon={Mail}
      title={c.title}
      subtitle={c.subtitle}
      footer={
        <Link to="/login" className="text-primary font-medium hover:underline">
          <ArrowLeft className="w-3 h-3 inline mr-1" />{c.backToLogin}
        </Link>
      }
    >
      {sent ? (
        <p className="text-sm text-foreground text-center">
          {c.sentMessage}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{c.email}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
                placeholder={c.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {c.sending}
              </>
            ) : (
              c.sendResetLink
            )}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}