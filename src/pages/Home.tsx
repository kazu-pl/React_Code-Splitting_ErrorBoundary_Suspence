import Navigation from "components/Navigation";

const Home = () => {
  return (
    <>
      <Navigation />
      Strona Home - nie jest lazy ładowana tak więc kod zwracający tę stronę
      pobiera się od razu niezaleznie od tego na jaką stronę
      wejdziesz/odświeżysz
      <p>
        Aby sprawdzić ładowane paczki kodu zbadaj tę stronę i przejdź do
        zakładki Debugger w Firefox
      </p>
    </>
  );
};

export default Home;
