import { Link } from "react-router";

const ModelCard = ({ model }) => {
  const { name, thumbnail, category, description, _id } = model;
  return (
    <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="badge text-xs badge-xs badge-accent rounded-full">
          {category}
        </div>
        <p className="line-clamp-1">{description}</p>

        <div className="card-actions justify-between items-center mt-4">
          <div className="flex gap-4 text-sm text-base-content/60"></div>
          <Link
            to={`/model-details/${_id}`}
            className="btn rounded-full bg-linear-to-r from-primary to-secondary hover:from-secondary transition-colors duration-500 ease-in-out hover:to-primary text-white w-full btn-sm"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
