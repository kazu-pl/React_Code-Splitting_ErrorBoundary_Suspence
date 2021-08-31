# 1 - Code Splitting danego komponentu (basic):

```
import Navigation from "components/Navigation";

import { lazy, Suspense, useState } from "react";

import LoadingFallback from "components/LoadingFallback";

const Modal = lazy(() => import("components/Modal")); // lazy load your komponent

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navigation />
      THIS IS HOME
      <Suspense fallback={<LoadingFallback />}>
        <Modal isOpen={isModalOpen} />
      </Suspense>
    </>
  );
};

export default Home;

```

Załóżmy, że powyższy kod to jest komponent zwracający widok całej strony (wyświetli to co zobaczymy po przejściu na `/home`) i jest to ten komponent, który zostanie przekazany jako prop `component` w komponencie `Route` z `react-router-dom`.

Zalóżmy też, że nie robimy code splittingu na poziomie routów (jest to jedyny code splitting w naszej aplikacji).

Jak widać na powyższym przykładzie do samego lazy loadingu wystarczy zaimportować przez funkcję Lazy dany komponent a nastepnie wyrenderować go owijając go w `Suspense` z podanym jakimś fallback indicatorem

### Jak to działa:

Kiedy odświeżysz aplikację np na stronie `/login` to przeglądarka pobierze kod aplikacji (pobierze też np kod renderujący inne ścieżki i komponenty np `/home`). Kiedy przejdziesz na stronę `/home`, na której renderujesz jakiś Modal to okaże się, że dopiero wtedy zostanie pobrany kod renderujacy komponent `Modal` (ponieważ wszedłeś na stronę `/home`, na której będzie potrzebny ten komponent Modal). Będzie też widoczny na moment loading indicator (napisany został tak, aby przysłonił całą stronę więc będzie dobrze widoczny).

W powyższym przypadku po wejściu na `/home` komponent `Modal` zostanie od razu pobrany nawet jeśli zwraca on początkowo `null`.
Dzieje się tak, ponieważ jest on importowany i używany w komponencie `Home` tak ogólnie dlatego też zostanie domyślnie od razu pobrany po wyrenderowaniu `Home` (nawet jeśli domyslnie nic nie zwraca początkowo).

Aby to sprawdzić można odświeżyć stronę na `/login`, zbadać stronę i przejść w Mozilli na zakładkę `debuger` - zobaczysz że gdy przejdziesz na stronę `/` to zostanie doładowany kod od modala.

# 2 - Pobranie komponentu dopiero jak ma być pokazany zamiast po wejściu na daną podstronę

Chcielibyśmy aby kod modala został pobrany dopiero jak użytkownik zechce go zobaczyć - nie ma potrzeby pobierać go, jeśli użytkownik nie będzie otwierał modala. Aby to osiągnąć trzeba zmodyfikować nieco kod. Będzie to wyglądało następująco:

```
import Navigation from "components/Navigation";

import { lazy, Suspense, useState } from "react";

import LoadingFallback from "components/LoadingFallback";

const Modal = lazy(() => import("components/Modal"));

let isModalMounted = false;

const Home = () => {
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
      THIS IS HOME
      <button onClick={handleToggleModal}>TOGGLE MODAL</button>
      {isModalMounted && (
        <Suspense fallback={<LoadingFallback />}>
          <Modal isOpen={isModalOpened} />
        </Suspense>
      )}
    </>
  );
};

export default Home;


```

W powyższym przykładzie kod zwracający modal nie zostanie pobrany po wejściu na `/home` tylko dopiero w momencie naciśnięcia na przycisk otwierający/zamykający modal. Dopiero po jego kliknięciu wyświetli się loading Indicator (a nie jak wczesniej po wejściu na `/home`) i zaladuje się komponent. Gdy komponent się załaduje to potem dalsze togglowanie modala będzie już działać normalnie tj. jak komponent raz się załaduje to już kolejny raz nie będzie musiał.
Trzeba tutaj dodać flagę mówiącą o tym czy dany komponetn jest zamontowany `isModalMounted` ponieważ jeżeli wrzucilibyśmy bezpośrednio `suspense` to dostalibyśmy wcześniejszą sytuację, gdzie Modal zostałby pobrany od razu po wejściu na stronę a nie w momencie naciśnięcia na przycisk.

# 3 - Przemyślenia:

Przyklad pierwszy oznacza, że jeśli mielibyśmy code splitting na poziomie route to nie byłoby potrzeby robić code splittingu komponentu `Modal` w taki sposób jak w przykładzie `1` ponieważ i tak nie byłby on pobrany jeśli nie weszliśmy na stronę `/home` a jeśli weszlibyśmy na nią to zostałby od razu pobrany.

ewentualnie można zrobić code splitting na poziomie Routów i jednoczesnie code splittować komponent tak jak w przykładzie 2 - wtedy kod zwracający widok `/home` nie zostałby pobrany dopóki weszlibyśmy na stronę `/home` a nawet jakbyśmy tam weszli to z kolei kod odpowiedzialny za modal nie zostałby pobrany dopóki nie kliknęlibyśmy w przycisk togglujący modal.

# 4 - Error Boundary

Suspense można (a w zasadzie trzeba) dodatkowo owinąć w Error Boundary (np w przypadku gdyby wystąpił błąd sieci podczas ładowania strony/komponentu):

```
import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import LoadingFallback from "./components/LoadingFallback";

import ErrorBoundary from "components/ErrorBoundary";

import Home from "pages/Home";
import Login from "pages/Login";

// const Home = lazy(() => import("pages/Home"));
// const Login = lazy(() => import("pages/Login"));

// lazy() powinno dostać funkcję która zwraca promise więc można zasymulować błąd polączenia zwracając rejected promise
const Account = lazy(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 3000);
  });
});

const Router = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/account" exact component={Account} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Router;


```

Jeśli nie owiniemy `Suspense` w `ErrorBoundary` to w przypadku wystąpienia np błędu połączenia w trakcie pobierania lazy ładowanego komponentu (w powyższym przyładzie komopnentu `Account`) to wyrzuci białą stronę z błędem (albo error screen z react jeśli jesteśmy mamy uruchomiony projekt w wersji developerskiej czyli zwykle przez `yarn start` w reactie).
