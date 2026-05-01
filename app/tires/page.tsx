import TireCatalog from "@/app/components/TireCatalog";

export const metadata = {
  title: 'Купити шини | SVIS.YV',
};

export default function TiresPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-20 relative">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-brand/5 via-dark to-dark pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <TireCatalog />
      </div>
    </main>
  );
}
