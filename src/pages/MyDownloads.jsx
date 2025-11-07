import { use, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import ModelCard from "../components/ModelCard";

const MyDownloads = () => {
  const { user } = use(AuthContext);
  const [models, setModels] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/downloads?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setModels(data));
  }, [user]);

  console.log(models);
  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-10">My Models</h2>
      <div className="grid grid-cols-4 gap-5">
        {models?.map((model) => (
          <ModelCard model={model} />
        ))}
      </div>
    </div>
  );
};

export default MyDownloads;
