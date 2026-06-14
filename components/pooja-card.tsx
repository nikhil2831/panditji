import type { PoojaService } from "@/types/pooja";

type PoojaCardProps = {
  pooja: PoojaService;
};

export function PoojaCard({ pooja }: PoojaCardProps) {
  return (
    <article className="card">
      <h3>{pooja.name}</h3>
      <p>{pooja.description}</p>
      <div className="price">Starting from ₹{pooja.startingPrice}</div>
    </article>
  );
}
