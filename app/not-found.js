import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-selene-bg flex flex-col items-center justify-center px-6">
      <div className="text-[64px] mb-6">🌙</div>
      <h1 className="font-display text-3xl text-selene-white mb-3">Pagina no encontrada</h1>
      <p className="text-sm text-selene-white-dim mb-8 text-center max-w-[340px]">
        Las estrellas no nos han guiado hasta aqui. Volvamos al inicio.
      </p>
      <Link
        href="/"
        className="bg-selene-gold text-selene-bg font-semibold text-sm px-6 py-3 rounded-xl hover:brightness-110 no-underline"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
