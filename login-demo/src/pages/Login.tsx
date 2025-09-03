import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/atoms/button";
import { PhoneInput } from "@/components/molecules/phone-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/molecules/card";
import { validateIranianMobile, normalizeIranianMobile, fetchRandomUser, saveUser, isAuthenticated } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Smartphone } from "lucide-react";
import ThemeToggle from "@/components/molecules/theme-toggle";
import LanguageSwitcher from "@/components/molecules/language-switcher";
import { useTranslation } from "react-i18next";

/**
 * Login component for user authentication via Iranian mobile number.
 *
 * Renders a login form that accepts a user's mobile number, validates it,
 * and simulates a login process. On successful login, the user is redirected
 * to the dashboard and greeted with a toast notification. Handles loading state,
 * error display, and input validation.
 *
 * @component
 * @returns {JSX.Element} The rendered login form UI.
 *
 * @example
 * <Login />
 *
 * @remarks
 * - Redirects authenticated users to the dashboard automatically.
 * - Uses toast notifications for success and error feedback.
 * - Validates Iranian mobile numbers before proceeding.
 *
 * @dependencies
 * - React hooks: useState, useEffect
 * - Routing: useNavigate
 * - UI components: Card, CardHeader, CardTitle, CardDescription, CardContent, Button, PhoneInput
 * - Icons: Smartphone, Loader2
 * - Utility functions: isAuthenticated, validateIranianMobile, normalizeIranianMobile, fetchRandomUser, saveUser
 * - Toast context: useToast
 * - i18n: useTranslation
 */
const Login = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateIranianMobile(phone)) {
      setError(t("login.invalidPhone"));
      return;
    }

    setIsLoading(true);

    try {
      const user = await fetchRandomUser();
      const normalizedPhone = normalizeIranianMobile(phone);

      saveUser(user, normalizedPhone);

      toast({
        title: t("login.successTitle"),
        description: t("login.successDescription", { name: `${user.name.first} ${user.name.last}` }),
      });

      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t("login.errorGeneric");
      setError(errorMessage);
      toast({
        title: t("login.errorTitle"),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        {/* Logo/Brand section */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-elegant">
            <Smartphone className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{t("login.headerTitle")}</h1>
          <p className="text-muted-foreground">{t("login.headerSubtitle")}</p>
        </div>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="text-xl">{t("login.cardTitle")}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("login.cardDescription")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <PhoneInput
                label={t("login.phoneLabel")}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (error) setError("");
                }}
                error={error}
                disabled={isLoading}
                autoFocus
              />

              <Button
                type="submit"
                variant="auth"
                size="lg"
                className="w-full font-medium"
                disabled={isLoading || !phone.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("login.loading")}
                  </>
                ) : (
                  t("login.submit")
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          {t("login.footer")}
        </div>
      </div>
    </div>
  );
};

export default Login;
