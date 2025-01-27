import { createStaticNavigation } from "@react-navigation/native";
import { RootStack } from "./RootStack";

export default function App() {
  const Navigation = createStaticNavigation(RootStack);

  return <Navigation />;
}
