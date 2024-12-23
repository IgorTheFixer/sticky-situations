import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center border-4 border-blue-500 h-screen w-screen">
      <div className="flex flex-col items-center justify-center h-screen border-2 border-green-500"> 
        <div className="border-2 border-red-500">
          <Button>
            Create New Project
          </Button>
        </div>
      </div>
    </div>
  );
}
