import Routes from "./app/Routes";
import { Confirm } from "./features/confirm/components/Confirm";
import ErrorBoundary from "./features/error-boundary/components/ErrorBoundary";
import { DefaultFallback } from "./features/error-boundary/components/fallback/DefaultFallback";

//  fallback={<Fallback />}

const App = () => {
  return (
    <ErrorBoundary fallback={<DefaultFallback />}>
      <Routes />
      <Confirm />
    </ErrorBoundary>
  );
};

export default App;
