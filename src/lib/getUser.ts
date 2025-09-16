export default async function getUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`);
  return res.json();
}
