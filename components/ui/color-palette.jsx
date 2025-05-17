export default function ColorPalette() {
  return (
    <div className="p-6 bg-background rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-ivory">Brand Color Palette</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="flex flex-col">
          <div className="h-24 bg-dark-teal rounded-t-lg"></div>
          <div className="bg-card p-3 rounded-b-lg">
            <p className="font-medium">Dark Teal</p>
            <p className="text-sm text-muted-foreground">#264653</p>
            <p className="text-xs mt-1">Stability, trust, balance</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-24 bg-coral-red rounded-t-lg"></div>
          <div className="bg-card p-3 rounded-b-lg">
            <p className="font-medium">Coral Red</p>
            <p className="text-sm text-muted-foreground">#E76F51</p>
            <p className="text-xs mt-1">Encouragement, warmth</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-24 bg-warm-gold rounded-t-lg"></div>
          <div className="bg-card p-3 rounded-b-lg">
            <p className="font-medium">Warm Gold</p>
            <p className="text-sm text-muted-foreground">#F4A261</p>
            <p className="text-xs mt-1">Joy, generosity, hope</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-24 bg-ivory rounded-t-lg"></div>
          <div className="bg-card p-3 rounded-b-lg">
            <p className="font-medium">Ivory</p>
            <p className="text-sm text-muted-foreground">#F9F7F1</p>
            <p className="text-xs mt-1">Space, purity, clarity</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-24 bg-crimson-red rounded-t-lg"></div>
          <div className="bg-card p-3 rounded-b-lg">
            <p className="font-medium">Crimson Red</p>
            <p className="text-sm text-muted-foreground">#C0392B</p>
            <p className="text-xs mt-1">Passion, sacrifice</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-ivory">Usage Examples</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-4 rounded-lg border border-border">
          <h4 className="text-lg font-medium mb-3 text-warm-gold">Text Colors</h4>
          <p className="text-ivory mb-2">Primary text (Ivory)</p>
          <p className="text-warm-gold mb-2">Accent text (Warm Gold)</p>
          <p className="text-coral-red mb-2">Highlight text (Coral Red)</p>
          <p className="text-dark-teal mb-2">Secondary text (Dark Teal)</p>
          <p className="text-crimson-red">Warning text (Crimson Red)</p>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
          <h4 className="text-lg font-medium mb-3 text-warm-gold">UI Elements</h4>
          <div className="flex flex-col gap-3">
            <button className="px-4 py-2 bg-warm-gold text-background rounded hover:bg-opacity-90 transition">
              Primary Button
            </button>
            <button className="px-4 py-2 bg-dark-teal text-ivory rounded hover:bg-opacity-90 transition">
              Secondary Button
            </button>
            <button className="px-4 py-2 bg-coral-red text-ivory rounded hover:bg-opacity-90 transition">
              Accent Button
            </button>
            <button className="px-4 py-2 bg-crimson-red text-ivory rounded hover:bg-opacity-90 transition">
              Destructive Button
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
