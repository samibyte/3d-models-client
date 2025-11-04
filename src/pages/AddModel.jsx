import { use } from "react";
import AuthContext from "../contexts/AuthContext";
import Swal from "sweetalert2";

const AddModel = () => {
  const { user } = use(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const category = event.target.category.value;
    const description = event.target.description.value;
    const thumbnail = event.target.thumbnail.value;
    const created_at = new Date();
    const downloads = 0;
    const created_by = user.email;

    const newModelData = {
      name,
      category,
      description,
      thumbnail,
      created_at,
      downloads,
      created_by,
    };

    try {
      const res = await fetch(`http://localhost:3000/models`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newModelData),
      });
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          title: "Model added successfully",
          icon: "success",
          draggable: true,
        });
        event.target.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Couldn't add model, try again",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card border border-gray-200 mt-20 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              defaultValue={""}
              name="category"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Vehicles">Vehicles</option>
              <option value="Plants">Plants</option>
              <option value="Foods">Foods</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Characters">Characters</option>
              <option value="Space">Space</option>
              <option value="Animals">Animals</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-colors duration-500"
          >
            Add Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModel;
