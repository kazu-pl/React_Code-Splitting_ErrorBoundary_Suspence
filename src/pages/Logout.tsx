import Navigation from "components/Navigation";

import { lazy, Suspense, useState } from "react";

import LoadingFallback from "components/LoadingFallback";

const Modal = lazy(() => import("components/Modal"));

const LOGOUT = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  return (
    <>
      <Navigation />
      <p>
        THIS IS LOGOUT - ta strona jest lazy ładowana - jej kod zostanie pobrany
        dopiero po wejściu na ten url.
      </p>
      <p>
        Dodatkowo na tej stronie kod renderujący modal zostanie pobrany od razu
        podczas ładowania strony
      </p>
      <p>
        Aby sprawdzić ładowane paczki kodu zbadaj tę stronę i przejdź do
        zakładki Debugger w Firefox
      </p>
      <button onClick={handleToggleModal}>TOGGLE LOGOUT MODAL</button>
      <Suspense fallback={<LoadingFallback />}>
        <Modal isOpen={isModalOpened} />
      </Suspense>
    </>
  );
};

export default LOGOUT;
