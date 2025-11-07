import { useState } from "react";
import { use } from "react";
import AuthContext from "../contexts/AuthContext";
import ModelCard from "../components/ModelCard";
import { useEffect } from "react";

const MyModel = () => {
  const { user } = use(AuthContext);
  const [models, setModels] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/my-model?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {models?.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default MyModel;
