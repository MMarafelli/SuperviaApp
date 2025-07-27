import { useLoaderData } from "react-router-dom";
import NotificationTest from "../components/NotificationTest/NotificationTest";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the About.tsx loader function!";
}

export function Component() {
  const data = useLoaderData() as string;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p className="mb-6">{data}</p>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Teste de Notificações Push</h3>
        <NotificationTest />
      </div>
    </div>
  );
}

Component.displayName = "AboutPage";