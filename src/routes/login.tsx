import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { SlimeDivider } from "@/components/brand/SlimeDivider";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { AlienIcon } from "@/components/brand/AlienIcon";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("¡Bienvenido al universo!");
      navigate({ to: "/" });
    }
    
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pb-20">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[image:var(--gradient-space)] opacity-30 mix-blend-screen" />
      
      <div className="z-10 w-full max-w-sm rounded-[2rem] bg-surface p-8 shadow-card border border-psy/30 relative mt-8">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24">
          <AlienIcon className="shadow-psy" />
        </div>

        <h1 className="mt-8 mb-2 text-center font-graffiti text-3xl text-psy text-glow">
          INICIAR SESIÓN
        </h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Ingresa a tu portal espacial
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-lime ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-slime focus:outline-none focus:ring-1 focus:ring-slime transition-colors"
              placeholder="tu@email.com"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-lime ml-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-slime focus:outline-none focus:ring-1 focus:ring-slime transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-medium text-psy hover:text-psy/80 transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <NeonButton type="submit" variant="psy" size="lg" className="mt-2 w-full" disabled={loading}>
            {loading ? "VIAJANDO..." : "ENTRAR"}
          </NeonButton>
        </form>

        <SlimeDivider className="my-6 h-4 opacity-50" />

        <p className="text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="font-bold text-slime hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
