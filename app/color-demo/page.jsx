import ColorPalette from "@/components/ui/color-palette";

export default function ColorDemo() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-ivory">
        Redeemed Creative Arts <span className="text-warm-gold">Color System</span>
      </h1>

      <div className="max-w-4xl mx-auto">
        <ColorPalette />

        <div className="mt-12 bg-card p-6 rounded-lg border border-border">
          <h2 className="text-2xl font-bold mb-6 text-warm-gold">Color Application Examples</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-coral-red">Cards & Containers</h3>

              <div className="bg-dark-teal p-4 rounded-lg mb-4">
                <p className="text-ivory">Dark Teal Container</p>
              </div>

              <div className="bg-card border-2 border-warm-gold p-4 rounded-lg mb-4">
                <p className="text-ivory">Card with Warm Gold Border</p>
              </div>

              <div className="bg-card border-l-4 border-coral-red p-4 rounded-lg">
                <p className="text-ivory">Card with Coral Red Accent</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-coral-red">Text & Highlights</h3>

              <p className="mb-3">
                <span className="text-warm-gold font-semibold">Warm Gold</span> is used for
                <span className="bg-warm-gold bg-opacity-20 px-1 mx-1 rounded">highlighting</span>
                important information.
              </p>

              <p className="mb-3">
                <span className="text-coral-red font-semibold">Coral Red</span> is used for
                <span className="bg-coral-red bg-opacity-20 px-1 mx-1 rounded">accenting</span>
                interactive elements.
              </p>

              <p className="mb-3">
                <span className="text-dark-teal font-semibold">Dark Teal</span> is used for
                <span className="bg-dark-teal bg-opacity-30 px-1 mx-1 rounded">stabilizing</span>
                the visual hierarchy.
              </p>

              <p>
                <span className="text-crimson-red font-semibold">Crimson Red</span> is used for
                <span className="bg-crimson-red bg-opacity-20 px-1 mx-1 rounded">warning</span>
                states and destructive actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
