import DefaultLayout from "@/components/DefaultLayout";


export default function NotFound() {
  return (
    <DefaultLayout>
      <section>
        <div
          className="relative lg:h-[25rem] h-[15rem]"
          style={{
            backgroundImage: "url('/images/banner-06.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-blue-950/50 flex items-center justify-center">
            <h1 className="lg:text-6xl text-4xl font-bold text-white">Seite nicht gefunden</h1>
          </div>
        </div>
        </section>

          
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Es fehlt etwas.</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Entschuldigung, wir können diese Seite nicht finden. Auf der Startseite gibt es viel zu entdecken.</p>
          </div>
        </div>
      </section>

    </DefaultLayout>

  )
}