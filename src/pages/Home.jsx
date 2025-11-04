import { useLoaderData } from "react-router";
import ModelCard from "../components/ModelCard";
import Banner from "../components/Banner";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <div>
        <Banner />
      </div>
      <h2 className="text-center text-2xl font-bold pt-14 mt-10">
        Latest Model
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {data.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default Home;
