import { Alert, AlertDescription, AlertTitle } from "@/components/AlertAdvanced";
import { RocketIcon } from "@radix-ui/react-icons";


export default function Page() {
  return (
    <div className="p-8">
      <Alert>
        <RocketIcon className="h-4 w-4 mt-0.5 animate-pulse" />
        <div>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the CLI.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
