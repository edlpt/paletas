import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { SlimeDivider } from "@/components/brand/SlimeDivider";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { AlienIcon } from "@/components/brand/AlienIcon";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("¡Cuenta creada! Revisa tu email.");
      navigate({ to: "/login" });
    }
    
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pb-20">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[image:var(--gradient-space)] opacity-30 mix-blend-screen" />
      
      <div className="z-10 w-full max-w-sm rounded-[2rem] bg-surface p-8 shadow-card border border-slime/30 relative mt-8">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24">
          <AlienIcon className="shadow-glow" />
        </div>

        <h1 className="mt-8 mb-2 text-center font-graffiti text-3xl text-slime text-glow">
          CREAR CUENTA
        </h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Únete a El De Las Paletas
        </p>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-lime ml-1">Nombre Completo</label>
            <input 
              type="text" 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-slime focus:outline-none focus:ring-1 focus:ring-slime transition-colors"
              placeholder="Ej: Paletero 420"
            />
          </div>

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

          <NeonButton type="submit" variant="slime" size="lg" className="mt-4 w-full" disabled={loading}>
            {loading ? "CREANDO..." : "REGISTRARME"}
          </NeonButton>
        </form>

        <SlimeDivider className="my-6 h-4 opacity-50" />

        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-bold text-psy hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
