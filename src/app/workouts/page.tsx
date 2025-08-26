import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkoutsPage() {
  return (
    <div className="flex flex-col justify-center gap-4 px-5 sm:px-10 md:px-20 lg:px-32 md:flex-row mt-10">
      <div className="md:flex-grow-1 md:order-2 md:min-w-52 md:max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle className="">Library</CardTitle>
          </CardHeader>
          <CardContent className=""></CardContent>
        </Card>
      </div>
      <main className="md:flex-grow-2 md:mt-10 md:order-1 md:min-w-72 md:max-w-3xl">
        <Card className="">
          <CardHeader>
            <CardTitle className=""></CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </main>
    </div>
  );
}
