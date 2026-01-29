import Category from "../components/Category";
import Body from "../components/Body";

interface HomeProps {
  languageGeorgian: boolean;
  setLanguageGeorgian: (languageGeorgian: boolean) => void;
}

const Home = ({ languageGeorgian, setLanguageGeorgian }: HomeProps) => {
  return (
    <>
      <div>
        <Category languageGeorgian={languageGeorgian} />
        <Body languageGeorgian={languageGeorgian} />
      </div>
    </>
  );
};

export default Home;
