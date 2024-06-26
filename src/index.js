import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './app';
import { createBrowserRouter,RouterProvider,Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const newrouter = createBrowserRouter([
  {
    path: "/test",
    element: <div>Helloworld</div>
  }
]);


root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <App />
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>

  
);
