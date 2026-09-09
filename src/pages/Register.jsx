import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { toast } from "@/components/ui/use-toast";
import { safeReturnTo } from "@/lib/authReturnTo";
import { useTranslatedContent } from "@/lib/i18n/useTranslatedContent";

const CONTENT = {
  title: "Create your account",
  subtitle: "Join Tamu Academy and get immediate access to our courses.",
  footerPre: "Already have an account?",
  footerLink: "Log in",
  google: "Continue with Google",
  or: "or",
  email: "Email",
  emailPlaceholder: "you@example.com",
  password: "Password",
  confirm: "Confirm Password",
  creating: "Creating account...",
  create: "Create account",
  passwordMismatch: "Passwords do not match",
  registrationFailed: "Registration failed",
  verifyTitle: "Verify your email",
  verifySubtitle: "We sent a code to",
  verifying: "Verifying...",
  verify: "Verify",
  didntReceive: "Didn't receive the code?",
  resend: "Resend",
  invalidCode: "Invalid verification code",
  codeSentTitle: "Code sent",
  codeSentDesc: "Check your email for the new code.",
  failedResend: "Failed to resend code",
};

export default function Register() {
  const { content: c } = useTranslatedContent("register", CONTENT);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError(c.passwordMismatch);
      return;
    }
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setShowOtp(true);
    } catch (err) {
      setError(err.message || c.registrationFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) {
        base44.auth.setToken(result.access_token);
      }
      const returnTo = safeReturnTo();
      window.location.href = returnTo === "/" ? "/welcome" : returnTo;
    } catch (err) {
      setError(err.message || c.invalidCode);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await base44.auth.resendOtp(email);
      toast({
        title: c.codeSentTitle,
        description: c.codeSentDesc,
      });
    } catch (err) {
      setError(err.message || c.failedResend);
    }
  };

  const handleGoogle = () => {
    const returnTo = safeReturnTo();
    base44.auth.loginWithProvider("google", returnTo === "/" ? "/welcome" : returnTo);
  };

  if (showOtp) {
    return (
      <AuthLayout
        icon={Mail}
        title={c.verifyTitle}
        subtitle={`${c.verifySubtitle} ${email}`}
      >
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}
        <div className="flex justify-center mb-6">
          <InputOTP
            maxLength={6}
            value={otpCode}
            onChange={setOtpCode}
            autoFocus
            autoComplete="one-time-code"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button
          className="w-full h-12 font-medium"
          onClick={handleVerify}
          disabled={loading || otpCode.length < 6}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {c.verifying}
            </>
          ) : (
            c.verify
          )}
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-4">
          {c.didntReceive}{" "}
          <button onClick={handleResend} className="text-primary font-medium hover:underline">
            {c.resend}
          </button>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={UserPlus}
      title={c.title}
      subtitle={c.subtitle}
      footer={
        <>
          {c.footerPre}{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            {c.footerLink}
          </Link>
        </>
      }
    >
      <Button
        variant="outline"
        className="w-full h-12 text-sm font-medium mb-6"
        onClick={handleGoogle}
      >
        <GoogleIcon className="w-5 h-5 mr-2" />
        {c.google}
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">{c.or}</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

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
        <div className="space-y-2">
          <Label htmlFor="password">{c.password}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {c.creating}
            </>
          ) : (
            c.create
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}