import { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import AuthContext from "../contexts/AuthContext";

const ModelDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [model, setModel] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/model-details/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setModel(data.result));
  }, [user, id]);

  const handleDownlaod = async () => {
    try {
      const res = await fetch("http://localhost:3000/downloads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({ ...model, downloaded_by: user?.email }),
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDlete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        progressStepsDistance: "20px",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch(
              `http://localhost:3000/models/${model._id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${user?.accessToken}`,
                },
              }
            );
            const status = await res.json();
            if (status.success) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              navigate("/");
            }
          } catch (err) {
            console.error(err);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={model.thumbnail}
              alt=""
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {model.name}
            </h1>

            {/* Category Badge */}
            <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
              {model.category}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {model.description}
            </p>

            {/* Optional: Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Link
                to={`/update-model/${model._id}`}
                className="btn btn-primary rounded-full bg-linear-to-r from-primary to-secondary text-white border-0 hover:from-secondary hover:to-primary transition-colors duration-500"
              >
                Update Model
              </Link>
              <button
                onClick={handleDownlaod}
                className="btn btn-accent rounded-full"
              >
                Download
              </button>
              <button
                onClick={handleDlete}
                className="btn btn-outline rounded-full border-gray-300 hover:border-primary hover:text-pink-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
