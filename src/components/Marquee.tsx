const ROW_A = ["Python", "PyTorch", "LangGraph", "FastAPI", "Django", "React", "TensorFlow", "Kafka", "Docker", "AWS"];
const ROW_B = ["Multi-Agent Systems", "Computer Vision", "Real-Time Backends", "LLM Workflows", "Event-Driven Systems", "REST APIs"];

function Row({ items, reverse, outline }: { items: string[]; reverse?: boolean; outline?: boolean }) {
  const content = [...items, ...items];
  return (
    <div className="marquee flex overflow-hidden">
      <div className="marquee-track flex shrink-0 items-center" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {content.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`whitespace-nowrap px-6 text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-tight transition-colors duration-300 ${
                outline
                  ? "font-serif italic text-transparent [-webkit-text-stroke:1px_color-mix(in_oklab,var(--color-bone)_35%,transparent)] hover:text-accent hover:[-webkit-text-stroke:0]"
                  : "font-semibold text-bone hover:text-accent"
              }`}
            >
              {item}
            </span>
            <span className="text-2xl text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Technologies" className="relative -ml-[2%] w-[104%] -rotate-1 space-y-4 border-y border-line bg-ink-2 py-8">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse outline />
    </section>
  );
}
