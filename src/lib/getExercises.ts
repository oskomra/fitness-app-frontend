export default async function getExercises() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercises`);
  return res.json();
}
