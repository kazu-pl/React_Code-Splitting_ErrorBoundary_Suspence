import Navigation from "components/Navigation";

import { lazy, Suspense, useState } from "react";

import LoadingFallback from "components/LoadingFallback";

const Modal = lazy(() => import("components/Modal"));

let isModalMounted = false;

const Login = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleToggleModal = () => {
    if (!isModalMounted) {
      isModalMounted = true;
    }
    setIsModalOpened((prev) => !prev);
  };

  return (
    <>
      <Navigation />
      <p>
        THIS IS Login - ta strona jest lazy ładowana - jej kod zostanie pobrany
        dopiero po wejściu na ten url.
      </p>
      <p>
        dodatkowo na tej stronie kod modala zostanie pobrany dopiero po
        kliknięciu w przycisk.
      </p>
      <p>
        kolor ładowania po naciśnięciu na przycisk bedzie czerwony ponieważ w
        Suspense otaczajacym modal an tej stronie przekazałem prop z kolorem do
        LoadingFallback componentu (użyłem tego samego LoadingFallback
        komponentu który jest użyty do ładowania stron tyle że z innym kolorem -
        równie dobrze mógłbym napisać inny loading indicator np nie zasłaniajacy
        całej strony ale jedynie wyświetlający jakiegoś diva z napisem)
      </p>
      <p>
        Aby sprawdzić ładowane paczki kodu zbadaj tę stronę i przejdź do
        zakładki Debugger w Firefox
      </p>
      <button onClick={handleToggleModal}>TOGGLE MODAL</button>
      {isModalMounted && (
        <Suspense fallback={<LoadingFallback color="red" />}>
          <Modal isOpen={isModalOpened} />
        </Suspense>
      )}
    </>
  );
};

export default Login;
