interface StopBackgroundProps {
  id: number;
  isInView: boolean;
  reducedMotion: boolean;
}

// Full bleed placeholder art for each stop. No final illustrations yet.
// Swap the returned JSX for the matching id with real artwork when it lands.
export default function StopBackground({ id, isInView, reducedMotion }: StopBackgroundProps) {
  const motion = (full: string) => (reducedMotion ? "animate-universe-fade" : isInView ? full : "opacity-0");

  switch (id) {
    // STOP 0: dark screen, one tiny glowing dot at the centre
    case 0:
      return (
        <div className="absolute inset-0 bg-[#04060f] flex items-center justify-center">
          <div
            className={`w-3 h-3 rounded-full bg-white shadow-[0_0_30px_10px_rgba(255,255,255,0.6)] ${
              isInView ? "animate-pulse" : "opacity-0"
            }`}
          />
        </div>
      );

    // STOP 1: burst of orange, pink and white light
    case 1:
      return (
        <div className="absolute inset-0 bg-[#0d0510] flex items-center justify-center overflow-hidden">
          <div
            className={`w-[140%] aspect-square rounded-full ${motion("animate-universe-burst")}`}
            style={{
              background:
                "radial-gradient(circle, #fff 0%, #ffb74d 30%, #ff6f91 60%, transparent 75%)",
            }}
          />
        </div>
      );

    // STOP 2: deep blue sky, stars popping in one by one
    case 2:
      return (
        <div className="absolute inset-0 bg-[#0b1c4a]">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className={`absolute rounded-full bg-white ${isInView ? "animate-pulse" : "opacity-0"}`}
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                top: `${(i * 37) % 90}%`,
                left: `${(i * 53) % 95}%`,
                animationDelay: `${(i % 6) * 200}ms`,
              }}
            />
          ))}
        </div>
      );

    // STOP 3: friendly, colourful spiral galaxy
    case 3:
      return (
        <div className="absolute inset-0 bg-[#0b1c4a] flex items-center justify-center">
          <div
            className={`w-2/3 aspect-square rounded-full ${
              reducedMotion ? "" : isInView ? "animate-[spin_40s_linear_infinite]" : ""
            }`}
            style={{
              background:
                "conic-gradient(from 90deg, #90caf9, #a5d6a7, #1565c0, #2e7d32, #90caf9)",
              opacity: isInView || reducedMotion ? 0.85 : 0,
            }}
          />
        </div>
      );

    // STOP 4: big smiling yellow sun
    case 4:
      return (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "linear-gradient(#fff3c4, #ffcc80)" }}
        >
          <div
            className={`w-1/2 aspect-square rounded-full bg-[#ffb300] shadow-[0_0_80px_30px_rgba(255,179,0,0.5)] ${
              isInView ? "animate-pulse" : "opacity-0"
            }`}
          />
        </div>
      );

    // STOP 5: simple solar system, Earth highlighted, planets loop
    case 5:
      return (
        <div className="absolute inset-0 bg-[#0d2b52] flex items-center justify-center">
          <div className="relative w-3/4 aspect-square">
            <div className="absolute inset-0 rounded-full border border-white/20" />
            <div className="absolute inset-[15%] rounded-full border border-white/20" />
            <div className="absolute inset-[30%] rounded-full border border-white/20" />
            <div className="absolute inset-0 rounded-full bg-[#ffb300] w-6 h-6 m-auto" />
            <div
              className={`absolute inset-[15%] ${
                reducedMotion ? "" : isInView ? "animate-[spin_9s_linear_infinite]" : ""
              }`}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cobalt" />
            </div>
          </div>
        </div>
      );

    // STOP 6: Earth cooling from fiery red to blue and green oceans
    case 6:
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a0a05]">
          <div
            className="w-1/2 aspect-square rounded-full transition-colors duration-[3000ms]"
            style={{
              background: isInView
                ? "radial-gradient(circle at 35% 35%, #90caf9, #1565c0 55%, #2e7d32 80%)"
                : "radial-gradient(circle at 35% 35%, #ff8a65, #e65100 55%, #4e1c0a 80%)",
            }}
          />
        </div>
      );

    // STOP 7: wobbly blob creatures floating underwater
    case 7:
      return (
        <div className="absolute inset-0 bg-[#0d3b52]">
          {[20, 45, 70].map((left, i) => (
            <div
              key={i}
              className={`absolute rounded-[45%_55%_60%_40%] bg-mint/80 ${
                isInView ? "animate-universe-sway" : "opacity-0"
              }`}
              style={{ width: 60, height: 48, top: `${30 + i * 15}%`, left: `${left}%` }}
            />
          ))}
        </div>
      );

    // STOP 8: friendly cartoon dinosaurs stomping in a green landscape
    case 8:
      return (
        <div
          className={`absolute inset-0 bg-[#dff0d8] ${isInView ? "animate-universe-shake" : ""}`}
        >
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-forest" />
          {[15, 45, 75].map((left, i) => (
            <div
              key={i}
              className="absolute bottom-[28%] w-16 h-24 rounded-t-full bg-emerald"
              style={{ left: `${left}%` }}
            />
          ))}
        </div>
      );

    // STOP 9: soft streak of light above quiet dinosaur silhouettes, gentle, no impact shown
    case 9:
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#3a2e52] to-[#151022]">
          <div className="absolute bottom-0 inset-x-0 h-1/4 bg-[#0d0a16]" />
          <div
            className={`absolute top-1/4 left-0 w-24 h-1 rounded-full bg-sky ${motion(
              "animate-universe-streak"
            )}`}
          />
        </div>
      );

    // STOP 10: friendly parade of mammals walking across
    case 10:
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#cfe8d5] to-[#a5d6a7]">
          <div
            className={`absolute bottom-[20%] inset-x-0 flex justify-around ${
              isInView ? "animate-universe-walk" : ""
            }`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-12 h-10 rounded-full bg-[#6d4c41]" />
            ))}
          </div>
        </div>
      );

    // STOP 11: simple cave family around a warm campfire, cave paintings on the wall
    case 11:
      return (
        <div className="absolute inset-0 bg-[#241a12]">
          <div className="absolute inset-6 border border-white/10 rounded" />
          <div
            className={`absolute bottom-[20%] left-1/2 -translate-x-1/2 w-10 h-14 rounded-t-full bg-[#ff7043] ${
              isInView ? "animate-universe-flicker" : ""
            }`}
          />
        </div>
      );

    // STOP 12: small huts, fields, farm animals, crops sway
    case 12:
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#bfe3c9] to-[#8fc99f]">
          <div className="absolute bottom-0 inset-x-0 h-1/3 flex items-end gap-2 px-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-10 bg-forest rounded-t-full origin-bottom ${
                  isInView ? "animate-universe-sway" : ""
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
          <div className="absolute bottom-[30%] left-[20%] w-14 h-12 bg-[#a1887f] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
        </div>
      );

    // STOP 13: skyline rising from small huts to a modern city, cars and planes drift
    case 13:
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-sky to-white overflow-hidden">
          <div className="absolute bottom-0 inset-x-0 flex items-end gap-2 px-4">
            {[20, 40, 55, 70, 90, 110, 60, 35].map((h, i) => (
              <div
                key={i}
                className={`w-8 bg-navy ${isInView ? "animate-universe-rise" : "opacity-0"}`}
                style={{ height: h, animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
          <div
            className={`absolute top-10 left-0 w-10 h-2 rounded bg-white/90 ${
              isInView ? "animate-universe-walk" : ""
            }`}
          />
        </div>
      );

    // STOP 14: child looking at the stars beside the guide, today's world glowing softly
    case 14:
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d2b52] to-[#1565c0] flex items-center justify-center">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full bg-white ${
                isInView ? "animate-pulse" : "opacity-0"
              }`}
              style={{
                top: `${(i * 41) % 90}%`,
                left: `${(i * 29) % 95}%`,
                animationDelay: `${(i % 5) * 150}ms`,
              }}
            />
          ))}
          <div
            className={`w-24 h-24 rounded-full bg-white/10 ${motion("animate-universe-fade")}`}
          />
        </div>
      );

    default:
      return <div className="absolute inset-0 bg-surface" />;
  }
}
