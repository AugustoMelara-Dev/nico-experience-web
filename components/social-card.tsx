/* eslint-disable @next/next/no-img-element -- Satori renders OG images from standard img elements. */

type SocialCardProps = {
  eyebrow: string
  title: string
  description: string
  imageUrl: string
}

export function SocialCard({
  eyebrow,
  title,
  description,
  imageUrl,
}: SocialCardProps) {
  return (
    <div
      style={{
        alignItems: "stretch",
        backgroundColor: "#071433",
        color: "#ffffff",
        display: "flex",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <img
        src={imageUrl}
        alt=""
        width="1200"
        height="630"
        style={{
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          width: "100%",
        }}
      />
      <div
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(4,16,54,.96) 0%, rgba(4,16,54,.86) 45%, rgba(4,16,54,.24) 78%, rgba(4,16,54,.08) 100%)",
          display: "flex",
          height: "100%",
          position: "absolute",
          width: "100%",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "62px 68px 54px",
          position: "relative",
          width: "760px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          Nico Experience
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#e8b04c",
              display: "flex",
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 34 ? 54 : 64,
              fontWeight: 700,
              letterSpacing: "-0.055em",
              lineHeight: 1.02,
              marginBottom: 24,
              maxWidth: "690px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,.82)",
              display: "flex",
              fontSize: 24,
              lineHeight: 1.35,
              maxWidth: "650px",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            color: "rgba(255,255,255,.76)",
            display: "flex",
            fontSize: 18,
          }}
        >
          Tocoa, Colón · Honduras
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#d6993a",
          bottom: 0,
          display: "flex",
          height: "10px",
          left: 0,
          position: "absolute",
          width: "100%",
        }}
      />
    </div>
  )
}
