export default async function getTargetMuscles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/muscles`);
  return res.json();
}
