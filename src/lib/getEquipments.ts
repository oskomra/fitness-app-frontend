export default async function getEquipments() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipments`);
  return res.json();
}
