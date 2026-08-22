import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { SlimeDivider } from "@/components/brand/SlimeDivider";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/splash")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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
    <div className="flex min-h-screen flex-col items-center justify-between bg-background px-6 py-12 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 z-0 bg-[image:var(--gradient-space)] mix-blend-screen opacity-60" />
      
      {/* Logo */}
      <div className="z-10 mt-8 w-full max-w-[280px]">
        <img src="/01_logo.png" alt="El De Las Paletas" className="w-full h-auto drop-shadow-[0_0_15px_var(--slime)]" />
      </div>

      {/* Astronaut Alien */}
      <div className="z-10 flex-1 flex items-center justify-center w-full max-w-[300px]">
        <img 
          src="/13_alien_astronaut .png" 
          alt="Alien Astronaut" 
          className="w-full h-auto animate-float drop-shadow-2xl" 
        />
      </div>
      
      {/* Bottom Text and Actions */}
      <div className="z-10 flex flex-col items-center w-full text-center pb-8 mt-2">
        <h2 className="text-3xl text-lime font-bold tracking-wider drop-shadow-[0_0_8px_var(--lime)]">
          Bienvenido 420
        </h2>
        <p className="text-sm font-bold tracking-widest text-white/70 mt-1 mb-8">
          Tienda Oficial
        </p>

        <div className="flex flex-col gap-4 w-full">
          <NeonButton 
            onClick={() => setIsLoginOpen(true)}
            size="lg" 
            className="w-full text-lg font-bold bg-lime text-black border-none shadow-[0_0_20px_-5px_var(--lime)] hover:bg-lime/90"
          >
            Entrar
          </NeonButton>
          <Link to="/register" className="w-full">
            <NeonButton variant="ghost" size="lg" className="w-full text-lg font-bold text-lime hover:text-lime/80">
              Crear cuenta
            </NeonButton>
          </Link>
        </div>
      </div>

      {/* Bottom Sheet Modal for Login */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
            onClick={() => setIsLoginOpen(false)} 
          />
          <div className="relative w-full rounded-t-[2rem] bg-surface p-8 shadow-glow animate-in slide-in-from-bottom-full duration-300 border-t border-border">
            
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 pointer-events-none">
              <img src="/14_alien_head.png" alt="Alien" className="w-full h-full object-contain animate-float drop-shadow-[0_0_15px_var(--slime)]" />
            </div>

            <h1 className="mt-8 mb-2 text-center font-bold text-2xl text-foreground">
              INICIAR SESIÓN
            </h1>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              Ingresar a la tienda
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4 relative z-10">
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
                <button type="button" className="text-xs font-medium text-muted-foreground hover:text-white transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <div className="mt-2 relative group">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 text-black text-lg font-bold bg-lime rounded-full shadow-[0_0_15px_rgba(163,230,53,0.4)] relative z-10 active:scale-95 transition-transform flex items-center justify-center outline-none focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-background"
                >
                  <span className="relative z-10">{loading ? "ENTRANDO..." : "ENTRAR"}</span>
                  <div className="absolute top-[92%] left-4 right-4 z-0 pointer-events-none opacity-100">
                    <SlimeDivider className="h-4 w-full text-lime" />
                  </div>
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-muted-foreground pb-safe mt-10 relative z-10">
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="font-bold text-lime hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
